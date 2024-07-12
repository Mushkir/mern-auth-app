import { useRef } from "react";
import { useSelector } from "react-redux";

const TheProfilePage = () => {
  const imgRef = useRef(null);

  const handleClick = () => {
    imgRef.current.click();
  };

  const { currentUser } = useSelector((state) => state.user); // Redux state
  //   console.log(currentUser);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className=" text-3xl  font-semibold text-center my-7 "> Profile</h1>

      <form action="" className="flex flex-col gap-4">
        <input type="file" hidden ref={imgRef} id="" />

        <img
          src={currentUser.profilePicture}
          className="h-24 w-24 self-center mt-2 cursor-pointer rounded-full object-cover"
          onClick={handleClick}
          alt={currentUser.username}
        />

        <input
          type="text"
          id="username"
          defaultValue={currentUser.username}
          placeholder="Username"
          className=" bg-slate-100 rounded-lg p-3 "
        />

        <input
          type="email"
          id="email"
          defaultValue={currentUser.email}
          placeholder="Email"
          className=" bg-slate-100 rounded-lg p-3 "
        />

        <input
          type="password"
          id="passsword"
          placeholder="Password"
          className=" bg-slate-100 rounded-lg p-3 "
        />

        <button className=" bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>

      <div className="flex justify-between mt-5">
        <span className=" text-red-700">Delete Account</span>
        <span className=" text-red-700">Sign out</span>
      </div>
    </div>
  );
};

export default TheProfilePage;
