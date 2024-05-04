import { Component, HostBinding } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { GetDataService } from '../../service/GetData.service';
import { Router } from '@angular/router';
import { AddTaskComponent } from '../../components/add-task/add-task.component';
import { TableShowComponent } from '../../components/table-show/table-show.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProfileComponent, AddTaskComponent, TableShowComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private getdataservice: GetDataService, private router: Router) {}

  data: any = [];
  imageUrl: string =
    '../../../../assets/images/User-Profile-PNG-Picture-3489530475.png';
  imageContent: Uint8Array = new Uint8Array();
  ngOnInit(): void {
    this.getdataservice.getData()?.subscribe(
      (res) => {
        const { password, ...result } = res;
        this.data.push(result);
      },
      (error) => console.log(error)
    );
    try {
      this.getdataservice.fetchImage()?.subscribe(
        (res) => {
          if (!res) {
            this.imageUrl =
              '../../../../assets/images/User-Profile-PNG-Picture-3489530475.png';
          }
          console.log('-----------image', res);
          this.imageContent = new Uint8Array(res.message.content.data);
          const blob = new Blob([this.imageContent], { type: 'image/png' });
          this.imageUrl = this.createImageObjectURL(blob);
        },
        (error) => console.log(error)
      );
    } catch (error) {
      console.error('error');
    }
  }
  createImageObjectURL(blob: Blob): any {
    return URL.createObjectURL(blob);
  }

  isShow: boolean = false;
  isClick = () => {
    this.isShow = !this.isShow;
  };

  moon: boolean = true;
  sun: boolean = false;

  moontosun = () => {
    this.getdataservice.update();
    this.moon = false;
    this.sun = true;
  };

  suntmoon = () => {
    this.moon = true;
    this.sun = false;
  };
}
