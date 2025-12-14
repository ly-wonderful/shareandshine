import express from 'express';
import { supabase } from '../config/supabase.js';

const router = express.Router();

// Get all members
router.get('/', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Get single member by ID
router.get('/:id', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('id', req.params.id)
      .single();
    
    if (error) throw error;
    
    if (!data) {
      return res.status(404).json({ error: 'Member not found' });
    }
    
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Create new member application
router.post('/', async (req, res, next) => {
  try {
    const memberData = req.body;
    
    // Validate required fields
    const requiredFields = ['full_name', 'email', 'phone', 'age'];
    for (const field of requiredFields) {
      if (!memberData[field]) {
        return res.status(400).json({ error: `Missing required field: ${field}` });
      }
    }
    
    const { data, error } = await supabase
      .from('members')
      .insert([memberData])
      .select()
      .single();
    
    if (error) throw error;
    
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

// Update member
router.put('/:id', async (req, res, next) => {
  try {
    const memberData = req.body;
    
    const { data, error } = await supabase
      .from('members')
      .update(memberData)
      .eq('id', req.params.id)
      .select()
      .single();
    
    if (error) throw error;
    
    if (!data) {
      return res.status(404).json({ error: 'Member not found' });
    }
    
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Delete member
router.delete('/:id', async (req, res, next) => {
  try {
    const { error } = await supabase
      .from('members')
      .delete()
      .eq('id', req.params.id);
    
    if (error) throw error;
    
    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
