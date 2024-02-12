import { Department } from "../models/index.js";
import { StatusCode } from "../services/index.js";

//create department
const createDepartment = async (res, departmentData) => {
  try {
    const department = new Department(departmentData);
    const savedDepartment = await department.save();
    
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

export const DepartmentService = {
  createDepartment,
  getDepartment,
  getDepartmentById,
};
