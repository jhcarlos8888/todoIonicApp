import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';

@Pipe({
  name: 'filtroLista',
  pure: false //propiedad que detecta cambios en los elementos que estan
              //invocando el elemento pipe, debe estar en false para que 
              //automaticamente refresque los cambios y realice el filtrado de datos
})
export class FiltroListaPipe implements PipeTransform {

  

  transform(listas: Lista[], tipo: string){
    
    let lista:Lista[] =[];
    switch (tipo) {
      case 'por hacer':
        lista =listas.filter((itemLista) => itemLista.completada == false && itemLista.item.filter((itemActividad) => itemActividad.completado == true).length == 0);
        
        break;

      case 'realizandose':
        lista = listas.filter((itemLista) => itemLista.completada == false && itemLista.item.filter((itemActividad) => itemActividad.completado == true).length > 0);
        break;

      case 'terminadas':
        lista= listas.filter((itemLista) => itemLista.completada == true );
        break;
      default:
        break;

    }

    return lista;
  }

}
