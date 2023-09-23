import './App.scss';

import { FormComponent } from './components/form/formComponent';

function App() {
  return (
    <div className='page'>


      <div className='page__wrapper'>
      <main>

        <section className='page__section'>
          <FormComponent />
        </section>
      </main>
    </div>
    </div>

  );
}

export default App;
