import { app } from "../firebase/firebase.config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { setSignInUserSession } from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const TheOAuth = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const { displayName, email, photoURL } = result.user;

      const API_URL = "http://localhost:8000/auth/googleAuth";

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: displayName,
          email: email,
          photo: photoURL,
        }),
      });

      const data = await response.json();
      dispatch(setSignInUserSession(data));

      navigate("/profile");

      //   console.log(data);
    } catch (error) {
      console.log(`Error from Auth: ${error}`);
    }
  };
  return (
    <button
      type="button"
      onClick={handleAuth}
      className="bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95"
    >
      Continue with Google
    </button>
  );
};

export default TheOAuth;
