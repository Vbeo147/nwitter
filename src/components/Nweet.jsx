import { dbService, storageService } from "myBase";
import { useState } from "react";

export default function Nweet({ nweetObj, isOwner, style }) {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNeet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      //delete nweet
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
      await storageService.refFromURL(nweetObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
    });
    setEditing(false);
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewNeet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
            <div className={style.nweet_result_form}>
              <form onSubmit={onSubmit}>
                <input
                  className="components_form_input"
                  type="text"
                  placeholder="Edit your nweet"
                  value={newNweet}
                  onChange={onChange}
                  required
                />
                <input
                  className="components_form_input_submit"
                  type="submit"
                  value="Update Nweet"
                />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </div>
          )}
        </>
      ) : (
        <div className={style.nweet_result_container}>
          {nweetObj.attachmentUrl ? (
            <img
              src={nweetObj.attachmentUrl}
              width="50px"
              height="50px"
              alt=""
            />
          ) : (
            <img
              src="data:image/png;base64,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"
              width="50px"
              height="50px"
              alt=""
            />
          )}
          <p>{nweetObj.text}</p>
          {isOwner && (
            <div className={style.nweet_result_btn}>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
