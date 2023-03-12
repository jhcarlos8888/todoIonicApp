import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';
import { ListaService } from 'src/app/services/lista.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  constructor(public listaService: ListaService,
    public alertController: AlertController,
    public toastController: ToastController,) { }

  ngOnInit() {}

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
   * @function eliminarLista
   * @description Funcion para eliminar lista
   * @param { Lista } listaItem lista a eliminar
   */
  eliminarLista(listaItem: Lista) {
    this.listaService.borrarLista(listaItem)
    console.log("eliminar", listaItem)
  }


}
