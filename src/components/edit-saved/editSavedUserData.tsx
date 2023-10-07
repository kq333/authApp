import { useState } from 'react';

import { Navbar } from '../navbar';
import { PersonalInfo } from '../personal-Info';
import { PersonEdit } from '../personal-edit';

import './editSavedUserData.scss';

export const EditSavedUserData = () => {
  const [editElem, setEditElem] = useState<boolean>(false);

  const editForm = (event: boolean) => {
    setEditElem(event);
  };

  const closeEditComponent = (event: boolean) => {
    setEditElem(event);
  };

  return (
    <div className='edit-user-data'>
      <div className='edit-user-data__nav-bar'>
        <Navbar />
      </div>

      <div className='edit-user-data__wrapper'>
        {editElem ? (
          <PersonEdit closeEditComponent={closeEditComponent} />
        ) : (
          <PersonalInfo editForm={editForm} />
        )}
      </div>
    </div>
  );
};
