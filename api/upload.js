// api/upload.js
module.exports = (req, res) => {
  res.status(200).send(process.env.AIRTABLE_API_TOKEN_UPLOAD);
};
