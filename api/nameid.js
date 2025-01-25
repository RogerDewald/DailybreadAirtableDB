// api/nameid.js
module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    const { p } = req.query

    if (process.env.NAMEID == p) {
        res.status(200).send("1")
    }
    else {
        res.status(400).send("0")
    }
    //res.status(200).send(process.env.NAMEID);
};
