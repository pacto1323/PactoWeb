import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {
  navegacionProductos: string;

  constructor(
    private _auth: LoginService, 
    private _router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('roleUsuarioLogueado')) {
      let role = localStorage.getItem('roleUsuarioLogueado');
      if (role == "SUPER_ROLE")
        this.navegacionProductos = "/productos";
      else
        this.navegacionProductos = "/prodsocio";
    }
  }

  salir() {
    this._auth.logout();
    this._router.navigateByUrl('/login');
  }
}
