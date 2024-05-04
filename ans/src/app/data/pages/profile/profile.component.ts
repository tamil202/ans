import { Component, Input } from '@angular/core';
import { GetDataService } from '../../service/GetData.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  constructor(private getdataservice: GetDataService, private router: Router) {}
  imageUrl: string =
    '../../../../assets/images/User-Profile-PNG-Picture-3489530475.png';
  imageContent: Uint8Array = new Uint8Array();
  data: any = [];
  ngOnInit(): void {
    this.getdataservice.getData()?.subscribe(
      (res) => {
        console.log(res);
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
          console.log(this.imageUrl);
          console.log(this.imageContent);
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

  signout = () => {
    localStorage.removeItem('userid');
    localStorage.removeItem('email');
    this.router.navigate(['login']);
  };
  moreDeatis = () => {
    this.router.navigate(['home/auth/home/more-details']);
  };
  
  @Input()
  sun: boolean | undefined;
}
