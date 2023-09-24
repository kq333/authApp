import { useState } from 'react';

import { Navbar } from '../navbar';
import { PersonalInfo } from '../personal-Info';
import { PersonEdit } from '../personal-edit';

export const EditSavedUserData = () => {
  const [editElem, setEditElem] = useState<boolean>(false);

  const editForm = (event: boolean) => {
    setEditElem(event);
  };

  const closeEditComponent = (event: boolean) => {
    setEditElem(event);
  };

  return (
    <div>
      <Navbar />

      {editElem ? (
        <PersonEdit closeEditComponent={closeEditComponent} />
      ) : (
        <PersonalInfo editForm={editForm} />
      )}
    </div>
  );
};
