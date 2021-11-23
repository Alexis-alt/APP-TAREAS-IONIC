import { Injectable } from '@angular/core';
import { ListaItem } from '../models/lista-item.model';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

listas:Lista[]=[];

//Este servicio es global, lo cual indica que es el mismo para todas las instancias

  constructor() {
    
this.cargarStorage();


 //const lista1 = new Lista("Tarea número 1");
 //const lista2 = new Lista("Tarea número 2");
//this.listas.push(lista1,lista2);

   }


   crearLst(titulo:string){

const nvaLst = new Lista(titulo);

this.listas.push(nvaLst);

//Agrega la lista al array de objetos en el local storage
this.guardarStorage();

return nvaLst.id;

   }

   
obtenerLista(id : string | number){

id = Number(id);

return this.listas.find(data=>data.id == id);


}


guardarStorage(){

localStorage.setItem('data',JSON.stringify(this.listas));

//Asigna al local storage la misma lista que se obtiene pero a la cual ya se le agrego un elemento 

}


cargarStorage(){

  //Si el localStorage ya contiene datos se obtienen, dando como resultado un array de objetos de tipo Lista
  //Y si ya contiene se los asigna a la lista declarada
if(localStorage.getItem('data')){

this.listas = JSON.parse(localStorage.getItem('data'));


}
//Si no hay datos el array listas ya esta declarado como un array vacio


}


borrarLista(lst : Lista){

 this.listas = this.listas.filter(listaStorage => listaStorage.id != lst.id)

this.guardarStorage();

}



}
