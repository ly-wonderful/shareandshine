import express from 'express';
import { supabase } from '../config/supabase.js';

const router = express.Router();

// Get all events with filtering
router.get('/', async (req, res, next) => {
  try {
    const { type, sort } = req.query;
    
    let query = supabase.from('events').select('*');
    
    // Filter by type (past/upcoming)
    if (type) {
      query = query.eq('type', type);
    }
    
    // Sort
    if (sort) {
      const isDescending = sort.startsWith('-');
      const field = isDescending ? sort.substring(1) : sort;
      query = query.order(field, { ascending: !isDescending });
    } else {
      query = query.order('date', { ascending: false });
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Get single event by ID
router.get('/:id', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', req.params.id)
      .single();
    
    if (error) throw error;
    
    if (!data) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Create new event
router.post('/', async (req, res, next) => {
  try {
    const eventData = req.body;
    
    const { data, error } = await supabase
      .from('events')
      .insert([eventData])
      .select()
      .single();
    
    if (error) throw error;
    
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

// Update event
router.put('/:id', async (req, res, next) => {
  try {
    const eventData = req.body;
    
    const { data, error } = await supabase
      .from('events')
      .update(eventData)
      .eq('id', req.params.id)
      .select()
      .single();
    
    if (error) throw error;
    
    if (!data) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Delete event
router.delete('/:id', async (req, res, next) => {
  try {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', req.params.id);
    
    if (error) throw error;
    
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
