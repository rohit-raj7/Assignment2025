import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true },
    firstName: { type: String, required: true },
    phone: { type: String, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Lead', leadSchema);
