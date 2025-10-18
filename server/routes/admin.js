require("dotenv").config();
const { Router } = require("express");
const adminRouter = Router();
const { adminModel, userModel, examModel } = require("../db");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const { adminMiddleware } = require("../middlewares/admin");

// ROUTE FOR ADMIN CREATION
adminRouter.post("/signup", async function (req, res) {
  const objectSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(50),
  });

  console.log("here");

  const parsedData = objectSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.json({ error: parsedData.error });
  }

  try {
    const { email, password } = req.body;

    await adminModel.create({ email, password });
    res.json({ message: "You are successfully signed up" });
  } catch (error) {
    res.status(500).json({
      message: "Error while signing up",
    });
  }
});

// ROUTE FOR ADMIN LOGIN
adminRouter.post("/login", async function (req, res) {
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

  const response = await adminModel.findOne({ email, password });

  if (response) {
    const token = jwt.sign(
      { adminId: response._id.toString() },
      process.env.JWT_ADMIN_PASSWORD
    );
    res.json({ token: token, message: "Login Succcessful", success: true });
  } else {
    res.status(403).json({ message: "Incorrect creds", success: false });
  }
});

// ROUTE TO CREATE USER
adminRouter.post("/user", adminMiddleware, async function (req, res) {
  const objectSchema = z.object({
    email: z.string().email(),
    username: z.string(),
    password: z.string().min(6).max(50),
    showResult: z.boolean().optional(),
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
    const { email, username, password, exams, orderStatus } = req.body;

    await userModel.create({ email, username, password, exams, orderStatus, showResult: false });
    res.json({ message: "User was created successfully", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Error while creating user",
      success: false,
    });
  }
});

//ROUTE TO UPDATE USER
adminRouter.put("/user", adminMiddleware, async function (req, res) {
  const objectSchema = z.object({
    _id: z.string(),
    email: z.string().email(),
    username: z.string(),
    password: z.string().min(6).max(50),
    showResult: z.boolean().optional(),
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
    const { _id, email, username, password, exams, orderStatus, showResult } = req.body;

    await userModel.updateOne(
      { _id: _id },
      { email, username, password, exams, orderStatus }
    );
    res.json({ message: "User details updated successfully", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Error while creating user",
      success: false,
    });
  }
});

//ROUTE TO TOGGLE RESULT
adminRouter.put("/toggle-result", adminMiddleware, async function (req, res) {
  const dataSet = req.body;
console.log(dataSet._id)
console.log(dataSet.showResult)
  await userModel.updateOne(
    { _id: dataSet._id },
    { showResult: dataSet.showResult }
  );
  res.json({ success: true, message: "Result Status Changed." });
});

// ROUTE TO DELETE USER
adminRouter.delete("/user", adminMiddleware, async function (req, res) {
  const dataSet = req.body;

  await userModel.deleteOne({ _id: dataSet._id });
  res.json({ message: "User was delete successfully", success: true });
});

// ROUTE TO GET ALL USER
adminRouter.get("/users", adminMiddleware, async function (req, res) {
  const allUsers = await userModel.find({});
  res.json({ allUsers });
});

// ROUTE TO CREATE EXAM
adminRouter.post("/exam", adminMiddleware, async function (req, res) {
  try {
    const dataSet = req.body;
    let totalMarks = 0;
    let showResult = false;

    // Basic validation
    if (!dataSet || !dataSet.title || !dataSet.data) {
      return res.status(400).json({
        message:
          "Invalid request data. Ensure 'title' and 'data' fields are provided correctly.",
        success: false,
      });
    }

    // Extract title and data
    const { title, fullName, data } = dataSet;

    // Map through data to construct the array of questions
    const formattedQuestions = data.map((item) => ({
      question: item.question,
      marks: item.marks,
      options: item.options,
      correctOption: item.correctOption,
    }));

    data.map(
      (item) => (totalMarks = parseInt(totalMarks) + parseInt(item.marks))
    );

    // Create exam entry in the database
    await examModel.create({
      title,
      fullName,
      showResult,
      totalMarks,
      data: formattedQuestions,
    });

    // Respond success
    res.json({
      message: "Paper Added Successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error creating exam:", error);
    res.status(500).json({
      message: "Failed to create exam. Please try again later.",
      success: false,
    });
  }
});

// ROUTE TO MODIFY EXAM
adminRouter.put("/exam", adminMiddleware, async function (req, res) {
  const dataSet = req.body;

  const arr = dataSet.data.map((item) => {
    let newObj = {
      question: item.question,
      options: item.options,
      correctOption: item.correctOption,
    };

    return newObj;
  });

  await examModel.updateOne(
    { _id: dataSet._id },
    { title: dataSet.title, data: arr }
  );
  res.json({ message: "Exam Question was modified successfully" });
});

// ROUTE TO DELETE EXAM
adminRouter.delete("/exam", adminMiddleware, async function (req, res) {
  const dataSet = req.body;

  await examModel.deleteOne({ _id: dataSet._id });
  res.json({ message: "Exam was delete successfully", success: true });
});

// ROUTE TO SEE SPECIFIC EXAM DETAILS
adminRouter.post("/examdetails", adminMiddleware, async function (req, res) {
  const dataSet = req.body;

  const examDetails = await examModel.findOne({ _id: dataSet._id });
  console.log(examDetails);
  res.json({ examDetails });
});

// ROUTE TO SEE ALL EXAM
adminRouter.get("/exams", adminMiddleware, async function (req, res) {
  const allExams = await examModel.find({});
  res.json({ exams: allExams });
});

//ROUTE TO ASSIGN EXAM
adminRouter.put("/assign", adminMiddleware, async function (req, res) {
  const dataSet = req.body;

  let userData = await userModel.findOne({ _id: dataSet.userId });

  let obj = userData.exams;
  obj.push({ examId: dataSet.examId, score: 0 });

  await userModel.updateOne({ _id: dataSet.userId }, { exams: obj });
  res.json({ message: "Exam was added" });
});

module.exports = { adminRouter };
