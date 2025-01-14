module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        if (req.body == process.env.PASSWORD) {
            res.status(200).send("CorrectPassword")
        }
        else {
            res.status(402).send("WrongPassword")
        }
    }
    else {
        res.status(400).json({
            error: `Method ${req.method} not allowed`
        })
    }
}
