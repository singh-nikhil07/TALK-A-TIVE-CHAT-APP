const mongoose = require("mongoose");
const User = require("../models/userModel");
const dotenv = require("dotenv");
dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI); // Debug line

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const email = "piyush@example.com";
  const password = "admin123";
  const name = "Admin";
  const pic = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({
      name,
      email,
      password,
      pic,
      isAdmin: true,
    });
    console.log("Admin user created:", user.email);
  } else {
    console.log("Admin user already exists:", user.email);
  }
  mongoose.disconnect();
};

createAdmin().catch((err) => {
  console.error("Error creating admin user:", err);
  mongoose.disconnect();
}); 