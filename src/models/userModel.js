import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile_photo: {
    type: String,
    default: null,
  },
  country_code: {
    type: String,
    default: null,
    required: function () {
      return this.phone_number;
    },
  },
  phone_number: {
    type: String,
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("users", UserSchema);

export default User;
