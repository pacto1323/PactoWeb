import { Component, OnInit, OnDestroy } from '@angular/core';
import {CapacitacionModel, Capacitacion} from '../../models/capacitacion.models'
import { CapacitacionService } from '../../services/capacitacion.service'
import { FormBuilder, FormGroup,  NgForm, Validators  } from '@angular/forms';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';


import { EntidadService } from '../../services/entidad.service';
import { Entidad } from '../../models/entidad.models';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-capacitacion',
  templateUrl: './capacitacion.component.html'
})

export class CapacitacionComponent implements OnDestroy, OnInit{
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  capacitaciones: Capacitacion[] = [];
  capacitacionesForm: FormGroup;
  capacitacion: CapacitacionModel = new CapacitacionModel();
  capacitacionAsistenciaUpdate: CapacitacionModel = new CapacitacionModel();

  entidades: Entidad[]=[];

  idCapAsis: string;
  

  constructor(
    private _capacitacionService: CapacitacionService,
    private _entidadService: EntidadService,
    private _builder: FormBuilder
    ){
    this.capacitacionesForm = this._builder.group({
    
    tem_cap: ['',],
    fech_ini_cap: ['',],
    fech_fin_cap: ['',],
    hora_ini_cap: ['',],
    hora_fin_cap: ['',],
    id_enti: ['',],
      });
}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json"
      }
    };
    this._capacitacionService.getCapacitaciones().subscribe((resp:any) => {
      this.capacitaciones = resp.capacitacion;
      console.log(resp.capacitacion);
      this.dtTrigger.next();
    });  

    this._entidadService.getEntidades().subscribe((resp:any) => {
      this.entidades = resp.entidad;     
    });     
  }

  enviar(values){    
    this.capacitacion.tem_cap = values['tem_cap'];
    this.capacitacion.fech_ini_cap = values['fech_ini_cap'];
    this.capacitacion.fech_fin_cap = values['fech_fin_cap'];
    this.capacitacion.hora_ini_cap = values['hora_ini_cap'];
    this.capacitacion.hora_fin_cap = values['hora_fin_cap'];
    this.capacitacion.prof_cap=[{
      _id: this.capacitaciones[0]._id, 
      id_enti: values['id_enti']     
    }
  ];
    console.log( JSON.stringify(this.capacitacion, null, 4));
    this._capacitacionService.addCapacitaciones(this.capacitacion).subscribe((resp:any) => {
      this.capacitaciones = resp.capacitaciones;
      window.location.reload()      
    }, (err) => {
    });    
  }


  openModalActualizar(id:string) {
    this.capacitacionAsistenciaUpdate = this.buscadorCapacitacionActual(id);
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
    
    /*this.idCapAsis = this.capacitacionAsistenciaUpdate.asis_cap;
    this.capacitacionAsistenciaUpdate.asis_cap = [{
      _id: this.capacitacionAsistenciaUpdate._id, 
      asis_cap: this.idCapAsis
    }];
    console.log( JSON.stringify(this.capacitacionAsistenciaUpdate, null, 4));
    
    /*this._capacitacionService.updateCapacitacionAsistencia(this.capacitacionAsistenciaUpdate).subscribe(resp => {
      Swal.close();
      window.location.reload();
    },(err) => {
      Swal.fire({
        title: 'Error',
        text: err.error.err.message,
        icon: 'error',
      });
    });*/
  
  }
 
  buscadorCapacitacionActual(id:string){
    let capacitacionActual: Capacitacion;
    
    for (let i = 0; i < this.capacitaciones.length; i++) {
      if(this.capacitaciones[i]._id == id){
        capacitacionActual = this.capacitaciones[i];
        break;
      }
    }
    return capacitacionActual;
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

  this._capacitacionService.deleteCapacitacion(this.capacitacionAsistenciaUpdate).subscribe(resp => {
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
    this.dtTrigger.unsubscribe();
  }

}