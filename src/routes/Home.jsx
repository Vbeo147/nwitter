import { useEffect, useState } from "react";
import { dbService } from "myBase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
import style from "css/Nweet.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

export default function Home({ userObj }) {
  const [nweets, setNweets] = useState([]);
  useEffect(() => {
    // snapshot is listener
    onSnapshot(
      query(collection(dbService, "nweets"), orderBy("createdAt", "desc")),
      (snapshot) => {
        const nweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNweets(nweetArray);
      }
    );
  }, []);
  return (
    <div className={`components_column`}>
      <NweetFactory userObj={userObj} style={style} />
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
            style={style}
          />
        ))}
      </div>
    </div>
  );
}
