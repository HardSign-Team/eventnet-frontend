import React, { useState } from "react";
import avatar from "../../assets/avatar.jpg";
import "./index.css";
import CustomButton from "../../shared/CustomButton/CustomButton";
import WatchProfile from "./WatchProfile";
import EditProfile from "./EditProfile";
import Image from "../../models/Image";

const Profile = () => {
  const [userAvatar, setUserAvatar] = useState<Image[]>([{
    url: avatar,
    file: null,
  }]);
  const [editing, setEditing] = useState(false);

  const reverseEditing = () => {
    setEditing(!editing);
  };

  console.log(userAvatar)

  return (
    <div className="profile">
      <figure className={"profile_avatar-wrapper"}>
        <img
          src={userAvatar[0].url}
          alt="user avatar"
          className="profile_avatar"
        />
      </figure>
      {!editing && (
        <CustomButton
          onClick={reverseEditing}
          classNameDiv={"edit-button"}
          label={"Редактировать"}
          height={36}
        />
      )}
      {!editing ? (
        <WatchProfile />
      ) : (
        <EditProfile setUserAvatar={setUserAvatar} />
      )}
    </div>
  );
};

export default Profile;
