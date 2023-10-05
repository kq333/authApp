import { useState, useEffect } from 'react';

import { auth } from '../../../utils/fireBase';
import { onAuthStateChanged } from 'firebase/auth';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase, ref, get } from 'firebase/database';

import { DataUser } from '../../../type/type';

import './personalInfo.scss';

interface Props {
  editForm: (event: boolean) => void;
}

export const PersonalInfo: React.FC<Props> = ({ editForm }) => {
  const [userData, setUserData] = useState<DataUser>({
    name: '',
    phone: '',
    email: '',
    photo: '',
    password: '',
  });

  const [editElem, setEditElem] = useState<boolean>(false);

  const handlerEditBtn = () => {
    setEditElem(!editElem);
    editForm(!editElem);
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          name: user.displayName,
          phone: user.phoneNumber,
          email: user.email,
          photo: user.photoURL,
          password: '*'.repeat(user.email?.length - 3),
          bio: user.bio,
        };
        setUserData(userData);
      } else {
        setUserData(null);
      }
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const database = getDatabase();
      const databaseRef = ref(database, 'users/' + auth.currentUser.uid);
      const snapshot = await get(databaseRef);

      if (snapshot.exists()) {
        const dataBase = snapshot.val();
        const { bio, phoneNumber } = dataBase;

        setUserData((prevUserData) => {
          return {
            ...prevUserData,
            bio: bio,
            phone: phoneNumber,
          };
        });
      } else {
        console.log('No data found for the user.');
      }
    };

    fetchData();
  }, []);

  return (
    <div className='personal-info'>
      <h2 className='personal-info__header'>Personal info</h2>
      <p className='personal-info__paragraph'>
        Basic info, like your name and photo
      </p>

      <div className='personal-info__personal-card'>
        <div className='personal-info__table-header'>
          <div className='personal-info__block'>
            <h2 className='personal-info__block-header'>Profile</h2>
            <p className='personal-info__block-paragraph'>
              Some info may be visible to other people
            </p>
          </div>

          <div className='personal-info__block'>
            <button
              className='personal-info__block-btn'
              type='button'
              onClick={() => handlerEditBtn()}
            >
              Edit
            </button>
          </div>
        </div>

        <ul className='personal-info__card-list'>
          {Object.entries(userData).map(([key, value]) => (
            <li className='personal-info__card-item' key={key}>
              <div className='personal-info__card-item-wrapper'>
                <span className='personal-info__card-item-name'>{key}</span>
                {key === 'photo' ? (
                  <img className='personal-info__card-item-img' src={value} alt='User Photo' />
                ) : (
                  <span className='personal-info__card-item-about'>
                    {value}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
