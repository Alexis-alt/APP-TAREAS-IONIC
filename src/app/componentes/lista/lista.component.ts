import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/Services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})


//Este componente nos permite reutilizar las listas cada vez que las nececitemos
//No hay necesidad de reescribirlas solo tenemos que llamar su selector


export class ListaComponent implements OnInit {

  @ViewChild('lista') lista : IonList;
  @Input() terminada = false;



  constructor(public _deseosService : DeseosService,
              private _route : Router,
              private _alertController : AlertController) {
  

   }


   listaSelecionada(lst:Lista){

    console.log(lst)

    const listaId = lst.id;

   this.terminada ? this._route.navigateByUrl(`/tabs/tab2/agregar/${listaId}`) : this._route.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);

    
   
  }

  async borrar(lst : Lista){

  this._deseosService.borrarLista(lst);    

  const alert = await this._alertController.create({
    cssClass: 'my-custom-class',
  
   
    message: 'La Lista se ha Borrado',
    buttons: ['OK']
  });

  await alert.present();



  }
  
 async cambiarNombre(lst: Lista){

    const alert = await this._alertController.create({
      cssClass: 'my-custom-class',
   
      header: 'Editar',
      inputs:[
      {
        name:'titulo',
        type:'text',
        value: lst.titulo,
        placeholder:lst.titulo }
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
  
          text:'Editar',
          //Función que se detona
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
              this.lista.closeSlidingItems()
  
            }
            else{


              lst.titulo = dataform.titulo;

              this._deseosService.guardarStorage();
              this.lista.closeSlidingItems()

               }
           
  
         }
  
        }
       ]
    });
   
    await alert.present();


  }



  ngOnInit() {}

}
