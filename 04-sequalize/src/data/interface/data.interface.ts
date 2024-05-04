export interface createUserDetails {
  id?: number;
  userId?: number;
  firstname?: string;
  lastname?: string;
  age?: number;
  mobile?: number;
  gender?: string;
  profession?: string;
  address?: string;
  country?: string;
  pin?: number;
}

export class CreateTodo {
  task: string;
  descrption?: string;
}
export class DeleteTask {
  id: number;
}

export class ImageUpload {
  userId?: number;
  filename?: string;
  size?: number;
  content?: Buffer;
}

export class Password {
  email?: string;
  password?: any;
  confirmpassword?: string;
}
