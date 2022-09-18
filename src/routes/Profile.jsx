import { authService, dbService } from "myBase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile({ userObj }) {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getMyNweets = async () => {
    // where is filter
    const nweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
    console.log(nweets.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getMyNweets();
  }, [getMyNweets]);
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
}
