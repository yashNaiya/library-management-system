const mongoose = require(`mongoose`)

const url = process.env.CONNECTION_STRING


mongoose.connect(url).then((connect)=> {
  console.log('connection succesful...',connect.connection.name);

}).catch((e)=> console.log(e));