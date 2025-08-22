import Agent from '../models/Agent.js';


export const createAgent = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    
    const mobileRegex = /^\+\d{1,3}\d{7,14}$/;  
    if (!mobileRegex.test(mobile)) {
      return res.status(400).json({ message: 'Mobile must include country code (e.g. +919876543210)' });
    }

    
    const exists = await Agent.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: 'Agent already exists with this email' });
    }

    
    const agent = await Agent.create({ name, email, mobile, password });

    res.status(201).json({
      message: 'Agent created successfully',
      agent,
    });
  } catch (e) {
    res.status(500).json({ message: 'Server error', error: e.message });
  }
};


export const listAgents = async (_req, res) => {
  try {
    const agents = await Agent.find().sort({ createdAt: -1 });
    res.json(agents);
  } catch (e) {
    res.status(500).json({ message: 'Server error', error: e.message });
  }
};


export const deleteAgent = async (req, res) => {
  try {
    await Agent.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ message: 'Server error', error: e.message });
  }
};
