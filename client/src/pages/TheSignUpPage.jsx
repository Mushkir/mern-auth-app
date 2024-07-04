import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const TheSignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the data to db
    const API_URL = "http://localhost:8000/auth/signup";

    try {
      const resp = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await resp.json();
      // console.log(data);

      const { status } = data;

      if (status == 201) {
        Swal.fire({
          title: "Account created!",
          text: "Your sign up process has been processed succesfully!",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed == true) {
            const path = "/sign-in";
            navigate(path);

            e.target.reset();
          }
        });
      } else if (status == 409) {
        const { message } = data;
        Swal.fire({
          title: "Error!",
          text: message,
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Technical error!",
          text: "Currently a technical error occured! Please try again!",
          icon: "error",
        });
      }
    } catch (error) {
      console.log("Error from SignUp: " + error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className=" text-3xl text-center font-semibold my-7">Sign Up</h1>

      <form
        action=""
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          id="username"
          className=" bg-slate-100 p-3 rounded-lg"
          placeholder="Username"
          onChange={handleChange}
        />

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

        <button className=" bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Sign Up
        </button>
      </form>

      <div className=" flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default TheSignUpPage;
