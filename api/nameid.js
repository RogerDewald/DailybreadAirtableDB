// api/nameid.js
module.exports = (req, res) => {
  res.status(200).send(process.env.NAMEID);
};
