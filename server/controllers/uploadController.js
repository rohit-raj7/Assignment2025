import Agent from '../models/Agent.js';
import Lead from '../models/Lead.js';
import { parseBuffer } from '../utils/parseUpload.js';
import { distributeEqually } from '../utils/distribute.js';


export const uploadLeads = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    
    const allowed = [
      'text/csv',
      'application/vnd.ms-excel', // .xls
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    ];
    if (!allowed.includes(req.file.mimetype)) {
      return res.status(400).json({ message: 'Invalid file type. Only CSV/XLSX/XLS allowed.' });
    }

    
    const rows = await parseBuffer(req.file);

    if (!rows || rows.length === 0) {
      return res.status(400).json({ message: 'Uploaded file is empty or invalid format' });
    }

    
    const sample = rows[0];
    if (!('FirstName' in sample && 'Phone' in sample && 'Notes' in sample)) {
      return res.status(400).json({ message: 'Invalid file format. Must contain FirstName, Phone, Notes' });
    }

    
    const agents = await Agent.find();
    if (agents.length === 0) {
      return res.status(400).json({ message: 'No agents found. Please add agents first.' });
    }

    // Distribute among agents
    const distributed = distributeEqually(rows, agents);

    const allLeads = [];
    for (const [agentId, leads] of Object.entries(distributed)) {
      const created = await Lead.insertMany(
        leads.map((l) => ({
          agent: agentId,
          firstName: l.FirstName,
          phone: l.Phone,
          notes: l.Notes,
        }))
      );
      allLeads.push(...created);
    }

    res.status(201).json({
      message: 'Leads uploaded & distributed successfully',
      total: allLeads.length,
    });
  } catch (e) {
    res.status(500).json({ message: 'Server error', error: e.message });
  }
};
