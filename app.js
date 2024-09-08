const express = require("express");
const dotenv = require("dotenv").config()
const app = express();
require(`./config/dbConnect`)
const port = process.env.PORT
app.use(express.json())
app.use("/api/users", require("./routes/userRoutes") )
app.use("/api/books", require("./routes/bookRoutes") )
app.use("/api/transactions", require("./routes/transactionRoutes") )



app.listen(port,()=>{
  console.log(`app is running at port ${port}`)
})