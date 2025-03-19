const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contactNumber: {
        type: String, // Changed to String for flexibility
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Static signup method
userSchema.statics.signup = async function (name, email, contactNumber, password) {
    // Validation
    if (!name || !email || !contactNumber || !password) {
        throw Error("All fields must be filled");
    }
    if (!validator.isEmail(email)) {
        throw Error("Email not valid");
    }
    // Uncomment if you want to enforce strong passwords
    // if (!validator.isStrongPassword(password)) {
    //     throw Error('Password not strong enough');
    // }

    // Check if email already exists
    const exists = await this.findOne({ email });

    if (exists) {
        throw Error("Email already in use");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create the user
    const user = await this.create({ name, email, contactNumber, password: hash });

    return user;
};

// Static login method
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error("All fields must be filled");
    }

    // Find the user by email
    const user = await this.findOne({ email });
    if (!user) {
        throw Error("Incorrect email");
    }

    // Compare the password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error("Incorrect password");
    }

    return user;
};

module.exports = mongoose.model("User", userSchema);