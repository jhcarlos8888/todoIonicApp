import { Injectable } from '@angular/core';
import { Actividad } from '../models/actividades.model';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  public listas: Lista[] = []; //Variable para almacenas las listas creadas
  public actividades: Actividad[] = []

  constructor() {
    this.cargarStorage();
  }

  /**
   * @function crearLista
   * @description Funcion que garda en la variable arreglo (listas) los objetos de una lista de 
   * tareas recibidos por parametro
   * @param { string } nombreLista
   * @returns { Object} ObjetoLista -Retorna un objeto que se agregara a un array
   */
  crearLista(nombreLista: string) {

    let ObjetoLista = new Lista(nombreLista);
    this.listas.push(ObjetoLista);
    this.guardarStorage();
    return ObjetoLista.id;
  }

  /**
   * @function guardarStorage
   * @description Funcion que guardara en el disco duro local un archivo
   * de texto plano que contiene las listas guardadas
   */
  guardarStorage() {
    let stringListas: string = JSON.stringify(this.listas)
    localStorage.setItem("listas", stringListas)
  }

  /**
   * @function cargarStorage
   * @description Funcion que permite traer desde el local stogare 
   * todas las listas que fueron creadas anteriormente
   * para que persista la informacion
   */

  cargarStorage() {
    const listaStorage = localStorage.getItem("listas")
    if (listaStorage == null) {
      this.listas = [];
    } else {
      let ObjListas = JSON.parse(listaStorage);
      this.listas = ObjListas;
    }
  }


  /**
   * @function borrarLista
   * @description Funcion que permite borrar una lista
   * @param {Lista} lista
   */
  borrarLista(lista: Lista) {
    let newLista = this.listas.filter((listaItem) => listaItem.id !== lista.id);
    this.listas = newLista;
    this.guardarStorage();
  }

  /**
   * @function editarLista
   * @description Funcion que permite editar el nombre de una lista
   */
  editLista(lista: Lista) {
    let matchLista = this.listas.find((listaItem) => listaItem.id == lista.id);
    let stringListas: string = JSON.stringify(matchLista)
    localStorage.setItem("listas", stringListas)
    this.guardarStorage();

  }

  /**
  * @function obtenerLista
  * @description Funcion que permite retornar una lista por medio
  * de su ID
  */
  obtenerLista(idLista: string | number) {
    const id = Number(idLista);
    let lista = this.listas.find((itemLista) => itemLista.id == id);
    return lista;
  }


  /**
   * @function editActividad
   * @description Funcion que permite editar una actividad
   */
  editActividad(actividad: Actividad) {
    let matchActividad = this.actividades.find((actividadDesc) => actividadDesc.descripcion == actividad.descripcion);
    let stringActividad: string = JSON.stringify(matchActividad)
    localStorage.setItem("actividades", stringActividad)
    this.guardarStorage();
  }

}
