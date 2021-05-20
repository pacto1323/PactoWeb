import { Component, OnInit,Input, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Maquinarian, MaquinarianModel } from '../../models/maquinarian.models';
import { MaquinarianService } from '../../services/maquinarian.service';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-maquinarian',
  templateUrl: './maquinarian.component.html'
})
export class MaquinarianComponent implements OnInit, OnDestroy {
  @Input() maquinarian: any =null;
  private url:string = 'https://restserver-pacto.herokuapp.com';

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  maquinarias: Maquinarian[] = [];
  maquinariasForm: FormGroup;
  maquinaria1: MaquinarianModel = new MaquinarianModel();
  maquinarianUpdate: MaquinarianModel = new MaquinarianModel();
  //usuarioUpdate: UsuarioModel = new UsuarioModel();

  constructor(
    private _maquinarianService: MaquinarianService,
    private _builder: FormBuilder

  ) { this.maquinariasForm = this._builder.group({
    //id_mant:[''],
    id_soc: ['',],
    nom_maq: ['',],
    tipo_maq: ['',],
    est_maq: ['',],
    marca_maq: ['',],
    km_maq: ['',],
    placa_maq: ['',],
    origen_maq: ['',]
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

    this._maquinarianService.getMaquinarian().subscribe((resp:any) => {
      this.maquinarias = resp.maquinariasocio;
      console.log(resp,'hola desde api');
      this.dtTrigger.next();
    });

  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();

}
enviar(values){
  this.maquinaria1.nom_maq= values['nom_maq'];
  this.maquinaria1.tipo_maq = values['tipo_maq'];
  this.maquinaria1.est_maq = values['est_maq'];
  this.maquinaria1.marca_maq = values['marca_maq'];
  this.maquinaria1.km_maq = values['km_maq'];
  this.maquinaria1.placa_maq = values['placa_maq'];
  this.maquinaria1.origen_maq = values['origen_maq'];
  this._maquinarianService.addMaquinaria(this.maquinaria1).subscribe((resp:any) => {
  this.maquinarias = resp.maquinarias;
    window.location.reload()
    
  }, (err) => {
    console.log(err);
  });
}

openModalActualizar(id:string) {
  this.maquinarianUpdate = this.buscadorMaquinarianActual(id);
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

  this._maquinarianService.updateMaquinarian(this.maquinarianUpdate).subscribe(resp => {
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

buscadorMaquinarianActual(id:string){
  let maquinarianActual: Maquinarian;
  
  for (let i = 0; i < this.maquinarias.length; i++) {
    if(this.maquinarias[i]._id == id){
      maquinarianActual = this.maquinarias[i];
      break;
    }
  }

  return maquinarianActual;
}
}
