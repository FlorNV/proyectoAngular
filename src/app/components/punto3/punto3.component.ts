import { Component, OnInit } from '@angular/core';
import { Pasaje } from 'src/app/models/pasaje';
import { PasajeService } from 'src/app/services/pasaje.service';

@Component({
  selector: 'app-punto3',
  templateUrl: './punto3.component.html',
  styleUrls: ['./punto3.component.css']
})
export class Punto3Component implements OnInit {

  pasaje!: Pasaje;
  pasajes!: Array<Pasaje>;
  ingresados!: boolean;
  seleccionado!: boolean;

  constructor(private pasajeService: PasajeService) { 
    this.pasaje = new Pasaje();
    this.pasaje.categoriaPasajero = '';
    this.ingresados = false;
    this.seleccionado = false;
    this.pasajes = new Array<Pasaje>();
    this.pasajes = this.listarCompras();
  }

  ngOnInit(): void {
  }

  registrarCompra(){
    this.pasaje.precioPasaje = this.calcularTotal();
    this.pasajeService.addPasaje(this.pasaje);
    this.pasaje = new Pasaje();
  }

  listarCompras(){
    return this.pasajeService.getPasajes();
  }

  seleccionar(pasajeSeleccionado: Pasaje){
    this.pasaje = pasajeSeleccionado;
    this.seleccionado = true;
  }

  eliminar(pasajeSeleccionado: Pasaje){
    this.pasajeService.deletePasaje(pasajeSeleccionado);
  }

  calcularTotal(): number{
    if(this.pasaje.categoriaPasajero !== '' && this.pasaje.precioPasaje > 0){
      this.ingresados = true;
    }else{
      this.ingresados = false;
    }

    let total: number = this.pasaje.precioPasaje;
    if(this.pasaje.categoriaPasajero === 'm'){
      total = total - total * 0.25;
    }else if(this.pasaje.categoriaPasajero === 'j'){
      total = total - total * 0.5;
    }
    return total;
  }

  contarPasajes(categoria: string){
    return this.pasajeService.getPasajesPorCategoria(categoria);
  }

  cacularTotalRecaudadoPorCategoria(categoria: string){
    return this.pasajeService.getRecaudacionPorCategoria(categoria);
  }

  calcularTotalRecaudado(){
    return this.pasajeService.getTotal();
  }

  cancelar(){
    this.pasaje = new Pasaje();
    this.seleccionado = false;
  }
}
