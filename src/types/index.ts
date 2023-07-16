export interface UserRegisterInput {
  email: string;
  password: string;
}

export interface UserLoginInput extends UserRegisterInput {
  email: string;
  password: string;
}

export interface AuthWrapperProps {
  children: React.ReactNode;
}
