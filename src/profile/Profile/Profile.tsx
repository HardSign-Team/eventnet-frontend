import React, { useState } from "react";
import avatar from "../../assets/avatar.jpg";
import "./Profile.css";
import CustomButton from "../../shared/CustomButton/CustomButton";
import WatchProfile from "../WatchProfile/WatchProfile";
import EditProfile from "../EditProfile/EditProfile";

const Profile = () => {
  const [editing, setEditing] = useState(false);

  const reverseEditing = () => {
    setEditing(!editing);
  };

  return (
    <div className="profile">
      <figure className={"profile_avatar-wrapper"}>
        <img src={avatar} alt="Avatar" className="profile_avatar" />
      </figure>
      {!editing ? (
        <CustomButton
          onClick={reverseEditing}
          classNameDiv={"edit-button"}
          label={"Редактировать"}
          height={36}
        />
      ) : (
        <button
          className={"change-avatar_button"}
          onClick={() => console.log("change-avatar")}
        >
          Изменить фото
        </button>
      )}
      {!editing ? <WatchProfile /> : <EditProfile />}
    </div>
  );
};

export default Profile;
