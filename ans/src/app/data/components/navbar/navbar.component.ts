import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  constructor(private router: Router) {}

  navigatereg = () => {
    this.router.navigate(['register'])
  };
  navigatelog = () => {
    this.router.navigate(['login']);
  };
}
