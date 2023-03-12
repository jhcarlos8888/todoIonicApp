import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Lista } from '../models/lista.model';
import { ListaService } from '../services/lista.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public listaService: ListaService
  ) { }

  /**
   * @function AgregarLista
   * @description Funcion que se ejecuta cuando se presiona boton agregar
   * Mostrando una alerta cuando el campo de nombre de lista no contiene
   * ningun valor
   */
  async AgregarLista() {
    console.log("Clic en el boton Agregar lista")
    let alerta = await this.alertController.create({
      header: "Agregar lista",
      inputs: [
        {
          type: "text",
          name: "titulo",
          placeholder: "Ingrese el nombre de la lista"
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel"
        },
        {
          text: "Crear",
          handler: (data: any) => {
            let isvalid: boolean = this.validInput(data);
            if (isvalid) {
              let titulo = data.titulo
              let wasCreated = this.listaService.crearLista(titulo)
              if (wasCreated != null) {
                this.presentToast("Lista de tareas creada!");
              }
            }
          }
        }
      ]
    })

    await alerta.present()
  }

  /**
   * @function validInput
   * @description Funcion que se encarga de validar lo que el usuario ingresa
   * en el campo de texto del boton agregar lista
   * @param { any } input valor ingresaro por el usuario
   * @return {boolean}
   */
  validInput(input: any): boolean {

    if (input && input.titulo) {
      return true;

    } else {
      this.presentToast("Por favor ingrese algun valor")
      return false;
    }
  }

  /**
   * @function presentToast
   * @description Funcion mostrara una alerta cuando se quiera guardar
   * un valor vacio en el campo de nombre de lista
   * @param { string } mensaje Mensaje que se mostrara en el toast
   * @return {message}
   */
  async presentToast(mensaje: string) {
    let toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    })
    toast.present()
  }



  /**
   * @function eliminarLista
   * @description Funcion para eliminar lista
   * @param { Lista } listaItem lista a eliminar
   */
  eliminarLista(listaItem: Lista) {
    this.listaService.borrarLista(listaItem)
    console.log("eliminar", listaItem)
  }


  /**
  * @function editarLista
  * @description Funcion que se ejecuta cuando se presiona la opcion editar
  */
  async editarLista(lista: Lista) {
    let alerta = await this.alertController.create({
      header: "Edicion de lista",
      inputs: [
        {
          type: "text",
          name: "titulo",
          placeholder: "Ingrese el nuevo nombre de lista",
          value: lista.titulo
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel"
        },
        {
          text: "Editar",
          handler: (data: any) => {
            let isvalid: boolean = this.validInput(data);
            if (isvalid) {
              let titulo = data.titulo
              lista.titulo = titulo
              this.listaService.editLista(lista)
              this.presentToast("Lista editada correctamente!");
            }
          }
        }
      ]
    })

    await alerta.present()
  }

}
