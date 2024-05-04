import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-show',
  standalone: true,
  imports: [NavbarComponent, FormsModule],
  templateUrl: './data-show.component.html',
})
export class DataShowComponent {
  data: any = ['hello'];
  value: string = '';

  Add = () => {
    this.data.push(this.value);
    this.value = '';
  };
}
