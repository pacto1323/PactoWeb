import { Component, OnInit,OnDestroy } from '@angular/core';
import { DirectivasService } from 'src/app/services/directivas.service';
import { DirectivasModel, Directiva} from '../../models/directivas.models';
import { AsociacionesModel, Asociacion} from '../../models/asociaciones.models';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, NgForm} from '@angular/forms';
import Swal from 'sweetalert2';
import { AsociacionesService } from '../../services/asociaciones.service';
import { UsuarioModel, Usuario} from '../../models/usuario.models';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-directivas',
  templateUrl: './directivas.component.html'
})
export class DirectivasComponent implements OnDestroy,OnInit {

  private url:string = 'https://restserver-pacto.herokuapp.com';
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  asociaciones: Asociacion[] = [];
  asociacion: AsociacionesModel = new AsociacionesModel();
  usuarios: Usuario[] = [];
  usuario: UsuarioModel = new UsuarioModel();
  directivas: Directiva[] = [];
  directivasForm: FormGroup;
  directiva1: DirectivasModel = new DirectivasModel();
  directivaUpdate: DirectivasModel = new DirectivasModel();

  constructor(
    private _userService:UsuarioService,
    private _directivasService:DirectivasService,
    private _asociacionService:AsociacionesService,
    private _builder: FormBuilder) { 
    this.directivasForm = this._builder.group({
      cargo_dir: ['',],
      nom_dir: ['',],
      ape_dir: ['',],
      periodo_dir: ['',],
      id_asociacion: ['',],
    });
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      "language": {
        url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
      }
    };

    this._directivasService.getDirectivas().subscribe((res:any) =>{
      this.directivas= res.directiva;
      this.dtTrigger.next();
    });

    this._directivasService.getAso().subscribe((res:any) =>{
      this.asociaciones= res.asociacion;
    });

    this._userService.getUsers().subscribe((resp:any) => {
      this.usuarios = resp.usuarios;
    });
  }

  enviar(values){
    this.directiva1.cargo_dir = values['cargo_dir'];
    this.directiva1.nom_dir = values['nom_dir'];
    this.directiva1.ape_dir = values['ape_dir'];
    this.directiva1.periodo_dir = values['periodo_dir'];
    this.directiva1.id_asociacion=[{
      _id: this.usuarios[0]._id,
      id_asociacion: values['id_asociacion']
    }];
    
    this._directivasService.addDirectivas(this.directiva1).subscribe((resp:any) => {
      this.directivas = resp.directiva1;
      window.location.reload()
      
    }, (err) => {
    });
  }

  enviarAso(values) {
    this.asociacion.nombre_aso = values['nombre_aso'];
    this._asociacionService.addAsociaciones(this.asociacion).subscribe((resp:any) => {
      this.asociaciones = resp.asociacion1;
      console.log(resp.asociaciones);
      window.location.reload()
      
    }, (err) => {
      console.log(err);
    });
  }

  openModalActualizar(id:string) {
    this.directivaUpdate = this.buscadorDirectivaActual(id);
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

    this._directivasService.updateDirectivas(this.directivaUpdate).subscribe(resp => {
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

  buscadorDirectivaActual(id:string){
    let directivaActual: Directiva;
    
    for (let i = 0; i < this.directivas.length; i++) {
      if(this.directivas[i]._id == id){
        directivaActual = this.directivas[i];
        break;
      }
    }

    return directivaActual;
  }

  delete() {
    Swal.fire({
      title: 'Espere',
      text: 'Borrando Información',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false
    });

    Swal.showLoading();

    this._directivasService.deleteDirectivas(this.directivaUpdate).subscribe(resp => {
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

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  
}



