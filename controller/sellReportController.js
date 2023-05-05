const sellReport = require("../models/report");

const report_list = async (req, res) => {

    sellReport.find()
        .then((sellReport_data) => {
            if (sellReport_data.length == 0)
                return res.status(200).json({ success: false, message: "no data found" });
            else
                return res.status(200).json({ success: true, sellReport_data });
        })
        .catch((e) => {
            console.log("error :- ", e);
            return res.status(400).json(e);
        });
}

module.exports = {
    report_list,
}