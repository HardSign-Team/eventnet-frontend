import React, { useState } from "react";
import avatar from "../../assets/avatar.jpg";
import "./index.css";
import CustomButton from "../../shared/CustomButton/CustomButton";
import WatchProfile from "./WatchProfile";
import EditProfile from "./EditProfile";
import { observer } from "mobx-react-lite";
import { UserStore } from "../../stores/UserStore";

interface ProfileProps {
  userStore: UserStore;
}

const Profile: React.FC<ProfileProps> = observer(({ userStore }) => {
  const [userAvatar, setUserAvatar] = useState(
    !userStore.getImage() ? avatar : userStore.getImage
  );
  const [editing, setEditing] = useState(false);

  const reverseEditing = () => {
    setEditing(!editing);
  };

  return (
    <div className="profile">
      <figure className={"profile_avatar-wrapper"}>
        <img src={userAvatar} alt="user avatar" className="profile_avatar" />
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
        <WatchProfile userStore={userStore} />
      ) : (
        <EditProfile userStore={userStore} setEditProfile={setEditing} />
      )}
    </div>
  );
});

export default Profile;
