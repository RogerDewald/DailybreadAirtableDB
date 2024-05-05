module.exports = (req, res) => {
  res.status(200).send(process.env.AIRTABLE_API_TOKEN_RECEIVE);
};
