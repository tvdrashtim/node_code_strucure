import { Department, DepartmentUsers } from "../models/index.js";
import { StatusCode } from "../services/index.js";
import { OrganizationService } from "./index.js";

//create department
const createDepartment = async (res, departmentData) => {
  try {
    const department = new Department(departmentData);
    const savedDepartment = await department.save();

    if (savedDepartment.organization) {
      const data = {
        departments: [savedDepartment.id],
      };
      await OrganizationService.updateOrganizationById(
        res,
        savedDepartment.organization,
        data
      );
    }
    return { department: savedDepartment };
  } catch (error) {
    const message = "Error creating department";
    return StatusCode.InternalErrorResponse(res, message);
  }
};

//get department by name
const getDepartment = async (res, department_name) => {
  try {
    const department = await Department.findOne({ department_name });
    return department;
  } catch (error) {
    const message = "Department not found.";
    return StatusCode.InternalErrorResponse(res, message);
  }
};

//get department by id
const getDepartmentById = async (res, id) => {
  try {
    const department = await Department.findById({ _id: id });

    return department;
  } catch (error) {
    const message = "Department not found.";
    return StatusCode.InternalErrorResponse(res, message);
  }
};

//create department user
const createDepartmentUser = async (res, departmentData) => {
  try {
    const department = new DepartmentUsers(departmentData);
    const savedDepartmentUser = await department.save();

    return { departmentUser: savedDepartmentUser };
  } catch (error) {
    const message = "Error creating department user";
    return StatusCode.InternalErrorResponse(res, message);
  }
};

//get department user
const getDepartmentUser = async (res, departmentData) => {
  try {
    const department = await DepartmentUsers.findOne({
      user_id: departmentData.user_id,
      department_id: departmentData.department_id,
    });

    return department;
  } catch (error) {
    const message = error.message;
    return StatusCode.InternalErrorResponse(res, message);
  }
};

//get department users
const getDepartmentUsers = async (res) => {
  try {
    const data = await DepartmentUsers.find()
      .populate({
        path: "department_id",
        model: "departments",
        select: "_id department_name",
      })
      .populate({
        path: "user_id",
        model: "users",
        select: "_id first_name last_name email",
      });

    return data;
  } catch (error) {
    const message = error.message;
    return StatusCode.InternalErrorResponse(res, message);
  }
};

export const DepartmentService = {
  createDepartment,
  getDepartment,
  getDepartmentById,
  createDepartmentUser,
  getDepartmentUser,
  getDepartmentUsers,
};
