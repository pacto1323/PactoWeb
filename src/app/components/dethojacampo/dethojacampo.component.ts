import { Component, OnInit } from '@angular/core';
import { Hojacampo, HojacampoModel } from '../../models/hojacampo.models';
import { HojacampoService } from '../../services/hojacampo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dethojacampo',
  templateUrl: './dethojacampo.component.html',
  styles: [
  ]
})
export class DethojacampoComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  hojascampo: Hojacampo[] = [];
  dethojcamForm: FormGroup;
  hojacampo: HojacampoModel = new HojacampoModel();
  hojacampoUpdate: HojacampoModel = new HojacampoModel();
  usuarioUpdate: UsuarioModel = new UsuarioModel();

  constructor(
    private _hojacampoService: HojacampoService,
    private _builder: FormBuilder,
    ) {
      this.dethojcamForm = this._builder.group({
        dias_det: ['', Validators.required],
        des_det: ['', Validators.required],
        prepa_suelo: ['', Validators.required],
        prepa_semi: ['', Validators.required],
        siembra: ['', Validators.required],
        resiembra: ['', Validators.required],
        deshierbe: ['', Validators.required],
        aporque: ['', Validators.required],
        lim_deshoje: ['', Validators.required],
        elabo_abosoli: ['', Validators.required],
        aplica_abono: ['', Validators.required],
        contro_plaga:['', Validators.required],
        contro_enfer: ['', Validators.required],
        mant_finca: ['', Validators.required],
        cosecha: ['', Validators.required],
        acarreo_transp: ['', Validators.required],
        descarga: ['', Validators.required],
        calibra_mante: ['', Validators.required],
        molienda: ['', Validators.required],
        filtrado: ['', Validators.required],
        melada: ['', Validators.required],
        clarificada: ['', Validators.required],
        punteo:['', Validators.required],
        batido: ['', Validators.required],
        tamizado: ['', Validators.required],
        empacado: ['', Validators.required],
        codificado: ['', Validators.required],
        lim_modulo: ['', Validators.required],
        desinf_modulo: ['', Validators.required],
        regis_venta: ['', Validators.required],
        llenado_conta: ['', Validators.required],
        capacitacion: ['', Validators.required],
        comercializacion: ['', Validators.required],
        subjornal:['', Validators.required],
        costojornal: ['', Validators.required],
        costomanoobra: ['', Validators.required],
        manoobrafam: ['', Validators.required],
        totmanoobra: ['', Validators.required],
        combustible: ['', Validators.required],
        transporte: ['', Validators.required],
        mantenimiento: ['', Validators.required],
        cana: ['', Validators.required],
        totallaborescult: ['', Validators.required],
        trapicheyhorno: ['', Validators.required],
        tinasyutencillos:['', Validators.required],
        infraestructura: ['', Validators.required],
        totalequiposymaquinaria: ['', Validators.required]
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
    this._hojacampoService.getHojacampo().subscribe((resp:any) => {
      this.hojascampo = resp.usuarios;
      this.dtTrigger.next();
    });
  }

  enviar(values){
    this.hojacampo.dias_det = values['dias_det'];
    this.hojacampo.des_det = values['des_det'];
    this.hojacampo.prepa_suelo = values['prepa_suelo'];
    this.hojacampo.prepa_semi = values['prepa_semi'];
    this.hojacampo.siembra = values['siembra'];
    this.hojacampo.resiembra = values['resiembra'];
    this.hojacampo.deshierbe = values['deshierbe'];
    this.hojacampo.aporque = values['aporque'];
    this.hojacampo.lim_deshoje = values['lim_deshoje'];
    this.hojacampo.elabo_abosoli = values['elabo_abosoli'];
    this.hojacampo.aplica_abono = values['aplica_abono'];
    this.hojacampo.contro_plaga = values['contro_plaga'];
    this.hojacampo.contro_enfer = values['contro_enfer'];
    this.hojacampo.mant_finca = values['mant_finca'];
    this.hojacampo.cosecha = values['cosecha'];
    this.hojacampo.acarreo_transp = values['acarreo_transp'];
    this.hojacampo.descarga = values['descarga'];
    this.hojacampo.calibra_mante = values['calibra_mante'];
    this.hojacampo.molienda = values['molienda'];
    this.hojacampo.filtrado = values['filtrado'];
    this.hojacampo.melada = values['melada'];
    this.hojacampo.clarificada = values['clarificada'];
    this.hojacampo.punteo = values['punteo'];
    this.hojacampo.batido = values['batido'];
    this.hojacampo.tamizado = values['tamizado'];
    this.hojacampo.empacado = values['empacado'];
    this.hojacampo.codificado = values['codificado'];
    this.hojacampo.lim_modulo = values['lim_modulo'];
    this.hojacampo.desinf_modulo = values['desinf_modulo'];
    this.hojacampo.regis_venta = values['regis_venta'];
    this.hojacampo.llenado_conta = values['llenado_conta'];
    this.hojacampo.capacitacion = values['capacitacion'];
    this.hojacampo.comercializacion = values['comercializacion'];
    this.hojacampo.subjornal = values['subjornal'];
    this.hojacampo.costojornal = values['costojornal'];
    this.hojacampo.costomanoobra = values['costomanoobra'];
    this.hojacampo.manoobrafam = values['manoobrafam'];
    this.hojacampo.totmanoobra = values['totmanoobra'];
    this.hojacampo.combustible = values['combustible'];
    this.hojacampo.transporte = values['transporte'];
    this.hojacampo.mantenimiento = values['mantenimiento'];
    this.hojacampo.cana = values['cana'];
    this.hojacampo.totallaborescult = values['totallaborescult'];
    this.hojacampo.trapicheyhorno = values['trapicheyhorno'];
    this.hojacampo.tinasyutencillos = values['tinasyutencillos'];
    this.hojacampo.infraestructura = values['infraestructura'];
    this.hojacampo.totalequiposymaquinaria = values['totalequiposymaquinaria'];
    this._hojacampoService.addHojacampo(this.hojacampo).subscribe((resp:any) => {
      this.hojascampo = resp.hojascampo;
      console.log(resp.hojascampo);
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
    
  }

  delete() {
    this._hojacampoService.deleteHojacampo(this.usuarioUpdate).subscribe(resp => {
      window.location.reload();
    },(err) => {
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
