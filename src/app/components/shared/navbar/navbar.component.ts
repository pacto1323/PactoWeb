import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { Usuario, UsuarioModel } from '../../../models/usuario.models';
import { Asociacion} from '../../../models/asociaciones.models';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {
  navegacionProductos: string;
  usuarioUpdate: UsuarioModel = new UsuarioModel();
  usuarios: Usuario[] = [];
  asociaciones: Asociacion[] = [];
  idAsoc: string;

  constructor(
    private _userService: UsuarioService, 
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

    this._userService.getUsers().subscribe((resp:any) => {
      this.usuarios = resp.usuarios;
    });

    this._userService.getAso().subscribe((res:any) =>{
      this.asociaciones= res.asociacion;
    });
  }

  onEdit( form:NgForm ) {
    if (form.invalid) {return;}

    Swal.fire({
      title: 'Espere',
      text: 'Guardando Información',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false
    });

    Swal.showLoading();
    
    this.idAsoc = this.usuarioUpdate.id_asociacion;
    this.usuarioUpdate.id_asociacion = [{
      _id: this.usuarioUpdate._id, 
      id_asociacion: this.idAsoc
    }];
   
    
    this._userService.updateUser(this.usuarioUpdate).subscribe(resp => {
      Swal.close();
      window.location.reload();
    },(err) => {
      Swal.fire({
        title: 'Error',
        text: err.error.err.message,
        icon: 'error',
      });
    });
  
  }

  salir() {
    this._auth.logout();
    this._router.navigateByUrl('/login');
  }
}
