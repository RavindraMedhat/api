const mongose = require("mongoose");
const validator = require("validator");

const userSchema = new mongose.Schema({

    username: {
        type: String,
        required: true,
        minLength: 3,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    role: {
        type: String,
        required: true,
        validate(valu) {
            if (valu != "customer" && valu != "owner" && valu != "employee" && valu != "accounter") {
                throw new Error("inveid role");
            }
        }
    }

}, { timestamps: true });

const User = new mongose.model('user', userSchema);

module.exports = User;
