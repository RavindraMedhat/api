const GarmentsType = require("../models/garmentsType");
const path = require("path");

const firebase = require("firebase/app");

const { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } = require("firebase/storage");
const garmentsType = require("../models/garmentsType");

const firebaseConfig = {
    apiKey: "AIzaSyAWSkFneOhBIPRUg0zif8F5irl_fgXHoe0",
    authDomain: "project-sem6-eac05.firebaseapp.com",
    projectId: "project-sem6-eac05",
    storageBucket: "project-sem6-eac05.appspot.com",
    messagingSenderId: "853166853967",
    appId: "1:853166853967:web:a3d6b38895d1ba559c7f3a",
    measurementId: "G-F9DRDBY0CX"
};

firebase.initializeApp(firebaseConfig);
const storage = getStorage();

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

    if (req.file) {
        // const storageref = ref(storage, req.file.originalname);
        garmentsType.garmentImagePath = garmentsType.collectionName + "/" + garmentsType.garmentsTypeName + "_" + Date.now() + path.extname(req.file.originalname);
        const storageref = ref(storage, garmentsType.garmentImagePath);

        const metadata = {
            contentType: 'image/jpg'
        };

        uploadBytes(storageref, req.file.buffer, metadata)
            .then(() => {
                getDownloadURL(storageref).then((url) => {
                    garmentsType.garmentImageURL = url;
                }).then(() => {
                    garmentsType.save().then(() => {
                        return res.status(201).send({ success: true, message: "garmentsType is add" });
                    }).catch((e) => {
                        // console.log(e);
                        console.log(req);
                        return res.status(200).send({ success: false, message: "garmentsType is not add" });
                    })
                })
            })

    } else {
        return res.status(200).send({ success: false, message: "garmentsType is not add" });
    }

}

const garmentsType_remove = (req, res) => {
    // console.log(req.params.id);
    garmentsType.findByIdAndDelete(req.params.id)
        .then((GT) => {

            if (!GT) {

                return res.status(200).send({ success: false, message: "garmentsType is not found" });

            } else {
                const fileref = ref(storage, GT.garmentImagePath);
                deleteObject(fileref)
                    .then(() => {
                        return res.status(201).send({ success: true, message: "garmentsType is remove" });
                    })
                    .catch((e) => {
                        return res.status(200).send({ success: false, message: "garmentsType is remove but image not remove :- " + e });
                    })
            }
        })
        .catch((e) => {
            console.log(e);
            return res.status(200).send({ success: false, message: "garmentsType is not remove" });
        })

}

module.exports = {
    garmentsType_list,
    garmentsType_add,
    garmentsType_remove
}