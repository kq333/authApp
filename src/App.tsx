import './App.scss';
import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { EditSavedUserData } from './components/edit-saved';
import { LoginRegisterComponent } from './components/login-register-component';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  const isUserLogin = useSelector((state) => state.FireBaseReducer.isLogin);

  useEffect(() => {
    setIsLogin(isLogin);
  }, [isLogin]);

  return (
    <div className='page'>
      <div className='page__wrapper'>
        <main className='page__main'>
          <section>{isUserLogin && <EditSavedUserData />}</section>

          <section className='page__section'>
            {!isUserLogin && <LoginRegisterComponent />}
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
