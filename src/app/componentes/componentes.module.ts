import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaComponent } from './lista/lista.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [ListaComponent],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule

  ],

  //Respresenta todos los componentes que requiere el modulo para poder trabajar de forma externa en otro page
 exports:[
ListaComponent

  ]
})
export class ComponentesModule { }



