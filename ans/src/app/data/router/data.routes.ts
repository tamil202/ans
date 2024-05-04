export default [
  {
    path: 'Home',
    loadComponent: () =>
      import('../pages/data-show/data-show.component').then(
        (c) => c.DataShowComponent
      ),
  },
  {
    path: 'auth/home',
    loadComponent: () =>
      import('../pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'auth/home/more-details',
    loadComponent: () =>
      import('../pages/more-details/more-details.component').then(
        (c) => c.MoreDetailsComponent
      ),
  },
];
