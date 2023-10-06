import { useEffect, useState } from 'react';
import { auth } from '../../../utils/fireBase';
import { onAuthStateChanged } from 'firebase/auth';

import { updateProfile, updatePassword } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { ref, set, get } from 'firebase/database';

import { useDispatch } from 'react-redux';
import { setEditChanges } from '../../features/authSlice';

import './personEdit.scss';

import backIcon from '../../assets/icons/personal/chevron-left.svg';
import photoIcon from '../../assets/icons/photo/camera.svg';
import UserIcon from '../../assets/icons/photo/person.svg';

interface Props {
  closeEditComponent: (event: boolean) => void;
}

export const PersonEdit: React.FC<Props> = ({ closeEditComponent }) => {
  const [isActive, setIsActive] = useState<boolen>(false);
  const [userName, setUserName] = useState<string>('');
  const [userBio, setUserBio] = useState<string>('');
  const [userPhone, setUserPhone] = useState<string>('');
  const [userPhoto, setUserPhoto] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');

  const dispatch = useDispatch();

  const handlerCloseComponent = () => {
    setIsActive(!isActive);
    closeEditComponent(isActive);
  };

  const userNames = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event);
  };

  const userBios = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserBio(event);
  };

  const userPhones = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserPhone(event);
  };

  const userPhotos = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserPhoto(event);
  };

  const userEmails = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(event);
  };

  const userPasswords = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(event);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (userPhoto.length > 0) {
          setUserPhoto('');
        }

        setUserPhoto(e.target.result);
      };

      reader.readAsDataURL(file);
    } else {
      setUserPhoto('');
    }
  };

  async function updateAuth(key: string, value: string): Promise<void> {
    try {
      if (key === 'displayName') {
        await updateProfile(auth.currentUser, {
          displayName: value,
        });
      }

      if (key === 'photoURL') {
        await updateProfile(auth.currentUser, {
          photoURL: value,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const saveUserData = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const db = getDatabase();

      const phoneNumberRef = ref(
        db,
        'users/' + auth.currentUser.uid + '/phoneNumber',
      );

      const bioInfoRef = ref(db, 'users/' + auth.currentUser.uid + '/bio');
      const photoInfoRef = ref(db, 'users/' + auth.currentUser.uid + '/photo');

      if (userPassword.length > 0) {
        updatePassword(auth.currentUser, userPassword);
      }

      if (userBio.length > 0) {
        set(bioInfoRef, userBio);
      }

      if (userPhone.length > 0) {
        set(phoneNumberRef, userPhone);
      }

      if (userName.length > 0) {
        await updateAuth('displayName', userName);
      }

      if (userPhoto.length > 0) {
        set(photoInfoRef, userPhoto);
      }

      console.log('User data updated successfully.');
    } catch (error) {
      console.error('Error updating user data:', error);
    }

    handlerCloseComponent();
    dispatch(setEditChanges(true));
  };

  useEffect(() => {
    const fetchData = async () => {
      const database = getDatabase();
      const databaseRef = ref(database, 'users/' + auth.currentUser.uid);
      const snapshot = await get(databaseRef);

      if (snapshot.exists()) {
        const dataBase = snapshot.val();
        const { photo } = dataBase;

        setUserPhoto(photo);
      } else {
        console.log('No data found for the user.');
      }
    };

    fetchData();
  }, []);

  return (
    <div className='edit-page'>
      <div className='edit-page__back-btn'>
        <img src={backIcon} alt='icon' />{' '}
        <span
          className='edit-page__back-btn-text'
          onClick={() => handlerCloseComponent()}
        >
          Back
        </span>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>

      <div className='edit-page__wrapper'>
        <h2 className='edit-page__header'>Personal info</h2>
        <p className='edit-page__paragraph'>
          Basic info, like your name and photo
        </p>

        <div className='edit-page__edit-photo'>
          <label className='edit-page__custom-file-label' htmlFor='imageInput'>
            {userPhoto ? (
              <img
                className='edit-page__uploade-img'
                src={userPhoto}
                alt='user image'
              />
            ) : (
              <div className='edit-page__default-img'>
                <img
                  className='edit-page__user-icon'
                  src={UserIcon}
                  alt='user icon'
                />

                <div></div>
              </div>
            )}{' '}
            <span className='edit-page__edit-photo-text'>CHANGE PHOTO</span>
          </label>
          <input
            type='file'
            id='imageInput'
            accept='image/*'
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>
        <br></br>

        <form className='edit-page__form' onSubmit={saveUserData}>
          <div>
            <label htmlFor='name' className='edit-page__elem-label'>
              Name
            </label>
            <br></br>
            <br></br>

            <div className='edit-page__elem-input'>
              <input
                type='text'
                name='name'
                id='name'
                minLength={4}
                placeholder='Enter yout name'
                className='edit-page__elem-input-elem'
                autoComplete='email'
                value={userName}
                onChange={(e) => userNames(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor='bio' className='edit-page__elem-label'>
              Bio
            </label>
            <br></br>
            <br></br>
            <div className='edit-page__elem-input'>
              <textarea
                type='textarea'
                name='bio'
                id='bio'
                minLength={4}
                placeholder='Enter yout bio'
                className='edit-page__elem-input-elem'
                rows={10}
                value={userBio}
                onChange={(e) => userBios(e.target.value)}
              />
            </div>
          </div>

          <div>
            {' '}
            <label htmlFor='phone' className='edit-page__elem-label'>
              Phone
            </label>
            <br></br>
            <br></br>
            <div className='edit-page__elem-input'>
              <input
                type='number'
                name='phone'
                id='phone'
                minLength={9}
                min={0}
                placeholder='Enter yout phone'
                className='edit-page__elem-input-elem'
                value={userPhone}
                onChange={(e) => userPhones(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor='password' className='edit-page__elem-label'>
              Password
            </label>
            <br></br>
            <br></br>
            <div className='edit-page__elem-input'>
              <input
                type='password'
                name='password'
                id='password'
                minLength={4}
                placeholder='Enter yout password'
                className='edit-page__elem-input-elem'
                autoComplete='current-password'
                value={userPassword}
                onChange={(e) => userPasswords(e.target.value)}
              />
            </div>
          </div>

          <br></br>

          <input className='edit-page__submit-btn' type='submit' value='Save' />
        </form>
      </div>
    </div>
  );
};
