import React from 'react';
import './UserData.css';

type userDataProps = {
    label: string
    text: string
}
const UserData: React.FC<userDataProps> = ({label, text}) => {
    return (
        <div className="user-data">
            <p className={'user-data_label'}>{label}</p>
            <div className={'user-data_text'}>
                {text}
            </div>
        </div>
    );
};

export default UserData;