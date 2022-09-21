import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';  /* para hacer peticiones http */
import { SearchGifsResponse,Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'  /* le dice que a angular que no importa donde sea que esten, este servicio sera global y unico */
})
export class GifsService {

  constructor(private http:HttpClient) { 
   /*  this._historial = localStorage.getItem('historial'); */
   if(localStorage.getItem('historial')){
    this._historial = JSON.parse(localStorage.getItem('historial')!);  /* con todo esto podemos visuali<ar el historial en la app */

   }
   if(localStorage.getItem('imagenes')){
    this.resultados = JSON.parse(localStorage.getItem('imagenes')!);  /* con todo esto podemos visuali<ar el historial en la app */

   }
  }

  private apiKey: string ='INgvo2Q7ljd2vT1z9O1YdHr5lfEeaSM8';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];


  //cambiar any por su tipo      
  public resultados:Gif[] =[]; /* aca es de tipo Gif */
  get historial(){
    
    return [...this._historial];
  }

  

  buscarGifs(query: string){
    query = query.trim().toLocaleLowerCase(); /* Validacion para que no se repitan  */
    if(!this._historial.includes(query)){ /* Validacion para no insertar valores repetidos */
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);  /* esto corta el arreglo principal */
    
      /* almacenar en local storage 
      stringgify transforma cualquier objeto en string*/
      localStorage.setItem('historial',JSON.stringify(this._historial));  
      
     
    }
    /* asi se pasan los parametros desde aca mismo */
    const params = new HttpParams().set('api_key', this.apiKey)
    .set('limit', '10').set('q', query);
    
    console.log(this._historial);
/* 
    fetch('https://api.giphy.com/v1/gifs/search?api_key=INgvo2Q7ljd2vT1z9O1YdHr5lfEeaSM8&q=Dragon ball z&limit =10')
    .then(resp =>{
      resp.json().then(data=>{
        console.log(data);
      })
    }) */


    /* peticion http en angular, estas peticiones retornan observables, mas fuerte4s que promesas */
/* this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=INgvo2Q7ljd2vT1z9O1YdHr5lfEeaSM8&q=${query}&limit =10`) */
this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
.subscribe((resp) =>{  
  console.log(resp.data);
  this.resultados = resp.data;
  localStorage.setItem('imagenes',JSON.stringify(this.resultados));
  
})
  }
  
}
 