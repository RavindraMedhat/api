const mongose = require("mongoose");
const bcrypt = require("bcrypt");
// const validator = require("validator");

const userSchema = new mongose.Schema({

    username: {
        type: String,
        required: [true, 'Please enter username'],
        minLength: [5, 'Please enter minimum 5 latern in username'],
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        minLength: [5, 'Please enter minimum 5 latern in password'],
    },
    role: {
        type: String,
        required: [true, 'Please enter role'],
        validate(valu) {
            if (valu != "customer" && valu != "owner" && valu != "employee" && valu != "accounter") {
                throw new Error("inveid role");
            }
        }
    }
    // ,
    // profilePhoto:{
    //     type : Buffer,
    //     required:true
    // }

}, { timestamps: true });

userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt();
    console.log(salt);

    this.password = await bcrypt.hash(this.password, salt)

    console.log(this);
});

const User = new mongose.model('user', userSchema);

module.exports = User;
