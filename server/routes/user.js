require("dotenv").config();
const { Router } = require("express");
const userRouter = Router();
const { userModel, examModel } = require("../db");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const { userMiddleware } = require("../middlewares/user");

// ROUTE FOR USER LOGIN
userRouter.post("/login", async function (req, res) {
  const objectSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(50),
  });

  const parsedData = objectSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.json({
      message: parsedData.error.issues[0].message,
      success: false,
    });
  }

  const { email, password } = req.body;

  const response = await userModel.findOne({ email, password });

  if (response) {
    const token = jwt.sign(
      { userId: response._id.toString() },
      process.env.JWT_USER_PASSWORD
    );
    res.json({ token: token, message: "Login Succcessful", success: true });
  } else {
    res.status(403).json({ message: "Incorrect creds", success: false });
  }
});

// ROUTE FOR UPDATE USER (GENERALLY USED FOR UPDATING MARKS)
userRouter.put("/update", userMiddleware, async function (req, res) {
  const objectSchema = z.object({
    _id: z.string(),
    email: z.string().email(),
    username: z.string(),
    password: z.string().min(6).max(50),
    exams: z
      .array(
        z.object({ examId: z.string(), score: z.number(), status: z.boolean() })
      )
      .optional(),
    orderStatus: z
      .array(
        z.object({
          id: z.number(),
          label: z.string(),
          completed: z.boolean(),
        })
      )
      .optional(),
  });

  const parsedData = objectSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.json({
      message: parsedData.error.issues[0].message,
      success: false,
    });
  }

  try {
    const { _id, email, username, password, exams, orderStatus } = req.body;

    await userModel.updateOne(
      { _id: _id },
      { email, username, password, exams, orderStatus }
    );
    res.json({ message: "Details updated successfully", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Error while submitting",
      success: false,
    });
  }
});

// ROUTE TO SEE USER DETAILS AND EXAMS ALOTTED
userRouter.get("/home", userMiddleware, async function(req, res) {
    const userId = req.userId;
    
    const response = await userModel.findOne({_id: userId});
    console.log(response)
    res.json({message: "DATA FECTCHED SUCCCESSFULLY", data: response, success: true});
})

//ROUTE ON STARTING A EXAM
userRouter.get("/live", userMiddleware, async function(req, res) {
    const examId = req.body.examId;
    
    const response = await examModel.findOne({_id: examId});
    res.json({message: "EXAM DATA FECTCHED SUCCCESSFULLY", data: response});
})

//ROUTE ON SUBMIT FOR UPDATING EXAM SCORE
userRouter.put("/score", userMiddleware, async function(req, res) {
    const userId = req.userId;
    const dataSet = req.body;

    const user = await userModel.findOne({ _id: userId });
    const arr = user.exams.map(item => {
        if(item.examId == dataSet.examId){
            return {examId: item.examId, score: dataSet.score};
        } else {
            return {examId: item.examId, score: item.score};
        }
    })

    await userModel.updateOne({_id: userId}, {exams: arr});
    res.json({message: "Score submitted successfully"});
})

userRouter.post("/examdetails", userMiddleware, async function (req, res) {
  const dataSet = req.body;

  const examDetails = await examModel.findOne({_id: dataSet._id});
  console.log(examDetails)
  res.json({ examDetails });
});

module.exports = { userRouter };
