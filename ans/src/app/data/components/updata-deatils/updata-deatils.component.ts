import { Component, Input } from '@angular/core';
import { GetDataService } from '../../service/GetData.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updata-deatils',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './updata-deatils.component.html',
})
export class UpdataDeatilsComponent {
  constructor(
    private getdataservice: GetDataService,
    private toast: ToastrService,
    private router: Router
  ) {}

  // country
  country: any = [];
  // gender
  gender: any = [];

  describedata: any = [];

  key: any = [];

  data: any = [];

  data2: any = [];

  ngOnInit(): void {
    this.gender = this.getdataservice.gender;
    this.country = this.getdataservice.Conturies;

    this.getdataservice.getDataDescribe()?.subscribe(
      (res) => {
        this.describedata.push(res.message);
        console.log(res);
        this.getdetails();
        this.keydidived();
        this.addcontrol();
      },
      (error) => this.toast.error('some thing worg fetch data')
    );
    this.getdataservice.getData()?.subscribe(
      (res) => {
        const { password, ...result } = res;

        this.data.push(result);
      },
      (error) => console.log(error)
    );
  }

  keydidived = () => {
    this.describedata.forEach((element: any) => {
      this.key.push(Object.keys(element));
    });
    return this.key;
  };
  addcontrol = () => {
    this.key[0].forEach((element: any) => {
      this.formData.addControl(element, new FormControl(''));
    });
  };

  getdetails = () => {
    try {
      this.getdataservice.getDataUserdet()?.subscribe(
        (res) => {
          this.data2.push(res);
        },
        (error) => {
          console.error(error);
        }
      );
    } catch (error) {
      console.error('some thing went wrong');
    }
  };

  // dynamic form handling
  formData: FormGroup = new FormGroup({});

  save = () => {
    this.getdataservice.postuserDeatils(this.formData.value)?.subscribe(
      (res) => {
        alert('saved');
        this.toast.success('saved');
        this.router.navigate(['home/auth/home']);
      },
      (error) => {
        alert('something went wrong');
        this.toast.error('something went wrong');
      }
    );
  };
  @Input()
  sun: boolean | undefined;
}
