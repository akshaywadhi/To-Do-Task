import userModel from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import taskModel from "../models/task.js";

export const signup = async (req, res) => {
  const { username, email, password, role } = req.body;
console.log(req.body)
  try {
    //Checking All Fields Are Field

    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: "All Fields Required" });
    }

   

    //Email Should Be Unique (i mean it should not already exist in database)

    const user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User Already Exist" });
    }

    //Hashing Password For Security Purpose

    const hashedPassword = await bcrypt.hash(password, 10);

    //Adding New User

    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();

    const accessToken = jwt.sign({ newUser }, process.env.JWTTOKEN, {
      expiresIn: "10h",
    });

    if (newUser) {
      res.status(201).json({
        error: false,
        newUser,
        accessToken,
        message: "New User Created",
      });
    } else {
      res.status(400).json({ message: "Input Fields Are Wrong" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Creating Login Controller

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All Fields Required" });
    }

    const userExist = await userModel.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userExist.password
    );

    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    const user = { user: userExist };

    const accessToken = jwt.sign(user, process.env.JWTTOKEN, {
      expiresIn: "10h",
    });

    return res.status(200).json({
      error: false,
      message: "Login Successfull",
      email,
      accessToken,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const getUser = async (req,res) => {

  const {user} = req.user

  const isUser = await userModel.findOne({_id : user._id})

  if(!isUser){
    return res.sendStatus(401)
  }

  return res.json({
    user : {
      username : isUser.username,
      email : isUser.email,
      _id : isUser._id,
    },
    message : ''
  })
}

//Tasks Controllers Start From Here

export const getAllTask = async (req, res) => {
  const userId = req.params.userId;
  const { user } = req.user;

  try {
    const tasks = await taskModel.find({ userId: user._id });
    return res.status(200).json({
      error: false,
      tasks,
      message: "All Tasks Retrieved",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

export const addTask = async (req, res) => {
  const { title, description, status, createdOn } = req.body;
  const { user } = req.user;

  try {
    if (!title || !description || !status || !createdOn) {
      return res.status(400).json({ message: "All Fields Are Required" });
    }

    const task = new taskModel({
      title,
      description,
      status,
      userId: user._id,
      createdOn
    });

    await task.save();

    return res.status(201).json({
      error: false,
      task,
      message: "task created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

export const editTask = async (req, res) => {
  const taskId = req.params.taskId;
  const { title, description, status, createdOn } = req.body;
  const { user } = req.user;
console.log(req.body)
  try {
    if (!title || !description || !status || !createdOn) {
      return res.status(400).json({ message: "No Changes Provided" });
    }

    const task = await taskModel.findOne({ _id: taskId, userId: user._id });

    if (!task) {
      return res.status(404).json({ message: "Task Not Found" });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    if(createdOn) task.createdOn = createdOn

    await task.save();

    return res.status(200).json({
      error: false,
      task,
      message: "Task Updated Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

export const deleteTask = async (req, res) => {
  const deleteId = req.params.deleteId;
  const { user } = req.user;

  try {
    const task = await taskModel.findOne({ _id: deleteId, userId: user._id });

    if (!task) {
      return res.status(404).json({ message: "Task Not Found" });
    }

    await taskModel.deleteOne({ _id: deleteId, userId: user._id });

    return res.status(200).json({
      error : false,
      message : "Task Has Been Deleted Successfully"
    })
  } catch (error) {
    return res.status(500).json({
      error: true,
      message : "Internal Server Error"
    })
  }
};
