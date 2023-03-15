import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Actividad } from '../models/actividades.model';
import { Lista } from '../models/lista.model';
import { ListaService } from '../services/lista.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {


lista: Lista;

nombreItem: string = ""

  constructor(
    private router: ActivatedRoute,
    public listaService: ListaService,
    public alertController: AlertController,
    public toastController: ToastController,
    
    
  ) { 
    //Variable que obtendra de la URL el numero idLista que fue
    //declarada en el archivo app-routing.module.ts
      let idLista = this.router.snapshot.paramMap.get('idLista');
      let listaResult:any = this.listaService.obtenerLista(String(idLista) || Number(idLista));
      this.lista = listaResult;    
      
  }

  ngOnInit() {
  }

  agregar(){
    if(this.nombreItem.length === 0){
      return 
    }
    const actividad = new Actividad(this.nombreItem);
    this.lista.item.push(actividad);
    this.listaService.guardarStorage();
    this.nombreItem = '';
    console.log(this.nombreItem)
    
  }


    /**
  * @function editarActividad
  * @description Funcion que se ejecuta cuando se presiona la opcion editar
  */
    async editarActividad(actividad:Actividad) {
      let alerta = await this.alertController.create({
        cssClass: 'custom-alert',
        header: "Editar actividad",
        inputs: [
          {
            cssClass: 'alert-input',
            type: "textarea",
            name: "titulo",
            placeholder: "Ingrese el nuevo nombre de la actividad",
            value: actividad.descripcion,
            attributes: {
              maxlength: 100,
            },
          }
        ],
        buttons: [
          {
            cssClass: 'boton-cancel',
            text: "Cancelar",
            role: "cancel"
          },
          {
            cssClass: 'alert-button-confirm',
            text: "Editar",
            handler: (data: any) => {
              let isvalid: boolean = this.validInput(data);
              if (isvalid) {
                let titulo = data.titulo
                actividad.descripcion = titulo
                this.listaService.editActividad(actividad);
                this.presentToast("Actividad editada correctamente!");
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





  eliminarActividad(actividad:Actividad){
   this.lista.item = this.lista.item.filter(item => item !== actividad)
   this.listaService.guardarStorage();
    console.log("Boton eliminar" + actividad);
  }


  cambiaCheck(){
    const pendientes = this.lista.item.filter(item => item.completado == false).length;
    if(pendientes == 0){
      this.lista.completada = true;
      let fechaTerminacion:Date = new Date();
      this.lista.terminadaEn = String(fechaTerminacion);
    }else{
      this.lista.completada = false;
      this.lista.terminadaEn = "";
    }
    this.listaService.guardarStorage();
  }

}
