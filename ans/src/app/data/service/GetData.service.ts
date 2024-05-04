import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { createUserDetails, Task } from '../interface/data.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  constructor(private http: HttpClient) {}

  // gender Array
  gender: any = ['Male', 'Female', 'Others'];
  // country Array
  Conturies: any = [
    'Select',
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Congo (Congo-Brazzaville)',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czechia (Czech Republic)',
    'Democratic Republic of the Congo',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Eswatini',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Holy See',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Morocco',
    'Mozambique',
    'Myanmar (formerly Burma)',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'North Korea',
    'North Macedonia',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Palestine State',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Korea',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Sweden',
    'Switzerland',
    'Syria',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Timor-Leste',
    'Togo',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States of America',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Zambia',
    'Zimbabwe',
  ];
  // get user data
  getData = () => {
    try {
      const id = localStorage.getItem('userid');
      const res = from(
        this.http.get<any>(`http://localhost:3000/Finduser/${id}`)
      );
      return res;
    } catch (error) {
      return;
    }
  };

  // get user details in table of contnet
  getDataDescribe = () => {
    try {
      return this.http
        .get<any>(`http://localhost:3000/UpdateUser/describe`)
        .pipe(
          map((e) => {
            return e;
          })
        );
    } catch (error) {
      return;
    }
  };
  // get userdetails
  getDataUserdet = () => {
    const id = localStorage.getItem('userid');
    try {
      return this.http
        .get<any>(`http://localhost:3000/Finduser/userdetails/${id}`)
        .pipe(
          map((e) => {
            return e;
          })
        );
    } catch (error) {
      return;
    }
  };

  // update userdetails
  postuserDeatils = (data: createUserDetails) => {
    try {
      const id = localStorage.getItem('userid');
      const res = from(
        this.http.patch<any>(`http://localhost:3000/UpdateUser/${id}`, data)
      );
      return res;
    } catch (error) {
      return;
    }
  };

  // fetch image
  fetchImage = () => {
    const id = localStorage.getItem('userid');
    try {
      return this.http
        .get<any>(`http://localhost:3000/Finduser/image/${id}`)
        .pipe(
          map((e) => {
            return e;
          })
        );
    } catch (error) {
      return;
    }
  };
  // update userdetails
  addtask = (data: Task) => {
    try {
      const id = localStorage.getItem('userid');
      const res = from(
        this.http.post<any>(`http://localhost:3000/addtask/${id}`, data)
      );
      return res;
    } catch (error) {
      return;
    }
  };

  // gettask
  gettask = () => {
    const id = localStorage.getItem('userid');
    try {
      return this.http
        .get<any>(`http://localhost:3000/Finduser/task/${id}`)
        .pipe(
          map((e) => {
            return e;
          })
        );
    } catch (error) {
      return;
    }
  };

  sun: boolean = false;
  update = () => {
    this.sun = !this.sun;
  };
  getsun = () => {
    return this.sun;
  };

  delete = (id: number) => {
    const userid = localStorage.getItem('userid');
    let data = {
      id: id,
    };
    try {
      return this.http
        .post<any>(`http://localhost:3000/deletetask/${userid}`, data)
        .pipe(
          map((e) => {
            return e;
          })
        );
    } catch (error) {
      return;
    }
  };
}
