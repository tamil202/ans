export default [
  {
    path: 'register',
    loadComponent: () =>
      import('../pages/register/register.component').then(
        (c) => c.RegisterComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../pages/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'forgetpassword',
    loadComponent: () =>
      import('../pages/forgetpassword/forgetpassword.component').then(
        (c) => c.ForgetpasswordComponent
      ),
  },
  {
    path: 'changepassword',
    loadComponent: () =>
      import('../pages/changepassword/changepassword.component').then(
        (c) => c.ChangepasswordComponent
      ),
  },
];
