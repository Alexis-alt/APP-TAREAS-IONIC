import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { ListaComponent } from 'src/app/componentes/lista/lista.component';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    //Modulo que creamos e impoprtamos para poder reutilipzar cpomponente listap en los diferentes pages
    ComponentesModule,
    Tab1PageRoutingModule,
    
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}


//Ionic trabaja en modulos
//Cada carpeta page tiene su modulo independiente del modulo principal 
//Esto facilita la reutilización de componentes por modulo
//Y hace más legible las importaciones en el modulo principal ya que reduce el código en el