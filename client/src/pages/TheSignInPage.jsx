import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignInUserSession } from "../redux/user/userSlice";

const TheSignInPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    // console.log(e.target.id);

    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_URL = "http://localhost:8000/auth/signin";

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const data = await response.json();
      // console.log(data);

      const { status } = data;

      if (status == 401) {
        const { message } = data;
        Swal.fire({
          title: "Error!",
          text: `${message}, Please try again!`,
          icon: "error",
        });
      } else if (status == 404) {
        const { message } = data;
        Swal.fire({
          title: "Error!",
          text: `${message}, Please try again!`,
          icon: "error",
        });
      } else if (status == 200) {
        console.log(data);
        const { userDataExceptPassword } = data;
        Swal.fire({
          title: "Success!",
          text: `Login success!`,
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed == true) {
            dispatch(setSignInUserSession(userDataExceptPassword)); // Setting loggedin user's data as SESSION
            navigate("/");
            e.target.reset();
          }
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: `Technical error occured! Please try again!`,
          icon: "error",
        });
      }
    } catch (error) {
      console.log("Error from SignInPage: " + error.message);
    }
  };

  return (
    <div className=" max-w-lg p-3 mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign in</h1>

      {/* {JSON.stringify(formData)} */}
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
        method="post"
      >
        <input
          type="email"
          id="email"
          className=" bg-slate-100 p-3 rounded-lg"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          id="password"
          className=" bg-slate-100 p-3 rounded-lg"
          placeholder="Password"
          onChange={handleChange}
        />

        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Sign in
        </button>
      </form>

      <div className=" flex gap-2 mt-5">
        <p>Don&apos;t have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign up</span>
        </Link>
      </div>
    </div>
  );
};

export default TheSignInPage;
