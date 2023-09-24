import { useState } from 'react';

import './personEdit.scss';

import backIcon from '../../assets/icons/personal/chevron-left.svg';

interface Props {
  closeEditComponent: (event: boolean) => void;
}

export const PersonEdit: React.FC<Props> = ({ closeEditComponent }) => {
  const [isActive, setIsActive] = useState<boolen>(false);

  const handlerCloseComponent = () => {
    setIsActive(!isActive);
    closeEditComponent(isActive);
  };

  return (
    <div className='edit-page'>
      <div className='edit-page__back-btn'>
        <img src={backIcon} alt='icon' />{' '}
        <span
          className='edit-page__back-btn-text'
          onClick={() => handlerCloseComponent()}
        >
          Back
        </span>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>

      <div className='edit-page__wrapper'>
        <h2 className='edit-page__header'>Personal info</h2>
        <p className='edit-page__paragraph'>
          Basic info, like your name and photo
        </p>

        <div className='edit-page__edit-photo'>
          <img src={backIcon} alt='' />
          <span className='edit-page__edit-photo-text'>Change photo</span>
        </div>
        <br></br>

        <form className='edit-page__form'>
          <div>
            <label htmlFor='name' className='edit-page__elem-label'>
              Name
            </label>
            <br></br>
            <br></br>

            <div className='edit-page__elem-input'>
              <input
                type='text'
                name='name'
                id='name'
                required
                minLength={4}
                placeholder='Enter yout name'
                className='edit-page__elem-input-elem'
                autoComplete='email'
              />
            </div>
          </div>

          <div>
            <label htmlFor='bio' className='edit-page__elem-label'>
              Bio
            </label>
            <br></br>
            <br></br>
            <div className='edit-page__elem-input'>
              <textarea
                type='textarea'
                name='bio'
                id='bio'
                required
                minLength={4}
                placeholder='Enter yout bio'
                className='edit-page__elem-input-elem'
                rows={10}
              />
            </div>
          </div>

          <div>
            {' '}
            <label htmlFor='phone' className='edit-page__elem-label'>
              Phone
            </label>
            <br></br>
            <br></br>
            <div className='edit-page__elem-input'>
              <input
                type='number'
                name='phone'
                id='phone'
                required
                minLength={9}
                placeholder='Enter yout phone'
                className='edit-page__elem-input-elem'
              />
            </div>
          </div>

          <div>
            <label htmlFor='email' className='edit-page__elem-label'>
              Email
            </label>
            <br></br>
            <br></br>
            <div className='edit-page__elem-input'>
              <input
                type='email'
                name='email'
                id='email'
                required
                minLength={9}
                placeholder='Enter yout email'
                className='edit-page__elem-input-elem'
                autoComplete='email'
              />
            </div>
          </div>

          <div>
            <label htmlFor='password' className='edit-page__elem-label'>
              Password
            </label>
            <br></br>
            <br></br>
            <div className='edit-page__elem-input'>
              <input
                type='password'
                name='password'
                id='password'
                required
                minLength={9}
                placeholder='Enter yout password'
                className='edit-page__elem-input-elem'
                autoComplete='current-password'
              />
            </div>

          </div>
          
          <br></br>

          <input className='edit-page__submit-btn' type='submit' value='Save' />

        </form>

      </div>
    </div>
  );
};
