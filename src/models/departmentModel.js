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

const Department = mongoose.model("departments", DepartmentSchema);

export default Department;
