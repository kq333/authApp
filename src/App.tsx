import './App.scss';
import React from 'react';

import { EditSavedUserData } from './components/edit-saved';
import { LoginRegisterComponent } from './components/login-register-component';
import { useAppSelector } from './store/hooks';
import { RootState } from './store/store';

function App() {
  const { isLogin } = useAppSelector((state: RootState) => state.auth);

  return (
    <div className='page'>
      <div className='page__wrapper'>
        <main className='page__main'>
          <section className='page__section'>
            {!isLogin ? <LoginRegisterComponent /> : <EditSavedUserData />}
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
