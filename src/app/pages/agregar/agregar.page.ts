import { Component, OnInit } from '@angular/core';
import { DeseosService } from 'src/app/Services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { AlertController } from '@ionic/angular';
import { ListaItem } from 'src/app/models/lista-item.model';
import { element } from 'protractor';
import { createNgModule } from '@angular/compiler/src/core';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

lista : Lista;
nombreItem = '';




  constructor(private _deseosService : DeseosService,
              private _route : ActivatedRoute,
              private _alertController : AlertController) {

                //Obtenemos los parametros enviados por el url
const idLst = this._route.snapshot.paramMap.get('listaId');
console.log(idLst);

this.lista = _deseosService.obtenerLista(idLst);



   }

  ngOnInit() {
  }

  async agregarItem(){

    console.log(this.nombreItem);

      if( this.nombreItem.length === 0){

        const alert = await this._alertController.create({
          cssClass: 'my-custom-class',
          header: 'Alerta',
         
          message: 'Su lista no tiene ningun nombre.',
          buttons: ['OK']
        });
    
        await alert.present();


      }
else{

  try{

    const nuevoItem = new ListaItem(this.nombreItem);

    this.lista.items.push(nuevoItem);

    this.nombreItem = '';


    //Se invoca el método guardarStorage()
    //Por que extraemos un elemento Lista del Storage que modificamos y despues tenemos que guardar los cambios
    this._deseosService.guardarStorage();


  }
  catch(error){
  
    
    const nuevoItem = new ListaItem(this.nombreItem);

    this.lista.items.push(nuevoItem);

    this.nombreItem = '';


    
    const alert = await this._alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
     
      message: 'Algo salió mal',
      buttons: ['OK']
    });

    await alert.present();

    
    
  
  
  }






  
}
//Agregaré un try catch




  }

  cambioCheck(item : ListaItem){

    const pendientes = this.lista.items.filter(elemento => !elemento.completado).length;


      console.log({pendientes});

      if(pendientes === 0 ){

        this.lista.terminada = true;
        this.lista.fechaTerminada = new Date();

        console.log(this.lista.fechaTerminada);

      }else{

        this.lista.terminada = false;
        this.lista.fechaTerminada = null;



      }




    this._deseosService.guardarStorage();

  }

  borrar(i: number){

    this.lista.items.splice(i,1);
    
    this._deseosService.guardarStorage();


  }

}
