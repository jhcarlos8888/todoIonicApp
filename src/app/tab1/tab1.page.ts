import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    public alertController: AlertController,
    public toastController: ToastController
  ) {}

  async AgregarLista(){
    let alerta = await this.alertController.create({
      header: "Agregar lista",
      inputs:[
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
          handler: (data:any) => {
            this.validInput(data);
            console.log(data);
          }
        }
      ]
    })
    
    await alerta.present()
  }

  validInput(input: any):boolean{

    if(input && input.titulo){
      return true;
      
    }else{
      this.presentToast("Por favor ingrese algun valor")
      return false;
    }
  }

  async presentToast(mensaje:string){
    let toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    })
    
    toast.present()
  }

}
