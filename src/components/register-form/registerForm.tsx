import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../features/authSlice';

import emailIcon from '../../assets/icons/form/mail.svg';
import lockIcon from '../../assets/icons/form/lock.svg'

import './registerForm.scss';

interface Props {
  openComponent: () => void;
}

export const RegisterForm: React.FC<Props> = ({ openComponent }) => {
  const [emailValue, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

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

    dispatch<any>(
      registerUser({ registerEmail: emailValue, registerPassword: password }),
    )
  };

  return (
    <div className='log-in'>
      <div className='log-in__wrapper'>
        <h2 className='log-in__header'>Register Now</h2>
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
            <input
              type='submit'
              value='Register now'
              className='log-in__submit-btn'
            />
          </div>

          <div className='log-in__login-info'>
            Adready a member?
            <span
              className='log-in__login-register'
              onClick={() => openComponent()}
            >
              Login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
