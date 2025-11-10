import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth";
import { authActions } from "../store/auth";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      console.log("Going to submit login form.");
      console.log(data);

      // const response = await fetch("http://localhost:3000/auth/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     username: data.username,
      //     password: data.password,
      //   }),
      // });

      // if (!response.ok) {
      //   throw new Error(
      //     `Http error! \nstatus: ${
      //       response.status
      //     } \nerror: ${await response.text()}`
      //   );
      // }

      //var authData = await response.json();

      var authData = await AuthService.login({
        username: data.username,
        password: data.password,
      });

      dispatch(authActions.login({ token: authData.token }));

      navigate("/");
    } catch (error) {
      console.error("Error fetching data:", error);
      console.log("Username or password is not valid.");
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-4 mx-auto">
          <h1 className="text-center mb-4">Login</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group  mb-3">
              <input
                type="text"
                placeholder="username"
                className="form-control"
                {...register("username", { required: true })}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="text"
                placeholder="password"
                className="form-control"
                {...register("password", { required: true })}
              />
            </div>

            <input type="submit" className="w-100" />
          </form>
        </div>
      </div>
    </>
  );
}
