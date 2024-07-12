import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TheNavBar = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="bg-gray-200 flex justify-between items-center px-32 py-5">
      <div>
        <h1 className=" font-bold text-xl">Auth App</h1>
      </div>

      <ul className="inline-flex space-x-5">
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About</Link>

        {currentUser ? (
          <Link to={"/profile"}>
            <img
              className="w-7 h-7 rounded-full object-cover"
              src={currentUser.profilePicture}
              alt={`${currentUser.username}'s image`}
            />
          </Link>
        ) : (
          <Link to={"/sign-in"}>Sign-in</Link>
        )}
      </ul>
    </div>
  );
};

export default TheNavBar;
