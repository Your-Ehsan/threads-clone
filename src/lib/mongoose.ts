import mongoose from "mongoose";
import { MongoDB_URL } from "@/src/constants";

let isConnected: boolean = false; // check connected with database or not

const ConnectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (!MongoDB_URL && MongoDB_URL === "")
    return console.error("Connection string not found ⛔");

  if (isConnected) return console.log("🍀 MongoDB Already Connected 🎉🎊");

  try {
    await mongoose.connect(MongoDB_URL, {
      dbName: "Threads-Clone",
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("🍀 MongoDB Connected 🎉🎊 succesfully");
  } catch (error) {
    console.log(error);
  }
};
export { ConnectToDB };
