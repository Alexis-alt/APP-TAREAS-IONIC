import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';

@Pipe({
  //Pure nos ayuda a que angular detecte en su ciclo de detección de cambios este pipe que afecta una lista
  name: 'filtrocompletado',
  pure: false
})
export class FiltrocompletadoPipe implements PipeTransform {

  transform(listas : Lista[], completada : boolean = true): Lista[] {

    return listas.filter(lst=>lst.terminada === completada)


    
  }

}
