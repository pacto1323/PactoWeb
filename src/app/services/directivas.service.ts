import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Directiva } from '../models/directivas.models';

@Injectable({
    providedIn: 'root'
})
export class DirectivasService{

    private url:string = 'https://restserver-pacto.herokuapp.com';

    dirToken: string;

    constructor(private _http: HttpClient){}

    leerToken() {
        if (localStorage.getItem('token')) {
            this.dirToken = localStorage.getItem('token')
        }
        return this.dirToken;
    }

    getDirectivas() {
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        console.log(this.dirToken);
        
        return this._http.get(`${this.url}/directiva`,{headers});
    }

    getAso(){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        
        return this._http.get(`${this.url}/asociacion`,{headers});
        
    }

    addDirectivas(directiva1:Directiva){
        console.log(directiva1.cargo_dir);
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        const authData={
            cargo_dir: directiva1.cargo_dir,
            nom_dir: directiva1.nom_dir,
            ape_dir: directiva1.ape_dir,
            periodo_dir: directiva1.periodo_dir,
            id_asociacion:directiva1.id_asociacion,
           
        };
        return this._http.post(`${this.url}/directiva`,authData, {headers});
    }

    updateDirectivas(directiva1:Directiva){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });

        const authData = {
          cargo_dir: directiva1.cargo_dir,
            nom_dir: directiva1.nom_dir,
            ape_dir: directiva1.ape_dir,
            periodo_dir: directiva1.periodo_dir,
        };
        return this._http.put(`${this.url}/directiva/${directiva1._id}`,authData,{headers});
    }

    deleteDirectivas(directiva1:Directiva){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });  
        return this._http.delete(`${this.url}/directiva/${directiva1._id}`,{headers});
     }   
}

