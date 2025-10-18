const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// const ObjectId = mongoose.types.ObjectId;

const adminSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
})

const userSchema = new Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    showResult: Boolean,
    exams: {type: Array, "default": []},
    orderStatus: {type: Array, "default": []},
})

const examSchema = new Schema({
    title: String,
    fullName: String,
    totalMarks: Number,
    data: {type: Array, "default": []}
})

const adminModel = mongoose.model("admin", adminSchema);
const userModel = mongoose.model("user", userSchema);
const examModel = mongoose.model("exam", examSchema);


module.exports = {adminModel, userModel, examModel};
