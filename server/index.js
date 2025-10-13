require('dotenv').config()
const express = require("express");
const jwt = require("jsonwebtoken");
const { adminRouter } = require("./routes/admin");
const mongoose = require("mongoose");
const { userRouter } = require("./routes/user");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


app.get("/", async function(req, res) {
    res.json({message: "Backend is successfully working.", success: true});
})

app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000, () => console.log("Listen at port 3000"));
}

main()