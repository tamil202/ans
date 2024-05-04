import { Component, Input } from '@angular/core';
import { AddTaskComponent } from '../add-task/add-task.component';
import { GetDataService } from '../../service/GetData.service';

@Component({
  selector: 'app-table-show',
  standalone: true,
  imports: [AddTaskComponent],
  templateUrl: './table-show.component.html',
})
export class TableShowComponent {
  constructor(private getdataserrvice: GetDataService) {}

  data: any = [];
  ngOnInit(): void {
    try {
      this.getdataserrvice.gettask()?.subscribe(
        (res) => {
          console.log('---table', res);
          this.data = res;
        },
        (error) => console.error(error)
      );
    } catch (error) {
      console.error(error);
    }
  }

  delete = (id: number) => {
    const boo = confirm('Are You Delete Confirm');
    if (boo) {
      this.getdataserrvice.delete(id)?.subscribe(
        (res) => console.log('deleted'),
        (error) => console.error(error)
      );
    }
  };
  @Input()
  sun: boolean | undefined;
}
