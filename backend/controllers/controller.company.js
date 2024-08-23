const Company = require('../models/model.company')

exports.registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }

        let company = await Company.findOne({companyName:companyName});
        if (company) {
            return res.status(400).json({
                message: "You can't register same Company.",
                success: false
            });
        }

        company = await Company.create({
            companyName: companyName,
            userId: req.id
        })

        return res.status(201).json({
            message: "Company registerd successfully.",
            company,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

exports.companyDetails = async (req, res) => {
    try {
        const userId = req.id; //logged  in user id
        const companies = await Company.find({userId});
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            })
        }

        return res.status(200).json({
            companies,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

exports.companyDetailsById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            })
        }

        return res.status(200).json({
            company,
            success: false
        })
    } catch (error) {
        console.log(error);
    }
}

exports.updateCompany = async (req, res) => {
    try {
        const { companyName, description, website, location } = req.body;
        const file = req.file;

        const updateData = { companyName, description, website, location };
        console.log(updateData)

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {new: true});

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }

        return res.status(200).json({
            message: "Company information updated",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}