export interface UserRegisterInput {
  email: string;
  password: string;
}

export interface UserLoginInput extends UserRegisterInput {
  remember: boolean;
}

export interface AuthWrapperProps {
  children: React.ReactNode;
}
