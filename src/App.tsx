import './App.scss';
import { useState, useEffect } from 'react';

import { EditSavedUserData } from './components/edit-saved';
import { LoginRegisterComponent } from './components/login-register-component';
import { useAppSelector } from './store/hooks';
import { RootState } from './store/store';

function App() {
  const [isLogins, setIsLogins] = useState(false);
  const { isLogin } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    setIsLogins(isLogins);
  }, [isLogins]);

  return (
    <div className='page'>
      <div className='page__wrapper'>
        <main className='page__main'>
          <section>{isLogin && <EditSavedUserData />}</section>

          <section className='page__section'>
            {!isLogin && <LoginRegisterComponent />}
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
