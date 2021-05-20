export class DirectivasModel{
    _id:string;
    cargo_dir:string;
    nom_dir:string;
    ape_dir:string;
    periodo_dir:string;
    id_asociacion:[{
        _id: string;
        id_asociacion: string;
    }];
   
}

export interface Directiva{
    _id:string;
    cargo_dir:string;
    nom_dir:string;
    ape_dir:string;
    periodo_dir:string;
    id_asociacion:[{
        _id: string;
        id_asociacion: string;
    }];
}

