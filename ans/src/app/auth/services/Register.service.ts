import { Injectable } from '@angular/core';
import { Register } from '../interface/auth.interface';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  resgister: any = [
    {
      id: 1,
      type: 'text',
      placeholder: 'username',
      name: 'username',
    },
    {
      id: 2,
      type: 'email',
      placeholder: 'email',
      name: 'email',
    },
    {
      id: 3,
      type: 'password',
      placeholder: 'password',
      name: 'password',
    },
  ];

  createData = (data: Register) => {
    try {
      console.log(data);
      const res = from(
        this.http.post<any>('http://localhost:3000/createUser', data)
      );
      return res;
    } catch (error) {
      return;
    }
  };
}
