const mongoose =  require("mongoose")

const connectDB = async () =>  {
  const connect =  await mongoose.connect(process.env.MONGO_URI_LOCAL,{
    useNewUrlParser: true,
      useUnifiedTopology: true,
  })

  console.log(`Momgodb connected: ${connect.connection.host}`.cyan.underline.bold);

}

module.exports = connectDB