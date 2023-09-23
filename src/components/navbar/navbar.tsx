import { useState } from 'react';

import { navbarIcons } from '../../../utils/helpers';
import '../navbar/navbar.scss';

import arrowDown from '../../assets/icons/navbar/arrowDown.svg';
import arrowUp from '../../assets/icons/navbar/arrowUp.svg';
import devIcon from '../../assets/icons/devchallenges.svg';

export const Navbar = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isProfileActive, setIsProfileActive] = useState<string>('My profile');

  const changeIcon = !isActive ? arrowDown : arrowUp;

  return (
    <nav className='navbar'>
      <div className='navbar__wrapper'>
        <div className='navbar__logo'>
          <img src={devIcon} alt='logo' />
        </div>
        <div className='navbar__login-section'>
          <div className='navbar__login-section-wrapper'>
            <div className='navbar__login-group-one'>
              <img className='navbar__user-img' src='' alt='user image' />
              <span className='navbar__user-name'>tomek knapik </span>
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
