import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroLista'
})
export class FiltroListaPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
