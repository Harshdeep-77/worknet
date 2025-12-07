import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import ConnectionRequest from "../models/connections.model.js";

import PDFdocument from "pdfkit";
import fs from "fs";

const convertUserDataPDF = async (userData) => {
  const doc = new PDFdocument();
  const outputPath = crypto.randomBytes(32).toString("hex") + ".pdf";

  const stream = fs.createWriteStream("uploads/" + outputPath);

  doc.pipe(stream);
  doc.image(`uploads/${userData.userId.profilePicture}`, {
    align: "center",
    width: 100,
  });
  doc.fontSize(14).text(`Name:${userData.userId.name}`);
  doc.fontSize(14).text(`userName:${userData.userId.username}`);
  doc.fontSize(14).text(`Email:${userData.userId.email}`);
  doc.fontSize(14).text(`Bio:${userData.bio}`);
  doc.fontSize(14).text(`Current Position:${userData.currentPost}`);

  doc.fontSize(14).text(`Past Work:`);
  userData.pastWork.forEach((work, index) => {
    doc.fontSize(14).text(`Company name:${work.company}`);
    doc.fontSize(14).text(`Position:${work.position}`);
    doc.fontSize(14).text(`Years:${work.years}`);
  });
  doc.end();
  return outputPath;
};

//register

export const register = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;
    if (!name || !email || !password || !username)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "user already exist" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      username,
    });

    await newUser.save();

    const profile = new Profile({ userId: newUser._id });
    await profile.save();

    return res.json({ message: "user created" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email });

    //if user not found
    if (!user) return res.status(404).json({ message: "User does not found" });

    //check password match or not that provided by user
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentails" });

    const token = crypto.randomBytes(32).toString("hex");

    await User.updateOne({ _id: user._id }, { token });

    return res.json({ token: token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const uploadProfilePicture = async (req, res) => {
  const { token } = req.body;
  try {
    //check user
    const user = await User.findOne({ token: token });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    user.profilePicture = req.file.filename;
    await user.save();

    return res.json({ message: "profile picture updated" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//update profile

export const updateUserProfile = async (req, res) => {
  try {
    const { token, ...newUserData } = req.body;
    const user = await User.findOne({ token: token });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { username, email } = newUserData;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      if (existingUser || String(existingUser._id) !== String(user._id)) {
        return res.status(400).json({ message: "user already exist" });
      }
    }
    Object.assign(user, newUserData);
    await user.save();
    return res.json({ message: "user updated" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//get user and profile

export const getUserAndProfile = async (req, res) => {
  try {
    const { token } = req.body;
    const user = await User.findOne({ token: token });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const userProfile = await Profile.findOne({ userId: user._id }).populate(
      "userId",
      "name username email profilePicture"
    );
    return res.json(userProfile);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//update user profile
export const updateProfileData = async (req, res) => {
  try {
    const { token, ...newProfileData } = req.body;
    //first find user and then find user profile
    const userProfile = await User.findOne({ token: token });
    if (!userProfile) {
      return res.status(404).json({ message: "userProfile not found" });
    }
    const profile_to_update = await Profile.findOne({
      userId: userProfile._id,
    });
    Object.assign(profile_to_update, newProfileData);

    await profile_to_update.save();

    return res.json({ message: "Profle data updated" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//get all user profile

export const getAllUserProfile = async (req, res) => {
  try {
    const profile = await Profile.find().populate(
      "userId",
      "name username email profilePicture"
    );
    return res.json({ profile });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//download resume
export const downloadProfile = async (req, res) => {
  try {
    const user_id = req.query.id;

    if (!user_id) {
      return res
        .status(400)
        .json({ message: "userId is required in query param" });
    }

    const userProfile = await Profile.findOne({ userId: user_id }).populate(
      "userId",
      "name username email profilePicture"
    );

    if (!userProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    let fileName = await convertUserDataPDF(userProfile);
    return res.json({ message: "PDF generated", file: fileName });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//connection request
export const sendConnectionRequest = async (req, res) => {
  const { token, connectionId } = req.body;
  try {
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const connectionUser = await User.findOne({ _id: connectionId });

    if (!connectionUser) {
      return res.status(404).json({ message: "Connection user not found" });
    }

    const existingRequest = await ConnectionRequest.findOne({
      userId: user._id,
      connectionId: connectionUser._id,
    });
    if (!existingRequest) {
      return res.status(404).json({ message: "Request already exist" });
    }
    //if not then make new request
    const request = new ConnectionRequest({
      userId: user._id,
      connectionId: connectionUser._id,
    });
    await request.save();
    return res.json({ message: "Request senet" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//now how to take connections

export const getMyConnection = async (req, res) => {
  const { token } = req.body;
  try {
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(404).json({ message: "User  not found" });
    }
    const connection = await ConnectionRequest.find({
      userId: user._id,
    }).populate("connectionId", "name username email profilePicture");
    return res.json({ connection });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//what are my connection

export const whatAreMyConnection = async (req, res) => {
  const { token } = req.body;
  try {
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const connection = await ConnectionRequest.find({
      connectionId: user._id,
    }).populate("userId", "name username email profilePicture");

    return res.json(connection);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//to accept connection
export const acceptConnectionRequest = async (req, res) => {
  const { token, requestId, action_type } = req.body;
  try {
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const connection = await ConnectionRequest.findOne({ _id: requestId });
    if (!connection) {
      return res.status(404).json({ message: "connection not  found" });
    }
    if (action_type === "accept") {
      connection.status_accepted = true;
    } else {
      connection.status_accepted = false;
    }
    await connection.save();

    return res.json({ message: "Request updated" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
