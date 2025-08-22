import express from 'express';
import auth from '../middleware/auth.js';
import { signup, login } from '../controllers/userController.js';
import { createAgent, listAgents, deleteAgent } from '../controllers/agentController.js';

const router = express.Router();


router.post('/signup', signup);
router.post('/login', login);


router.post('/', auth, createAgent);      
router.get('/', auth, listAgents);       
router.delete('/:id', auth, deleteAgent); 

export default router; 
 