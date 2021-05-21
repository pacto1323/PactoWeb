import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hojacampo } from '../models/hojacampo.models';
import { Usuario } from '../models/usuario.models';

@Injectable({
    providedIn: 'root'
})
export class HojacampoService {

    private url: string = 'https://restserver-pacto.herokuapp.com';

    hojaToken: string;

    constructor(private _http: HttpClient) { }

    leerToken() {
        if (localStorage.getItem('token')) {
            this.hojaToken = localStorage.getItem('token')
        }
        return this.hojaToken;
    }

    getHojacampo() {
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        
        return this._http.get(`${this.url}/det_hojadecampo`,{headers});
    }

    addHojacampo(hojacampo:Hojacampo){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        const authData = {
            dias_det: hojacampo.dias_det,
            des_det: hojacampo.des_det,
            prepa_suelo: hojacampo.prepa_suelo,
            prepa_semi: hojacampo.prepa_semi,
            siembra: hojacampo.siembra,
            resiembra: hojacampo.resiembra,
            deshierbe: hojacampo.deshierbe,
            aporque: hojacampo.aporque,
            lim_deshoje: hojacampo.lim_deshoje,
            elabo_abosoli: hojacampo.elabo_abosoli,
            aplica_abono: hojacampo.aplica_abono,
            contro_plaga: hojacampo.contro_plaga,
            contro_enfer: hojacampo.contro_enfer,
            mant_finca: hojacampo.mant_finca,
            cosecha: hojacampo.cosecha,
            acarreo_transp: hojacampo.acarreo_transp,
            descarga: hojacampo.descarga,
            calibra_mante: hojacampo.calibra_mante,
            molienda: hojacampo.molienda,
            filtrado: hojacampo.filtrado,
            melada: hojacampo.melada,
            clarificada: hojacampo.clarificada,
            punteo: hojacampo.punteo,
            batido: hojacampo.batido,
            tamizado: hojacampo.tamizado,
            empacado: hojacampo.empacado,
            codificado: hojacampo.codificado,
            lim_modulo: hojacampo.lim_modulo,
            desinf_modulo: hojacampo.desinf_modulo,
            regis_venta: hojacampo.regis_venta,
            llenado_conta: hojacampo.llenado_conta,
            capacitacion: hojacampo.capacitacion,
            comercializacion: hojacampo.comercializacion,
            subjornal: hojacampo.subjornal,
            costojornal: hojacampo.costojornal,
            costomanoobra: hojacampo.costomanoobra,
            manoobrafam: hojacampo.manoobrafam,
            totmanoobra: hojacampo.totmanoobra,
            combustible: hojacampo.combustible,
            transporte: hojacampo.transporte,
            mantenimiento: hojacampo.mantenimiento,
            cana: hojacampo.cana,
            totallaborescult: hojacampo.totallaborescult,
            trapicheyhorno: hojacampo.trapicheyhorno,
            tinasyutencillos: hojacampo.tinasyutencillos,
            infraestructura: hojacampo.infraestructura,
            totalequiposymaquinaria: hojacampo.totalequiposymaquinaria,
        };
        return this._http.post(`${this.url}/det_hojadecampo`,authData, {headers});
    }

    deleteHojacampo(usuario:Usuario){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });  
        return this._http.delete(`${this.url}/det_hojadecampo/${usuario._id}`,{headers});
    }
}