const express = require('express')
const router = express.Router();
const Joi = require('joi');

const authToken = require('../../services/middlewares/auth');

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../../services/index');

const { status } = require('express/lib/response');

const contactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(9).required(),
});


router.get('/', authToken, async (req, res, next) => {
  try {
    const contactsList = await listContacts(req.user._id);
    res.json(contactsList);
    console.log("Contacts list loaded with success");
  } catch (error) {
    console.error("Error reading file: ", error);
    next(error);
  }
});

router.get('/:contactId', authToken, async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const wantedContact = await getContactById(req.user._id, contactId);

    if(wantedContact) {
      res.json({ status: "success", code: 200, data: { wantedContact } });
    } else {
      res.json({ status: "error", code: 404, message: "Not found" });
    }
  } catch (error) {
      console.error("Error: ", error);
      next(error);
  }
});

router.post('/', authToken, async (req, res, next) => {
  try {
    const body = await contactSchema.validateAsync(req.body);
    const newContact = await addContact(req.user._id, body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message});
  }
});

router.delete('/:contactId', authToken, async (req, res, next) => {
  try {
    const contact = await removeContact(req.user._id, req.params.contactId);
    if (contact) {
      res.json({status: "succes", code: 200, message: "contact deleted"});
       } else {
        res.json({status: "error", code: 404, message: "Not found"});
       }
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', authToken, async (req, res, next) => {
  try {
    const body = await contactSchema.validateAsync(req.body);
    const updatedContact = await updateContact(req.user._id, req.params.contactId, body);
    if (updateContact) {
      return res.json(updateContact);
    }
    return res.status(404).json({message: "Not found"});
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

const userSchemaFavorite = Joi.object({
  favorite: Joi.boolean(),
});

router.patch("/:contactId/favorite", authToken, async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = userSchemaFavorite.validate(body);

    if (error) {
      // const validatingErrorMessage = error.details[0].message;
      return res
        .status(400)
        .json({ message: "missing field favorite" });
    }

    const contactId = req.params.contactId;
    const updatedStatusContact = await updateStatusContact(req.user._id, contactId, body);
    res.status(200).json(updatedStatusContact);
  } catch (error) {
    res.status(404).json({message: "Not found"});
    next();
  }
});

module.exports = router;
