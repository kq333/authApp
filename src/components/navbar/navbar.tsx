import { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { logoutUser, setLogOut } from '../../features/authSlice';
import { auth } from '../../../utils/fireBase';
import { navbarIcons } from '../../../utils/helpers';
import { useSelector } from 'react-redux';

import { onAuthStateChanged } from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';
import { getDatabase, ref, get } from 'firebase/database';

import '../navbar/navbar.scss';
import arrowDown from '../../assets/icons/navbar/arrowDown.svg';
import arrowUp from '../../assets/icons/navbar/arrowUp.svg';
import personIcon from '../../assets/icons/photo/person.svg';

export const Navbar = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isProfileActive, setIsProfileActive] = useState<string>(
    navbarIcons[0].name,
  );

  const [userData, setUserData] = useState<string>('');

  const changeIcon = !isActive ? arrowDown : arrowUp;

  const isEditDataChanged = useSelector(
    (state) => state.FireBaseReducer.isEditSaved,
  );

  console.log(isEditDataChanged);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch(logoutUser());
      dispatch(setLogOut(false));
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          email: user.email,
          photo: '',
        };
        setUserData(userData);
      } else {
        setUserData(null);
      }
    });
  }, [isEditDataChanged]);

  useEffect(() => {
    const fetchData = async () => {
      const database = getDatabase();
      const databaseRef = ref(database, 'users/' + auth.currentUser.uid);
      const snapshot = await get(databaseRef);

      if (snapshot.exists()) {
        const dataBase = snapshot.val();
        const { photo } = dataBase;

        setUserData((prevUserData) => {
          return {
            ...prevUserData,

            photo: photo,
          };
        });
      } else {
        console.log('No data found for the user.');
      }
    };

    fetchData();
  }, [isEditDataChanged]);

  return (
    <nav className='navbar'>
      <div className='navbar__wrapper'>
        <div className='navbar__login-section'>
          <div className='navbar__login-section-wrapper'>
            <div className='navbar__login-group-one'>
              <img
                className='navbar__user-img'
                src={userData ? userData.photo : personIcon}
                alt='user image'
              />

              <span className='navbar__user-email'>
                {userData ? userData.email : ''}{' '}
              </span>
              <img
                className='navbar__handler-popup'
                src={changeIcon}
                alt='icon'
                onClick={() => setIsActive(!isActive)}
              />
            </div>

            {isActive && (
              <div className='navbar__login-group-two'>
                {navbarIcons.map((elem, index) => (
                  <div
                    className='navbar__login-group-two-wrapper'
                    key={elem.id}
                    onClick={
                      elem.name === 'Logout' ? () => handleLogout() : null
                    }
                  >
                    <div
                      className={
                        isProfileActive === elem.name
                          ? 'navbar__login-group-two-elem--isActive'
                          : 'navbar__login-group-two-elem'
                      }
                      onClick={() => setIsProfileActive(elem.name)}
                    >
                      <img
                        className='navbar__login-group-two-elem-img'
                        src={elem.src}
                        alt={`${elem.name} icon`}
                      />
                      <span className='navbar__login-group-two-elem-name'>
                        {elem.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
