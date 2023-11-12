const getById = async (req, res, next) => {
try {
const { contactId } = req.params;
const result = await contactsService.getContactById(contactId);
if (!result) {
throw HttpError(
404,
`OOps such contact with id - ${contactId} not found 😥`
);
// const err = new Error(
// `OOps such contact with id - ${contactId} not found 😥`
// );
// err.status = 404;
// throw err;

      //   return res.status(404).json({
      //     message: `OOps such contact with id - ${contactId} not found 😥`,
      //   });
    }
    res.json(result);

} catch (err) {
next(err);
}
};

const deleteById = async (req, res, next) => {
try {
const { contactId } = req.params;
const result = await contactsService.removeContact(contactId);

    if (!result) {
      throw HttpError(
        404,
        `OOps such contact with id - ${contactId} not found 😥`
      );
    }

    res.status(200).json({ message: "contact was success deleted" });

    //* Коли задача відправити status(204), при такому відправленні тіла не буде
    // res.status(204).send()

} catch (err) {
next(err);
}
}
