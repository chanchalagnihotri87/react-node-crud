import {
  deleteAsync,
  getAsync,
  postAsFormAsync,
  putAsFormAsync,
} from "../utils/fetch";
const StudentService = {
  getStudent: (studentId) => {
    return getAsync(`/student/get/${studentId}`);
  },
  getStudents: (pageNo) => {
    return getAsync(`/student/getAll?pageNo=` + pageNo).catch((err) => {
      console.error("Error occured while loading students:");
      console.log(err);
    });
  },
  deleteStudent: (studentId) => {
    return deleteAsync(`/student/delete/${studentId}`);
  },
  addStudent: (formData) => {
    return postAsFormAsync(`/student/add`, formData);
  },

  updateStudent: (formData) => {
    return putAsFormAsync(`/student/update`, formData);
  },
};

export default StudentService;
