import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { loginUser } from '../../features/authSlice';

import './loginForm.scss';

import { socialIcons } from '../../../utils/helpers';

import emailIcon from '../../assets/icons/form/mail.svg';
import lockIcon from '../../assets/icons/form/lock.svg';

interface Props {
  openComponent: () => void;
}

export const LoginForm: React.FC<Props> = ({ openComponent }) => {
  const [emailValue, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const UnregisterUser = useSelector((state: any) => state.FireBaseReducer.loginUserError);

  const handlerEmailValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
  };

  const handlerPasswordValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
  };

  const sendData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore: Bypass TypeScript checking for this specific dispatch
    dispatch(loginUser({ email: emailValue, password }));
  };

  return (
    <div className='log-in'>
      <div className='log-in__wrapper'>
        <h2 className='log-in__header'>Login</h2>
        <form className='log-in__form' method='POST' onSubmit={sendData}>
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
              value={emailValue}
              onChange={handlerEmailValue}
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
              minLength={5}
              placeholder='Password'
              name='password'
              autoComplete='current-password'
              value={password}
              onChange={handlerPasswordValue}
            />
          </div>
          <div>
            <input type='submit' value='Login' className='log-in__submit-btn' />
          </div>

          {UnregisterUser.length > 0 ? <p className='log-in__error-log-in'>{UnregisterUser}</p> : null}

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
            <span
              className='log-in__login-register'
              onClick={() => openComponent()}
            >
              Register
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
