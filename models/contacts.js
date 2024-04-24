const fs = require('fs/promises');
const path = require('path');
const nanoid = require('nanoid-esm');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const newContacts = contacts.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return newContacts;
};

const addContact = async (body) => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const newContact = { id: nanoid(), ...body};
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...body};
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[index];
  }
  return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
