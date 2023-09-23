import React from 'react';

import './formComponent.scss';

import { socialIcons } from '../../../utils/helpers';

import emailIcon from '../../assets/icons/form/mail.svg';
import lockIcon from '../../assets/icons/form/lock.svg';
import devicon from '../../assets/icons/devchallenges.svg';

export const FormComponent = () => {
  return (
    <div className='log-in'>
      <div className='log-in__wrapper'>
        <img className='log-in__logo-img' src={devicon} alt='logo' />
        <h2 className='log-in__header'>Login</h2>
        <form className='log-in__form' method='POST'>
          <div className='log-in__input-elem'>
            <label htmlFor='mail' className='log-in__input-label'>
              <img src={emailIcon} alt='email icon' />
            </label>

            <input
              id='email'
              className='log-in__input'
              type='email'
              required
              placeholder='Email'
              name='email'
              autoComplete='email'
            />
          </div>
          <div className='log-in__input-elem'>
            <label htmlFor='password' className='log-in__input-label'>
              <img src={lockIcon} alt='email icon' />
            </label>

            <input
              id='password'
              className='log-in__input'
              type='password'
              required
              minLength='5'
              placeholder='Password'
              name='password'
              autoComplete='current-password'
            />
          </div>
          <div>
            <input type='submit' value='Login' className='log-in__submit-btn' />
          </div>

          <p className='log-in__paragraph'>
            or continue with these social profile
          </p>

          <div className='log-in__socials'>
            {socialIcons.map((icon) => (
              <img
                className='log-in__socials-icon'
                key={icon.id}
                src={icon.img}
                alt={`${icon.name} icon`}
              />
            ))}
          </div>

          <div className='log-in__login-info'>
            Don’t have an account yet?
            <span className='log-in__login-register'>Register</span>
          </div>
        </form>
      </div>
    </div>
  );
};
