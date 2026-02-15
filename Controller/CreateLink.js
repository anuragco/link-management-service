const { URL } = require("../model/Shortner");
const shortid = require("shortid");

const CreateLink = async (req, res) => {
  const { USerGivenUrl } = req.body || {};
  
  if (!USerGivenUrl || USerGivenUrl.trim() === '') {
    return res.redirect('/?error=' + encodeURIComponent('Please provide a valid URL'));
  }

  // Basic URL validation
  try {
    new globalThis.URL(USerGivenUrl);
  } catch (e) {
    return res.redirect('/?error=' + encodeURIComponent('Please provide a valid URL format'));
  }

  try {
    const GenshortId = shortid.generate();
    const insertData = new URL({
      shortId: GenshortId,
      redirectUrl: USerGivenUrl,
      status: "active",
    });

    await insertData.save();

    // Redirect to home page with success message and shortid
    return res.redirect('/?success=' + encodeURIComponent('URL shortened successfully!') + '&shortid=' + GenshortId);
  } catch (err) {
    console.error('Error creating short URL:', err);
    return res.redirect('/?error=' + encodeURIComponent('Failed to create short URL. Please try again.'));
  }
};

module.exports = {
  CreateLink,
};
