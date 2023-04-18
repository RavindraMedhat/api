const GarmentsType = require("../models/garmentsType");


const garmentsType_list = (req, res) => {
    GarmentsType.find()
        .then((garmentsType_data) => {
            if (garmentsType_data.length == 0)
                return res.status(200).json({ success: false, message: "no data found" });
            else
                return res.status(200).json({ success: true, garmentsType_data });
        })
        .catch((e) => {
            console.log("error :- ", e);
            return res.status(400).json(e);
        });
}

const garmentsType_add = async (req, res) => {
    var garmentsType = await new GarmentsType({
        garmentsTypeName: req.body.garmentsTypeName,
        collectionName: req.body.collectionName
    });

    if (req.find) {
        garmentsType.garmentsImage = req.file.path
    }

    garmentsType.save().then(() => {
        return res.status(201).send({ success: true, message: "garmentsType is add" });
    }).catch((e) => {
        return res.status(200).send({ success: false, message: "garmentsType is not add" });
    })
}






module.exports = {
    garmentsType_list,
    garmentsType_add
}