import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Student from "../../components/Student";
import StudentService from "../../services/student";

export default function AddStudentPage() {
  const apiUrl = "http://localhost:3000";
  // const apiUrl =
  //   "https://nodejs-crud-api-hzead9f7gnekgdfy.centralindia-01.azurewebsites.net";

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData: FormData) => {
    await StudentService.addStudent(formData);
    navigate("/");

    console.log("Form submitted successful.");
  };

  return <Student onSave={onSubmit}></Student>;
}
