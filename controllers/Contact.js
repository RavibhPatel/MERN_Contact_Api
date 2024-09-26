import { Contacts } from "../Models/Contact.js";


// Retrieve all contacts
export const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contacts.find();
        if (!contacts) return res.status(404).json({ message: "No Contacts found" });
        res.json(contacts);
    } catch(err) { 
        return res.status(500).json({ message: err.message }); 
    }
}


// Retrieve a single contact by ID
export const getContactById = async (req, res) => {
    try {
        const contactId = req.params.id;
        const foundContact = await Contacts.findById(contactId);
        if (!foundContact) return res.status(404).json({ message: "Contact not found" });
        res.json(foundContact);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// Add new contact
export const addContact = async (req, res) => {
    try {
        const newContact = {
            Name: req.body.Name,
            Email: req.body.Email,
            phone: req.body.phone,
            contactType: req.body.contactType,
            userId: req.user 
        };
        if (
            newContact.Name == ' ' ||
            newContact.Email == ' ' ||
            newContact.Phone == ' ' ||
            newContact.ContactType == ' '
        )
        return res.status(400).json({ message: "All Fields Are Required" });
        const saveContact = await Contacts.create(newContact);
        res.json({ message: "Contact added successfully", saveContact });
    } catch (err){
        return res.status(500).json({ message: err.message });
    }
}


// Update a contact by ID
export const updateContact = async (req, res) => {
    try{
        const contactId = req.params.id;
        const updatedContact = req.body;

        const foundContact = await Contacts.findByIdAndUpdate(contactId, updatedContact, { new: true });

        if (!foundContact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.json({ message: "Contact Updated Successfully", foundContact });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


// Delete Contact By Id
export const deleteContact = async (req, res) => {
    try {
        const contactId = req.params.id;
        const deletedContact = await Contacts.findByIdAndDelete(contactId);

        if (!deletedContact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.json({ message: "Contact deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// Get contact By Userid

export const getContactByUserId = async(req,res)=> {
    try{
        const id = req.params.id;
        let contact = await Contacts.find({userId:id} )
        if(!contact) return res.status(404).json({ message: "No Contacts found" });
        res.json(contact);
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
} 