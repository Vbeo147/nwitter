import { useState } from "react";
import { storageService, dbService } from "myBase";
import { v4 as uuidv4 } from "uuid";

export default function NweetFactory({ userObj, style }) {
  const [nweet, setNweet] = useState("");
  const [attachment, SetAttachment] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("nweets").add(nweetObj);
    setNweet("");
    SetAttachment("");
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNweet(value);
  };
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    // reader.onloadend is listener
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      SetAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => SetAttachment(null);
  return (
    <div className={style.nweet_form_container}>
      <h1
        style={{
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "600",
        }}
      >
        Hello {userObj.displayName}!
      </h1>
      <br />
      <form onSubmit={onSubmit} className={style.nweet_input_container}>
        <div>
          <input
            className="components_form_input"
            value={nweet}
            onChange={onChange}
            type="text"
            placeholder="What's on your mind?"
            maxLength={120}
            required
          />
          <input
            className="components_form_input_submit"
            type="submit"
            value="Ntweet"
          />
        </div>
        <div className={style.nweet_form_file}>
          <label htmlFor="ex_file">Picture</label>
          <input
            id="ex_file"
            type="file"
            accept="image/*"
            onChange={onFileChange}
          />
        </div>
        {attachment && (
          <div className="components_column">
            <img
              src={attachment}
              width="50px"
              height="50px"
              style={{
                marginBottom: "12px",
              }}
              alt=""
            />
            <button
              className="components_form_input_submit"
              onClick={onClearAttachment}
            >
              Clear
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
