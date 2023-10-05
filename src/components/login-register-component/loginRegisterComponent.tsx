import { useState } from 'react';

import { LoginForm } from '../Login-form';
import { RegisterForm } from '../register-form';

import './loginRegisterComponent.scss'

export const LoginRegisterComponent = () => {
  const [isActive, setIsActive] = useState<boolean>(true);

  const openComponent = () => {
    setIsActive(!isActive);
  };

  return (
    <div className='form'>
      {isActive ? (
        <LoginForm openComponent={openComponent} />
      ) : (
        <RegisterForm openComponent={openComponent} />
      )}
    </div>
  );
};
