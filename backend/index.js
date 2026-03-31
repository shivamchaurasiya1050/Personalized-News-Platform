const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoute= require("./routes/auth.routes")
const userRoute= require("./routes/user.routes")
const feedRoute=  require("./routes/feed.routes")
const adAnalyticsRoute= require("./routes/ad.analytics.routes")
const adminRoute=require("./routes/admin.routes")
const connectDB = require("./config/db.connection");
connectDB();

require("./jobs/scheduler");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
  res.send("Hello from index!")
})

app.use("/api/auth",authRoute );
app.use("/api/user",userRoute );
app.use("/api/feed",feedRoute);
app.use("/api/ad",adAnalyticsRoute );
app.use("/api/admin",adminRoute );

app.listen(process.env.PORT, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);