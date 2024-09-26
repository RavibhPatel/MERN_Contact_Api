import express from 'express';
import { addContact, deleteContact, getAllContacts, getContactById, getContactByUserId, updateContact } from '../controllers/Contact.js';
import { Authentication } from '../Middlewares/Auth.js';
const router = express.Router();

router.get('/', getAllContacts);

router.get('/:id', getContactById);

router.post('/add',Authentication, addContact);

router.put('/:id',Authentication, updateContact);

router.delete('/:id',Authentication, deleteContact);

router.get('/userId/:id', getContactByUserId);

export default router;