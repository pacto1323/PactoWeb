import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Capacitacion } from '../models/capacitacion.models';

@Injectable({
    providedIn: 'root'
})
export class AsiscapacitacionService {

    private url: string = 'https://restserver-pacto.herokuapp.com';

    userToken: string;

    constructor(private _http: HttpClient) { }

    leerToken() {
        if (localStorage.getItem('token')) {
            this.userToken = localStorage.getItem('token')
        }
        return this.userToken;
    }

    
    updateCapacitacionAsistencia(capacitacion:Capacitacion){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });

        const authData = {
            tem_cap: capacitacion.tem_cap,
            fech_ini_cap:capacitacion.fech_ini_cap,
            fech_fin_cap:capacitacion.fech_fin_cap,
            hora_ini_cap:capacitacion.hora_ini_cap,
            hora_fin_cap:capacitacion.hora_fin_cap,            
            asis_cap:capacitacion.asis_cap,
            id_enti:capacitacion.prof_cap            
        };
        
        return this._http.put(`${this.url}/capacitacion/${capacitacion._id}`,authData,{headers});
    }

}