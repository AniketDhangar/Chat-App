import mongoose from "mongoose";

const ChatDB = async () => {
  try {
    const ChatConnection = await mongoose.connect(
      "mongodb://localhost:27017/chat"
    );
    console.log("Connection is set up with :", ChatConnection.connection.name);
  } catch (error) {
    console.log(error);
  }
};
export { ChatDB };


