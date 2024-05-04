export interface Register {
  username?: string;
  email?: string;
  password?: string;
}

export interface Login {
  email?: string;
  password?: string;
}


export class Password {
  email?: string;
  password?: any;
  confirmpassword?: string;
}

