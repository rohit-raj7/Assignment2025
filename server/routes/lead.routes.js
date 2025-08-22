import express from 'express';
import Lead from '../models/Lead.js';
import auth  from '../middleware/auth.js';

const router = express.Router();


router.get('/grouped', auth, async (_req, res) => {
  const leads = await Lead.find().populate('agent').lean();

  const grouped = {};
  for (const l of leads) {
    const key = l.agent?._id?.toString() || 'unassigned';
    grouped[key] = grouped[key] || { agent: l.agent || null, items: [] };
    grouped[key].items.push(l);
  }

  res.json(grouped);
});

export default router;

 