import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Student({ onSave, student }) {
  const [studentId, setStudentId] = useState();
  const [studentPhoto, setStudentPhoto] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (student) {
      setStudentId(student._id);
      setValue("Name", student.name);
      setValue("Class", student.clas);
      setValue("RollNo", student.rollNo);

      setStudentPhoto(student.photo);
    }
  }, []);

  const onSubmit = async (data) => {
    console.log("Calling product on submit");
    const formData = new FormData();

    formData.append("name", data.Name);
    formData.append("rollNo", data.RollNo);
    formData.append("clas", data.Class);

    if (data.PhotoFile) {
      formData.append("photoFile", data.PhotoFile);
    }

    if (studentId) {
      formData.append("studentId", studentId);
    }

    onSave(formData);

    console.log("Form submitted successful.");
  };

  const handlePhotoUpload = (event) => {
    if (event.target.files.length > 0) {
      setValue("PhotoFile", event.target.files[0]);
      return;
    }

    setValue("PhotoFile", undefined);
  };
  const resetForm = () => {
    reset();
    setStudentId(undefined);
    setStudentPhoto(undefined);
    navigate("/");
  };
  return (
    <div className="row">
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
                src={"http://localhost:3000/student/image/" + studentPhoto}
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
  );
}
