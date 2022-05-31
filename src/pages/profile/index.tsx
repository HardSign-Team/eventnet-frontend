import React, { useState } from "react";
import "./index.css";
import CustomButton from "../../shared/CustomButton/CustomButton";
import WatchProfile from "./WatchProfile";
import EditProfile from "./EditProfile";
import { observer } from "mobx-react-lite";
import { UserStore } from "../../stores/UserStore";
import Image from "../../models/Image";

interface ProfileProps {
  userStore: UserStore;
}

const Profile: React.FC<ProfileProps> = observer(({ userStore }) => {
  const [editing, setEditing] = useState(false);
  const [userAvatar, setUserAvatar] = useState<Image[]>([
    {
      url: userStore.getImage(),
      file: null,
    },
  ]);

  const reverseEditing = () => {
    setEditing(!editing);
  };

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
        <WatchProfile userStore={userStore} />
      ) : (
        <EditProfile
          userStore={userStore}
          setEditProfile={setEditing}
          setUserAvatar={setUserAvatar}
          userAvatar={userAvatar}
        />
      )}
    </div>
  );
});

export default Profile;
