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
                  className="components_form_input_submit_lg"
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
          {nweetObj.attachmentUrl && (
            <img
              src={nweetObj.attachmentUrl}
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
