const express = require("express");
const dotenv = require("dotenv").config()
const app = express();
require(`./config/dbConnect`)
const port = process.env.PORT
app.use(express.json())
app.use("/api/users", require("./routes/userRoutes") )
app.use("/api/books", require("./routes/bookRoutes") )
app.use("/api/transactions", require("./routes/transactionRoutes") )

const origin = ["https://yash-library-management.netlify.app", "http://localhost:5000"]
app.use(cors({
    credentials: true,
    origin: origin,
    methods: ["GET", "POST","PUT"],
    preflightContinue: true,
}));

app.get(`/`,(req,res)=>{
    res.send(`Hii There...`)
})
app.listen(port, '0.0.0.0',()=>{
  console.log(`app is running at port ${port}`)
})