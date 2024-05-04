export interface createUser {
  userId?: number;
  username?: string;
  email?: string;
  password?: string;
  role?: 'ADMIN' | 'USER' | string;
}

export interface userLogin {
  email?: string;
  password?: string;
}

export interface createUserDetails {
  userId?: number;
  firstname?: string;
  lastname?: string;
  age?: number;
  mobile?: number;
  gender?: string;
  profession?: string;
}

export interface OTP {
  email?: string;
  otp: number;
}

export interface Image {
  userId?: number;
  filename?: string;
  imageType?: string;
  size?: number;
  imageData?: Buffer;
}
