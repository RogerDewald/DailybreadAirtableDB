module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Methods', 'POST');

    const string = req.body
    res.status(200).send(string)
    // res.status(200).send(process.env.AIRTABLE_API_TOKEN_RECEIVE);
};
