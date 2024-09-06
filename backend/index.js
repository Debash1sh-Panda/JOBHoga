const express = require('express');
const cookieparser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const JobApp = express();
const PORT = process.env.PORT || 2002;

//middleware
JobApp.use(express.json());
JobApp.use(express.urlencoded({extended: true}));
JobApp.use(cookieparser());
JobApp.use(cors({
    origin: "https://job-hoga-dl452xvey-debash1sh-pandas-projects.vercel.app",
    credentials: true,
  }));

//database
require('./database').databaseConnection();

//apis
const userRoute = require('./routes/route.user');
JobApp.use("/api/user", userRoute);

const companyRoute = require('./routes/route.company');
JobApp.use("/api/company", companyRoute);

const jobRoute = require('./routes/route.job');
JobApp.use("/api/job", jobRoute);

const applicationRoute = require('./routes/route.application');
JobApp.use("/api/application", applicationRoute);


JobApp.listen(PORT, () => {
    console.log(`Running on .. ${PORT}`);
})

JobApp.get("/", (req, res) => {
    res.send("WELCOME TO JobHoga");
  });