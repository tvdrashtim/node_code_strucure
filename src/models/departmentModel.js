import mongoose from "mongoose";

const { Schema } = mongoose;

const DepartmentSchema = new Schema({
  department_name: {
    type: String,
    required: true,
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const DepartmentUserSchema = new Schema({
  department_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "organizations",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const Department = mongoose.model("departments", DepartmentSchema);
export const DepartmentUsers = mongoose.model(
  "department_users",
  DepartmentUserSchema
);
