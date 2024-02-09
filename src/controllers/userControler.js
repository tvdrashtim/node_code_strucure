import { UserService, StatusCode } from "../services/index.js";

//create user
const createUser = async (req, res) => {
  try {
    const userData = req.body;

    const existingUser = await UserService.getUserByEmail(userData.email);
    if (!existingUser) {
      const data = await UserService.createUser(userData);

      const message = "User created successfully.";
      return StatusCode.sendCreateResponse(res, message, data);
    } else {
      const message = "User already exists with this email.";
      return StatusCode.sendBadRequestResponse(res, message);
    }
  } catch (error) {
    const message = error.message;
    return StatusCode.InternalErrorResponse(res, message);
  }
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await UserService.loginUser(res, email, password);

    const message = "User logged-in successfully.";
    return StatusCode.sendSuccessResponse(res, message, user, token);
  } catch (error) {
    const message = error.message;
    return StatusCode.InternalErrorResponse(res, message);
  }
};

//get login user
const getUser = async (req, res) => {
  try {
    const data = await UserService.getUserByEmail(req.user.email);

    const message = "User data retrieved successfully.";
    return StatusCode.sendSuccessResponse(res, message, data);
  } catch (error) {
    const message = error.message;
    return StatusCode.InternalErrorResponse(res, message);
  }
};

//update user
const updateUser = async (req, res) => {
  try {
    const data = await UserService.getUserById(req.user.id, req.body);

    const message = "User updated successfully.";
    return StatusCode.sendSuccessResponse(res, message, data);
  } catch (error) {
    const message = error.message;
    return StatusCode.InternalErrorResponse(res, message);
  }
};

//delete user
const deleteUser = async (req, res) => {
  try {
    const data = await UserService.deleteUser(req.params.id);

    const message = "User deleted successfully.";
    return StatusCode.sendSuccessResponse(res, message, data);
  } catch (error) {
    const message = error.message;
    return StatusCode.InternalErrorResponse(res, message);
  }
};

//get users with pagination
const getUserDetails = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';

    const { users, totalUsers } = await UserService.getUserDetails(page, limit, search);

    const data = {
      users,
      currentPage: page,
      totalUsers: totalUsers,
    };
    const message = "User details retrieved successfully.";
    return StatusCode.sendSuccessResponse(res, message, data);
  } catch (error) {
    const message = error.message;
    return StatusCode.InternalErrorResponse(res, message);
  }
};

export const UserController = {
  createUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
  getUserDetails,
};
