import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Student from "../../components/Student";
import StudentService from "../../services/student";

export default function EditStudentPage() {
  const apiUrl = "http://localhost:3000";
  // const apiUrl =
  //   "https://nodejs-crud-api-hzead9f7gnekgdfy.centralindia-01.azurewebsites.net";

  const { studentId } = useParams();
  const [student, setStudent] = useState();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    loadStudent();
  }, [studentId]);

  const loadStudent = async () => {
    const student = await StudentService.getStudent(studentId);
    setStudent(student);
  };

  const onSubmit = async (formData: FormData) => {
    await StudentService.updateStudent(formData);
    navigate("/");
  };

  return (
    <>{student && <Student onSave={onSubmit} student={student}></Student>}</>
  );
}
