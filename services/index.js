const path = require('path');
const fs = require('fs');
const Contact = require('./schema/contacts');
const Users = require('./schema/users');

const listContacts = async (userId) => {
    return Contact.find({ owner: userId});
}

const getContactById = async (userId, contactId) => {
    return Contact.findOne({ owner: userId, _id: contactId });
};

const addContact = async (userId, contact) => {
    return Contact.create({ ...contact, owner: userId});
};

const removeContact = async (userId, contactId) => {
    return await Contact.findOneAndDelete({ owner: userId, _id: contactId }).select({ _id:1 });
};

const updateContact = async (userId, contactId, body) => {
    return Contact.findByIdAndUpdate({ owner: userId, _id: contactId }, body, { new:true });
};

const updateStatusContact = async (userId, contactId, body) => {
    return Contact.findByIdAndUpdate({ owner: userId, _id: contactId }, body, { new: true });
};

const addUser = async (user) => {
    return Users.create(user);
};

const updateAvatarUrl = async (userId, avatarUrl) => {
    return Users.findByIdAndUpdate({ _id: userId }, { avatarUrl }, { new: true});
};

const deleteTempAvatarFile = (filename) => {
    const filePath = path.join(process.cwd(), "temp", filename);
    try {
        fs.unlinkSync(filePath);
    } catch(error) {
        console.error(error);
    }
};

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact,
    addUser,
    updateAvatarUrl,
    deleteTempAvatarFile,
};