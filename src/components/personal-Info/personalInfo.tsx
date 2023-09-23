import { useState } from 'react';

import './personalInfo.scss';

interface Props {
  editForm: (event: boolean) => void;
}

export const PersonalInfo: React.FC = ({ editForm }) => {
  const userDatas = {
    name: 'Rafal',
    img: '',
    bio: 'dsdsdsdss',
    phone: '7838383',
    email: 'ww@wp.pl',
    password: '*******',
  };

  const [userData, setUserData] = useState(userDatas);

  const [editElem, setEditElem] = useState<boolean>(false);

  const handlerEditBtn = () => {
    setEditElem(!editElem);
    editForm(!editElem);
  };

  return (
    <div className='personal-info'>
      <h2 className='personal-info__header'>Personal info</h2>
      <p className='personal-info__paragraph'>
        Basic info, like your name and photo
      </p>

      <div className='personal-info__personal-card'>
        <div className='personal-info__table-header'>
          <div className='personal-info__block'>
            <h2 className='personal-info__block-header'>Profile</h2>
            <p className='personal-info__block-paragraph'>
              Some info may be visible to other people
            </p>
          </div>

          <div className='personal-info__block'>
            <button
              className='personal-info__block-btn'
              type='button'
              onClick={() => handlerEditBtn()}
            >
              Edit
            </button>
          </div>
        </div>

        <ul className='personal-info__card-list'>
          {Object.entries(userData).map(([key, value]) => (
            <li className='personal-info__card-item' key={key}>
              <div className='personal-info__card-item-wrapper'>
                <span className='personal-info__card-item-name'>{key}</span>

                <span className='personal-info__card-item-about'>{value}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
