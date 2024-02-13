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
      ref: "departments",
      default: null,
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const OrganizationUserSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  organization_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "organizations",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const Organization = mongoose.model("organizations", OrganizationSchema);
export const OrganizationUsers = mongoose.model(
  "organization_users",
  OrganizationUserSchema
);
