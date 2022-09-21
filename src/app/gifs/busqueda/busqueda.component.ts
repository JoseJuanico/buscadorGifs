import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'

})
export class BusquedaComponent implements OnInit {

  constructor(private gifsService:GifsService) { }

  ngOnInit(): void {
  }

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>; /* El ! indica que puede ser nulo cuando lo desee y no se va a caer
  puede ser de tipo any o de tipo ElementRef  txtBuscar:any; en este casocon este viewChild se puede buscar algun elemento del html */
  buscar(/* termino: string */){
  
    console.log(this.txtBuscar);
    const valor=this.txtBuscar.nativeElement.value; /* se obtiene el cvalor */
    console.log(valor);
    if(valor.trim().length === 0){
      return;
    }
    this.gifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value = '';
  }


}
