import { DepartmentService, StatusCode } from "../services/index.js";

//create department
const createDepartment = async (req, res) => {
  try {
    let departmentData = req.body;

    const existingDepartment = await DepartmentService.getDepartment(
      res,
      departmentData.department_name
    );

    if (!existingDepartment) {
      const data = await DepartmentService.createDepartment(
        res,
        departmentData
      );

      const message = "Department created successfully.";
      return StatusCode.sendCreateResponse(res, message, data);
    } else {
      const message = "Department already exists with this name.";
      return StatusCode.sendBadRequestResponse(res, message);
    }
  } catch (error) {
    const message = error.message;
    return StatusCode.InternalErrorResponse(res, message);
  }
};

//get department by id
const getDepartmentById = async (req, res) => {
  try {
    const department_id = req.params.id;
    const data = await DepartmentService.getDepartmentById(res, department_id);

    const message = "Department retrieved successfully.";
    return StatusCode.sendSuccessResponse(res, message, data);
  } catch (error) {
    const message = error.message;
    return StatusCode.InternalErrorResponse(res, message);
  }
};

//create department user
const createDepartmentUser = async (req, res) => {
  try {
    let departmentData = req.body;

    const existingDepartmentUser = await DepartmentService.getDepartmentUser(
      res,
      departmentData
    );

    if (!existingDepartmentUser) {
      const data = await DepartmentService.createDepartmentUser(
        res,
        departmentData
      );

      const message = "Department user created successfully.";
      return StatusCode.sendCreateResponse(res, message, data);
    } else {
      const message = "Department user already exists.";
      return StatusCode.sendBadRequestResponse(res, message);
    }
  } catch (error) {
    const message = error.message;
    return StatusCode.InternalErrorResponse(res, message);
  }
};

//get department users
const getDepartmentUsers = async (req, res) => {
  try {
    const data = await DepartmentService.getDepartmentUsers(res);

    const message = "Department retrieved successfully.";
    return StatusCode.sendSuccessResponse(res, message, data);
  } catch (error) {
    const message = error.message;
    return StatusCode.InternalErrorResponse(res, message);
  }
};

export const DepartmentController = {
  createDepartment,
  getDepartmentById,
  createDepartmentUser,
  getDepartmentUsers,
};
