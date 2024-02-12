import mongoose from "mongoose";

const { Schema } = mongoose;

const OrganizationSchema = new Schema({
  organization_name: {
    type: String,
    required: true,
  },
  strength: {
    type: Number,
    default: null,
  },
  departments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      default: null,
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Organization = mongoose.model("organizations", OrganizationSchema);

export default Organization;
