const { URL } = require("../model/Shortner");

const RedirectUser = async (req, res) => {
  const shortId = req.params.shortid;
  if (!shortId) {
    return res.status(400);
  }

  const ClickMetricsUpdate = {
    $push: { ClickMatrics: { ts: Date.now(), ip: req.ip } },
  };
  const data = await URL.findOneAndUpdate(
    { shortId: req.params.shortid },
    ClickMetricsUpdate,
  );

  if (!data) {
    return res.status(404).json({ message: "Short URL not found" });
  }

  return res.redirect(data.redirectUrl);
};

module.exports = {
  RedirectUser,
};
