import { Component, Input } from '@angular/core';
import { GetDataService } from '../../service/GetData.service';
import { UpdataDeatilsComponent } from '../../components/updata-deatils/updata-deatils.component';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-more-details',
  standalone: true,
  imports: [UpdataDeatilsComponent],
  templateUrl: './more-details.component.html',
})
export class MoreDetailsComponent {
  constructor(
    private getdataservice: GetDataService,
    private http: HttpClient,
    private toast: ToastrService
  ) {}
  imageUrl: string =
    '../../../../assets/images/User-Profile-PNG-Picture-3489530475.png';
  imageContent: Uint8Array = new Uint8Array();
  data: any = [];
  details: any = [];
  details2: any = [];
  ngOnInit(): void {
    this.getdataservice.getData()?.subscribe(
      (res) => {
        const { password, ...result } = res;
        const { ...data } = res.userDetails;
        this.details.push(data);
        console.log('this.details', this.details);
        this.data.push(result);
      },
      (error) => console.log(error)
    );
    this.getdataservice.getDataUserdet()?.subscribe((res) => {
      this.details2.push(res);
    });
    try {
      this.getdataservice.fetchImage()?.subscribe(
        (res) => {
          if (!res) {
            this.imageUrl =
              '../../../../assets/images/User-Profile-PNG-Picture-3489530475.png';
          }
          this.imageContent = new Uint8Array(res.message.content.data);
          const blob = new Blob([this.imageContent], { type: 'image/png' });
          this.imageUrl = this.createImageObjectURL(blob);
          this.imagelinkurl = this.createImageObjectURL(blob);
        },
        (error) => console.log(error)
      );
    } catch (error) {
      console.error('error');
    }
    this.sun = this.getdataservice.getsun()
  }
  createImageObjectURL(blob: Blob): any {
    return URL.createObjectURL(blob);
  }

  isShow: boolean = false;
  edit = () => {
    this.isShow = !this.isShow;
  };
  sun: boolean | undefined;
  imagelinkurl: string =
    '../../../../assets/images/User-Profile-PNG-Picture-3489530475.png';

  selectfile(event: any) {
    // show files
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.imagelinkurl = event.target.result;
      };
    }

    // upload files
    if (event.target.files && event.target.files.length > 0) {
      const files = event.target.files[0];
      const formData = new FormData();
      formData.append('file', files);
      const id = localStorage.getItem('userid');
      this.http.post(`http://localhost:3000/files/${id}`, formData).subscribe(
        (response) => {
          this.toast.success('updated');
        },
        (error) => {
          this.toast.error('something went wrong');
        }
      );
    }
  }
  onUpload() {}
}
