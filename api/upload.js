// api/upload.js
module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.status(200).send(process.env.AIRTABLE_API_TOKEN_UPLOAD);
};
