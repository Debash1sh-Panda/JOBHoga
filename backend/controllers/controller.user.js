const User = require("../models/model.user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { fullname, email, phone, password, role } = req.body;

    if (!fullname || !email || !phone || !password || !role) {
      return res.status(400).json({
        message: "All field required",
        success: false,
      });
    }

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
        success: false
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role",
        success: false
      });
    }

    const tokenData = {
      userId: user._id
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
        httpsOnly: true,
        sameSite: "strict",
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

    // cloudinary will add

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    const userId = req.id; //middleware auth
    let user = await User.findById(userId);

    //updating
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;
    // resume comes later ...

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Updated Successfully",
      user,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal issue, please try again later",
      success: false,
    });
  }
};