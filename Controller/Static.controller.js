const { URL } = require("../model/Shortner");

const renderHomePage = async (req, res) => {
    try {
        const allurl = await URL.find({}).sort({ createdAt: -1 }).limit(50);
        
        // Get query parameters for success/error messages and shortid
        const error = req.query.error || null;
        const success = req.query.success || null;
        const shortid = req.query.shortid || null;
        
        res.render('home', { shortid, allurl, error, success });
    } catch (err) {
        console.error('Error fetching URLs:', err);
        res.render('home', { shortid: null, allurl: [], error: 'Failed to load URLs', success: null });
    }
}

module.exports = {
    renderHomePage,
}