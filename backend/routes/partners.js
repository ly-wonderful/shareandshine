import express from 'express';
import { supabase } from '../config/supabase.js';

const router = express.Router();

// Get all partners
router.get('/', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Get single partner by ID
router.get('/:id', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .eq('id', req.params.id)
      .single();
    
    if (error) throw error;
    
    if (!data) {
      return res.status(404).json({ error: 'Partner not found' });
    }
    
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Create new partner application
router.post('/', async (req, res, next) => {
  try {
    const partnerData = req.body;
    
    // Validate required fields
    const requiredFields = ['organization_name', 'contact_person', 'email', 'phone'];
    for (const field of requiredFields) {
      if (!partnerData[field]) {
        return res.status(400).json({ error: `Missing required field: ${field}` });
      }
    }
    
    const { data, error } = await supabase
      .from('partners')
      .insert([partnerData])
      .select()
      .single();
    
    if (error) throw error;
    
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

// Update partner
router.put('/:id', async (req, res, next) => {
  try {
    const partnerData = req.body;
    
    const { data, error } = await supabase
      .from('partners')
      .update(partnerData)
      .eq('id', req.params.id)
      .select()
      .single();
    
    if (error) throw error;
    
    if (!data) {
      return res.status(404).json({ error: 'Partner not found' });
    }
    
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Delete partner
router.delete('/:id', async (req, res, next) => {
  try {
    const { error } = await supabase
      .from('partners')
      .delete()
      .eq('id', req.params.id);
    
    if (error) throw error;
    
    res.json({ message: 'Partner deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
