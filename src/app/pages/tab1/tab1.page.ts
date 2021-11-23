import { Component } from '@angular/core';
import { DeseosService } from 'src/app/Services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { AgregarPage } from '../agregar/agregar.page';
import { AgregarPageRoutingModule } from '../agregar/agregar-routing.module';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


listas: Lista[]=[];


  constructor(private _deseosService:DeseosService,
              private _route : Router,
              private _alertController : AlertController ) {


  this.listas =  _deseosService.listas;


  }


  async agregarLst(){



  const alert = await this._alertController.create({
    cssClass: 'my-custom-class',
    header: 'Nueva Lista',
    inputs:[
    {
      name:'titulo',
      type:'text',
      placeholder:'Nombre de la Lista'    }
    ],
    buttons: [
      {
        text:'Cancelar',
        role:'cancel',
        handler: ()=>{
          console.log('Cancelado');
        }
      },
      {

        text:'Crear',
        handler: async (dataform)=>{
          console.log(dataform);

          if(!dataform.titulo.length){

            const alert = await this._alertController.create({
              cssClass: 'my-custom-class',
              header: 'Alerta',
             
              message: 'Su lista no tiene ningun nombre.',
              buttons: ['OK']
            });
        
            await alert.present();


          }
          else{

          const listaId =  this._deseosService.crearLst(dataform.titulo);

          this._route.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);

          }

        }

      }
              ]
  });

  await alert.present();





  
  }

  
  listaSelecionada(lst:Lista){

    console.log(lst)

    const listaId = lst.id;

    
    this._route.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
   
  }

}

