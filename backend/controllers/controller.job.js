const Job = require("../models/model.job.js");

//admin
exports.createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experienceLevel,
      position,
      companyId,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experienceLevel ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary,
      location,
      jobType,
      experienceLevel: experienceLevel,
      position,
      companyId: companyId,
      created_by: userId,
    });
    return res.status(200).json({
      message: "Job created Successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

//student
exports.allJobDetails = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i"} },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate({
        path: "companyId",
      })
      .sort({ createdAt: -1 })
      .populate({
        path: "created_by",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "Job Not Found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Job fetched Successfully",
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

//student
exports.jobDetailsById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "application",
    });

    // Check if the job exists
    if (!job) {
      return res.status(404).json({
        message: "Job Not Found",
        success: false,
      });
    }

    // Return the job details if found
    return res.status(200).json({
      job,
      success: true,
      message: "Job Details Retrieved Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

//how many job are created by admin
exports.adminsJob = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "companyId",
      createdAt: -1,
    });
    if (!jobs) {
      return res.status(404).json({
        message: "Job Not Found",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    console.log(jobId);
    const deleteJob = await Job.findByIdAndDelete(jobId);

    return res.status(200).json({
      message: "Job Successfully Deleted",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};
