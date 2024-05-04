import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GetDataService } from '../../service/GetData.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-task.component.html',
})
export class AddTaskComponent {
  constructor(private getdataservice: GetDataService, private toast:ToastrService) {}
  task: string = '';
  taskdes: string = '';

  submit = () => {
    let data = {
      task: this.task,
      descrption: this.taskdes,
    };
    try {
      this.getdataservice.addtask(data)?.subscribe(
        (res) => { this.task = '';
          this.taskdes = '';
       this.toast.success('Added')
        }
        ,
        (error) => console.error(error)
      );
    } catch (error) {
      console.error(error);
    }
   
  };
}
