import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const agentSchema = new mongoose.Schema(
{
name: { type: String, required: true },
email: { type: String, required: true, unique: true, lowercase: true },
mobile: { type: String, required: true }, 
password: { type: String, required: true }
},
{ timestamps: true }
);


agentSchema.pre('save', async function (next) {
if (!this.isModified('password')) return next();
const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password, salt);
next();
});


export default mongoose.model('Agent', agentSchema);