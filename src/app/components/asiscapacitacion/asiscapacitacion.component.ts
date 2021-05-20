import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

import { Usuario, UsuarioModel } from '../../models/usuario.models';
import { UsuarioService } from '../../services/usuario.service';

import { CapacitacionModel, Capacitacion } from '../../models/capacitacion.models'
import { CapacitacionService } from '../../services/capacitacion.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-asiscapacitacion',
  templateUrl: './asiscapacitacion.component.html'
})
export class AsiscapacitacionComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  id: [];
  socios:any;
  

  usuarios: Usuario[] = [];

  capacitaciones: Capacitacion[] = [];
  capacitacionesForm: FormGroup;
  capacitacion: CapacitacionModel = new CapacitacionModel();
  idsoc: CapacitacionModel = new CapacitacionModel();

  //idCapAsis: string;
  
  constructor(
    private http: HttpClient,
    private _capacitacionService: CapacitacionService,
    private _userService: UsuarioService,
    private _builder: FormBuilder,
    private route:ActivatedRoute,
    
    ){
      /*this.capacitacionesForm = this._builder.group({    
        nombre: ['',],
        apeliido: ['',],
          });    */
    }

  ngOnInit(): void {
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json"
      }
    };
  
    this.id = this.route.snapshot.params['id'];
    this._capacitacionService.getOne(this.id).subscribe(resp => {
      this.socios = resp;
       console.log(this.socios);
  })
  


    
    this._userService.getSocios().subscribe((resp:any) => {
      //this.usuarios = resp.usuarios;
                    
      let socio: any;
      for (let i=0; i<this.usuarios.length; i++){
        if(this.usuarios[i].role == "SOCIO_ROLE")
        {  
                  
          //socio = this.usuarios;
          this.usuarios = resp.usuarios;
          console.log(this.usuarios); 
          //  
          //console.log(this.usuarios);                 
        }        
        return socio;
    }
    //resp.usuarios=socio;
    this.dtTrigger.next();         
    });   
  
    
  }

  
    

  /*openModalActualizar(id:any) {
    this.idsoc = this.IdCapBuscador(id);
  }*/

  /*onEdit( form:NgForm ) {
    if (form.invalid) {return;}

    Swal.fire({
      title: 'Espere',
      text: 'Guardando Información',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false
    });

    Swal.showLoading();
    
  
    
    /*this._capacitacionService.updateCapacitacionAsistencia(this.capacitacionAsistenciaUpdate).subscribe(resp => {
      Swal.close();
      window.location.reload();
    },(err) => {
      Swal.fire({
        title: 'Error',
        text: err.error.err.message,
        icon: 'error',
      });
    });
  
  }*/

 /* IdCapBuscador(id:string){
    let capacitacionActual: Capacitacion;
    
    for (let i = 0; i < this.capacitaciones.length; i++) {
      if(this.capacitaciones[i]._id == id){
        capacitacionActual = this.capacitaciones[i];
        break;
      }
    }
    return capacitacionActual;
} */
  


  /*openModalActualizar(id:string) {
    this.capacitacionUpdate = this.buscadorCapacitacionActual(id);
  }*/
  
 /*buscadorsocios(id:string){
    let socio: Capacitacion;
    
    for (let i = 0; i < this.capacitaciones.length; i++) {
      if(this.capacitaciones[i].asis_cap[0].role == "SOCIO_ROLE"){
        socio = this.capacitaciones[i];
        break;
      }
    }

    return socio;
    console.log
}*/

    /*delete() {
      Swal.fire({
        title: 'Espere',
        text: 'Borrando Información',
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false
      });
      Swal.showLoading();
      this._asiscapacitacionService.deleteCapacitacion(this.asiscapacitacionUpdate).subscribe(resp => {
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
*/
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}