import { Link } from "react-router-dom";

const TheNavBar = () => {
  return (
    <div className="bg-gray-200 flex justify-between items-center px-32 py-5">
      <div>
        <h1 className=" font-bold text-xl">Auth App</h1>
      </div>

      <ul className="inline-flex space-x-5">
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/sign-in"}>Sign-in</Link>
      </ul>
    </div>
  );
};

export default TheNavBar;
