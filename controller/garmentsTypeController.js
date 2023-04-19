const GarmentsType = require("../models/garmentsType");

const firebase = require("firebase/app");
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");

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
        const storageref = ref(storage, garmentsType.collectionName + "/" + req.file.originalname);

        const metadata = {
            contentType: 'image/jpg'
        };

        uploadBytes(storageref, req.file.buffer, metadata)
            .then(() => {
                getDownloadURL(storageref).then((url) => {
                    garmentsType.garmentImage = url;
                }).then(() => {
                    garmentsType.save().then(() => {
                        return res.status(201).send({ success: true, message: "garmentsType is add" });
                    }).catch((e) => {
                        console.log(e);
                        return res.status(200).send({ success: false, message: "garmentsType is not add" });
                    })
                })
            })

    }
}






module.exports = {
    garmentsType_list,
    garmentsType_add
}