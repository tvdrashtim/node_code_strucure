import { DepartmentUsers, OrganizationUsers, User } from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { StatusCode } from "../services/index.js";
import { ProfileImage } from "../utils/upload.js";

//create user
const createUser = async (res, userData) => {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    let profile_photo;
    if (userData.profilePhoto) {
      profile_photo = await ProfileImage(
        res,
        userData.profilePhoto,
        "profile_photo"
      );
    }

    const user = new User({
      ...userData,
      password: hashedPassword,
      profile_photo: profile_photo,
    });
    const savedUser = await user.save();

    // Generate JWT token
    const token = generateToken(savedUser);

    return { user: savedUser, token };
  } catch (error) {
    const message = error.message;
    return StatusCode.InternalErrorResponse(res, message);
  }
};

//generate token
const generateToken = (userData) => {
  const payload = {
    userId: userData._id,
    email: userData.email,
  };

  // Sign the token with your secret key
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  return token;
};

//get user by email
const getUserByEmail = async (res, email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    const message = "User not Found with this email address.";
    return StatusCode.InternalErrorResponse(res, message);
  }
};

//login user
const loginUser = async (res, email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    const message = "User not fount with this email.";
    return StatusCode.sendBadRequestResponse(res, message);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const message = "Invalid password.";
    return StatusCode.sendBadRequestResponse(res, message);
  } else {
    const token = generateToken(user);
    return { user, token };
  }
};

//update user
const updateUser = async (res, userId, userData) => {
  try {
    let hashedPassword;
    if (userData.password) {
      hashedPassword = await bcrypt.hash(userData.password, 10);
    }

    let profile_photo;
    if (userData.profilePhoto) {
      profile_photo = await ProfileImage(
        res,
        userData.profilePhoto,
        "profile_photo"
      );
    }

    const updatedData = {
      ...userData,
      password: hashedPassword,
      profile_photo: profile_photo,
    };

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
    if (!updatedUser) {
      const message = "User not found.";
      return StatusCode.sendNotFoundResponse(res, message);
    }
    return updatedUser;
  } catch (error) {
    const message = "Error updating user by ID.";
    return StatusCode.sendBadRequestResponse(res, message);
  }
};

//delete user
const deleteUser = async (res, userId) => {
  try {
    const deletedUser = await User.findByIdAndDelete(userId, { new: true });
    if (!deletedUser) {
      const message = "User not found.";
      return StatusCode.sendNotFoundResponse(res, message);
    }
    return deletedUser;
  } catch (error) {
    const message = "Error updating user by ID.";
    return StatusCode.sendBadRequestResponse(res, message);
  }
};

//get user details with pagination and search
const getUserDetails = async (page, limit, search, res) => {
  try {
    const query = {
      $or: [
        { first_name: { $regex: new RegExp(search, "i") } },
        { last_name: { $regex: new RegExp(search, "i") } },
      ],
    };

    const users = await User.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    if (users) {
      const totalUsers = await User.countDocuments();
      return { users, totalUsers };
    }
  } catch (error) {
    const message = "Error in finding users.";
    return StatusCode.sendBadRequestResponse(res, message);
  }
};

//get user with organization & department details
const getUserWithOrganizations = async (res, userId) => {
  try {
    const organizationUser = await OrganizationUsers.find({
      user_id: userId,
    }).populate({
      path: "organization_id",
      model: "organizations",
      select: "_id organization_name strength departments created_at",
    });

    const departmentUser = await DepartmentUsers.find({
      user_id: userId,
    }).populate({
      path: "department_id",
      model: "departments",
      select: "_id department_name strength created_at",
    });

    if (!organizationUser || !departmentUser) {
      return null;
    }
    const user = await User.findById(userId);

    return {
      user_id: user._id,
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      organization: organizationUser,
      department: departmentUser,
    };
  } catch (error) {
    const message = error.message;
    return StatusCode.sendBadRequestResponse(res, message);
  }
};

export const UserService = {
  createUser,
  loginUser,
  getUserByEmail,
  updateUser,
  deleteUser,
  getUserDetails,
  getUserWithOrganizations,
};
