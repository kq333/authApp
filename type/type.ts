export interface DataUser {
  name: string;
  phone: string;
  email: string;
  photo: string;
  password: string;
}

export interface State {
  isLogin: boolean;
  rejectToRegister: boolean;
  isEditSaved: boolean;
  loginUserError: string;
}
