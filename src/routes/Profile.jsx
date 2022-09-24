import { authService } from "myBase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile({ refreshUser, userObj }) {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };
  // const getMyNweets = async () => {
  //   // where is filter
  //   const nweets = await dbService
  //     .collection("nweets")
  //     .where("creatorId", "==", userObj.uid)
  //     .orderBy("createdAt")
  //     .get();
  //   console.log(nweets.docs.map((doc) => doc.data()));
  // };
  // useEffect(() => {
  //   getMyNweets();
  // }, [getMyNweets]);
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
    }
    refreshUser();
  };
  return (
    <div className="components_column">
      <form onSubmit={onSubmit}>
        <input
          className="components_form_input"
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName || ""}
        />
        <input
          className="components_form_input_submit_lg"
          type="submit"
          value="Update Profile"
        />
      </form>
      <button
        style={{
          width: "100px",
          height: "25px",
          marginTop: "20px",
        }}
        onClick={onLogOutClick}
      >
        Log Out
      </button>
    </div>
  );
}
