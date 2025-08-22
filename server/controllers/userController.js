import jwt from 'jsonwebtoken';
import User from '../models/User.js';


export const signup = async (req, res) => {
  try {
    const { name = 'Admin', email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email & password required' });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: 'Admin already exists' });
    }

    const admin = await User.create({
      name,
      email,
      password,
      role: 'admin',
    });

    res.status(201).json({
      message: 'Admin created',
      admin: { id: admin._id, email: admin.email },
    });
  } catch (e) {
    res.status(500).json({ message: 'Server error', error: e.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user existence
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    // Verify password
    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (e) {
    res.status(500).json({ message: 'Server error', error: e.message });
  }
};
