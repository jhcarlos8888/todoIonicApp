import { Actividad } from "./actividades.model";


export class Lista {
    
    id: number;
    titulo: string;
    creadaEn: Date;
    terminadaEn: string;
    completada: boolean;
    item: Actividad[];

    constructor(titulo:string){
        this.titulo = titulo;
        this.creadaEn = new Date();
        this.completada = false;
        this.item = [];
        this.id = new Date().getTime();
        this.terminadaEn = "";
    }

}