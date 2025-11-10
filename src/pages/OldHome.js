import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Login from "../Login/Login";

export default function OldHomePage() {
  const [studentPhoto, setStudentPhoto] = useState();
  const [studentId, setStudentId] = useState();
  const [pageNo, setPageNo] = useState();
  const [totalPages, setTotalPages] = useState();
  //#region Get Students
  const [students, setStudents] = useState([]);
  useEffect(() => {
    loadStudents();
  }, []);

  const apiUrl = "http://localhost:3000";
  // const apiUrl =
  //   "https://nodejs-crud-api-hzead9f7gnekgdfy.centralindia-01.azurewebsites.net";

  const loadStudents = (pageNo?: Number) => {
    if (!pageNo) {
      pageNo = 1;
    }

    fetch(`${apiUrl}/student/getAll?pageNo=` + pageNo)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log("Get Students:");
        console.log(res);
        setStudents(res.students);
        setTotalPages(res.totalPages);
        setPageNo(res.pageNo);
        console.log("Students:");
        console.log(students);
      })
      .catch((err) => {
        console.error("Error occured while loading students:");
        console.log(err);
      });
  };
  //#endregion

  // const [photoFile, setPhotoFile] = useState(null);
  //#region Add Student

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("name", data.Name);
    formData.append("rollNo", data.RollNo);
    formData.append("clas", data.Class);

    // formData.append("PhotoFile", photoFile);
    if (data.PhotoFile) {
      formData.append("photoFile", data.PhotoFile);
    }

    if (studentId) {
      formData.append("studentId", studentId);
      // // FormData Post
      fetch(`${apiUrl}/student/update`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: formData,
      })
        .then((res) => {
          if (res.status === 401) {
            throw new Error("Unauthorized");
          }

          if (res.status === 403) {
            throw new Error("Forbidden");
          }

          if (!res.ok) {
            throw new Error(
              `Http error! \nStatus: ${
                res.status
              }  \n Error: ${res.toString()} `
            );
          }

          return res.json();
        })
        .then(() => {
          console.log("Student saved successfully.");
          loadStudents();
          resetForm();
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }

    // Create Student
    fetch(`${apiUrl}/student/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: formData,
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error("Unauthorized");
        }

        if (res.status === 403) {
          throw new Error("Forbidden");
        }

        if (!res.ok) {
          throw new Error(
            `Http error! \nStatus: ${res.status}  \n Error: ${res.toString()} `
          );
        }

        return res.json();
      })
      .then((res) => {
        console.log("Student saved successfully.");
        loadStudents();
        resetForm();
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("Form submitted successful.");
  };

  const handlePhotoUpload = (event) => {
    if (event.target.files.length > 0) {
      // setPhotoFile(event.target.files[0]);

      //Just added value to form rather than storing and mantain it with
      setValue("PhotoFile", event.target.files[0]);
      return;
    }

    setValue("PhotoFile", undefined);
  };

  const resetForm = () => {
    reset();
    setStudentId(undefined);
    setStudentPhoto(undefined);
  };

  //#endregion

  //#region Edit Data
  const fillEditData = (studentId: number) => {
    console.log("Edit button clicked.");
    console.log("StudentId:");
    console.log(studentId);
    fetch(`http://localhost:3000/student/get/${studentId}`)
      .then((res) => res.json())
      .then((student) => {
        console.log("Student:");
        console.log(student);
        setStudentId(studentId);
        setValue("Name", student.name);
        setValue("Class", student.clas);
        setValue("RollNo", student.rollNo);

        setStudentPhoto(student.photo);
      })
      .catch((err) => {
        console.log("Error occured while geting student with id:" + studentId);
        throw err;
      });
  };
  //#endregion

  //#region Delete Student
  const deleteStudent = (studentId: number) => {
    const confirmed = window.confirm("Are you sure to delete this?");

    if (confirmed) {
      fetch(`http://localhost:3000/student/delete/${studentId}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          loadStudents();
        });
    }
  };
  //#endregion

  //#region Login
  const onLoginSuccess = (token: string) => {
    sessionStorage.setItem("token", token);
    console.log("Successfully logged in.");
  };
  //#endregion

  return (
    <>
      <div className="row mb-3">
        <div className="col-12">
          <Login onLoginSuccess={onLoginSuccess}></Login>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <h2>Students</h2>
          {students.map((std) => (
            <div key={std._id} className="row mb-1">
              <div className="col ms-1">
                <img
                  src={`${apiUrl}/student/image/` + std.photo}
                  alt="Student"
                  height="50"></img>
              </div>

              <div className="col">{std.name}</div>
              <div className="col">{std.rollNo}</div>
              <div className="col">{std.clas}</div>
              <div className="col">{std._id}</div>
              <div className="col">
                <button
                  type="button"
                  onClick={() => fillEditData(std._id.toString())}>
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => deleteStudent(std._id.toString())}>
                  Delete
                </button>
              </div>
            </div>
          ))}

          <div className="row">
            <div className="col-md-12 text-center">
              <button
                disabled={pageNo === 1}
                onClick={() => loadStudents(pageNo - 1)}>
                &lt;
              </button>
              <button
                disabled={pageNo === totalPages}
                onClick={() => loadStudents(pageNo + 1)}>
                &gt;
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4 mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="Name">Name</label>
              <input
                type="text"
                placeholder="Name"
                {...register("Name", { required: true })}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Class">Class</label>
              <select
                {...register("Class", { required: true })}
                className="form-select">
                <option value="1">1st</option>
                <option value="2">2nd</option>
                <option value="3">3rd</option>
                <option value="4">4th</option>
                <option value="5">5th</option>
                <option value="6">6th</option>
                <option value="7">7th</option>
                <option value="8">8th</option>
                <option value="9">9th</option>
                <option value="10">10th</option>
                <option value="11">11th</option>
                <option value="12">12th</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="RollNo">Roll No.</label>
              <input
                type="number"
                placeholder="Roll No."
                {...register("RollNo", { required: true })}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Photo</label>
              <input type="file" onChange={handlePhotoUpload} />
            </div>
            {studentPhoto && (
              <div className="form-group">
                <img
                  src={"http://localhost:3000/images/students/" + studentPhoto}
                  height="75"
                />
              </div>
            )}
            <div className="form-group">
              <button type="submit" className="me-1">
                Submit
              </button>
              <button type="button" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
