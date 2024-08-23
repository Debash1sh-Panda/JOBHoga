const Application = require("../models/model.application");
const Job = require("../models/model.job");

exports.applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(404).json({
        message: "Job Not Found, jobId required",
        success: false,
      });
    }

    // check if the user has already applied for the job
    const existingAppliction = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingAppliction) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }

    // check if the job exist
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job Not Found",
        success: false,
      });
    }

    // create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.application.push(newApplication._id);
    await job.save();

    return res.status(200).json({
      message: "Job Applied successfully",
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

exports.applicationJobDetails = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "companyId",
          options: { sort: { createdAt: -1 } },
        },
      })
      // .populate({
      //   path: "applicant",
      //   options: { sort: { createdAt: -1 } },
      // });

    if (!application) {
      return res.status(404).json({
        message: "No Application",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Application fetched successfully",
      application,
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

//check admin -how many applicant appply
exports.allApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "application",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job Not Found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Application details",
      job,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

exports.statusUpdate = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
        success: false,
      });
    }

    // find the application by applicationId
    const application = await Application.findOne({ _id: applicationId }).populate({
      path: 'applicant'
    })
    if (!application) {
      return res.status(400).json({
        message: "Application Not Found",
        success: false,
      });
    }

    //update the status
    application.status = status.toLowerCase();
    const applicationStatus = await application.save();

    return res.status(200).json({
      message: "Application details",
      applicationStatus,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};
