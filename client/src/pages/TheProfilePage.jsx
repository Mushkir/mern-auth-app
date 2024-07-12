import { useSelector } from "react-redux";

const TheProfilePage = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      <h1>Proifle</h1>
    </div>
  );
};

export default TheProfilePage;
