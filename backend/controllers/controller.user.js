const User = require("../models/model.user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getDataUri = require("../dataUri.js");
const cloudinary = require("../cloudinary.js");

exports.register = async (req, res) => {
  try {
    const { fullname, email, phone, password, role } = req.body;

    if (!fullname || !email || !phone || !password || !role) {
      return res.status(400).json({
        message: "All field required",
        success: false,
      });
    }

    const file = req.file;
    if (!file) {
      return res
        .status(400)
        .json({ message: "Profile photo is required", success: false });
    }

    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "user have alread existed, please login",
        success: false,
      });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phone,
      password: hashedpassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    return res.status(200).json({
      message: "registered successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal issue, please try again later",
      success: false,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All field required",
        success: false,
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "user not found, please register",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Enter correct password",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_TOKEN_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal issue, please try again later",
      success: false,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logout Successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal issue, please try again later",
      success: false,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { fullname, email, phone, bio, skills } = req.body;
    const file = req.file;

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",").map((skill) => skill.trim());
    }

    const userId = req.id; // Assumes middleware auth sets req.id to the user's ID
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (bio) user.profile.bio = bio;
    if (skillsArray) user.profile.skills = skillsArray;

    // Handle file upload to Cloudinary
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "image",
        format: "jpg",
      });
      // console.log('Cloudinary Response:', cloudResponse);

      if (cloudResponse) {
        user.profile.resume = cloudResponse.secure_url;
        user.profile.resumeOriginalName = file.originalname;
      }
    }

    await user.save();

    const { _id, role, profile } = user;
    return res.status(200).json({
      message: "Updated Successfully",
      user: { _id, fullname, email, phone, role, profile },
      success: true,
    });
  } catch (error) {
    console.error("Error updating profile:", error); // Useful for debugging
    return res.status(500).json({
      message: "Internal issue, please try again later",
      success: false,
    });
  }
};

exports.updateProfilePhoto = async (req, res) => {
  try {
    const file = req.file;
    const userId = req.id;

    // Check if file is provided
    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // Find the user by ID
    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Convert file to data URI
    const fileUri = getDataUri(file);

    // Upload the image to Cloudinary
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
      resource_type: "image",
      format: "jpg",
      transformation: [
        {
          width: 1650,
          height: 1650,
          crop: "fill",
          gravity: "center",
        },
      ],
    });

    // If the upload to Cloudinary is successful
    if (cloudResponse) {
      // Update the user's profile photo URL
      user.profile.profilePhoto = cloudResponse.secure_url;

      // Save the updated user information to the database
      await user.save();

      // Return a success response
      return res.status(200).json({
        success: true,
        message: "Profile photo updated successfully",
        user,
      });
    } else {
      // If Cloudinary upload fails
      return res.status(500).json({
        success: false,
        message: "Failed to upload photo to Cloudinary",
      });
    }
  } catch (error) {
    // Handle errors
    console.error("Error updating profile photo:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating profile photo",
    });
  }
};
