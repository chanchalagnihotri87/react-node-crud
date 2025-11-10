import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StudentService from "../services/student";

export default function HomePage() {
  const [pageNo, setPageNo] = useState();
  const [totalPages, setTotalPages] = useState();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  //#region Get Students
  const [students, setStudents] = useState([]);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    loadStudents();
  }, []);

  const loadStudents = async (pageNo?: Number) => {
    if (!pageNo) {
      pageNo = 1;
    }

    const studentRes = await StudentService.getStudents(pageNo);

    setStudents(studentRes.students);
    setTotalPages(studentRes.totalPages);
    setPageNo(studentRes.pageNo);
  };
  //#endregion

  const editStudent = (studentId: string) => {
    navigate(`/edit-student/${studentId}`);
  };

  //#region Delete Student
  const deleteStudent = async (studentId: number) => {
    const confirmed = window.confirm("Are you sure to delete this?");

    if (confirmed) {
      await StudentService.deleteStudent(studentId);

      await loadStudents();
    }
  };
  //#endregion

  return (
    <>
      <div className="row">
        <div className="col-md-8 mx-auto">
          <h2>Students</h2>
          {students.map((std) => (
            <div key={std._id} className="row mb-1">
              <div className="col ms-1">
                <img
                  src={
                    `${process.env.REACT_APP_API_URL}/student/image/` +
                    std.photo
                  }
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
                  onClick={() => editStudent(std._id.toString())}>
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
      </div>
    </>
  );
}
