import { Injectable } from '@angular/core';
import { Pasaje } from '../models/pasaje';

@Injectable({
  providedIn: 'root'
})
export class PasajeService {

  pasajes: Array<Pasaje>;

  constructor() { 
    this.pasajes = Array<Pasaje>();
    this.pasajes = [
      { 
        id: 1,
        dniPasajero: 12300000,
        precioPasaje: 2000,
        categoriaPasajero: 'a',
        fechaCompra: new Date()
      },
      {
        id: 2,
        dniPasajero: 45600000,
        precioPasaje: 1500,
        categoriaPasajero: 'j',
        fechaCompra: new Date()
      },
      {
        id: 3,
        dniPasajero: 78900000,
        precioPasaje: 1300,
        categoriaPasajero: 'm',
        fechaCompra: new Date()
      }
    ];
  }

  getPasajes(): Array<Pasaje>{
    return this.pasajes;
  }

  addPasaje(pasaje: Pasaje): void{
    if(pasaje.id == undefined){
      pasaje.id = this.getId();
      pasaje.fechaCompra = new Date();
      this.pasajes.push(pasaje);
    }
  }

  getId(): number{
    let max: number = 0;
    for(let pasaje of this.pasajes){
      if(pasaje.id > max){
        max = pasaje.id;
      }
    }
    return max + 1;
  }

  getPasaje(id: number): Pasaje{
    let indexPasaje: number = this.pasajes.findIndex(pasaje => pasaje.id == id);
    return this.pasajes[indexPasaje];
  }

  deletePasaje(pasaje: Pasaje): void{
    let indexPasaje: number = this.pasajes.findIndex(p => p.id == pasaje.id);
    this.pasajes.splice(indexPasaje, 1);

    // this.pasajes = this.pasajes.filter(p => p.id !== pasaje.id);
  }

  getPasajesPorCategoria(categoria: string): number{
    let numPasajes: number = this.pasajes.filter(p => p.categoriaPasajero === categoria).length;
    return numPasajes;
  }

  getRecaudacionPorCategoria(categoria: string): number{
    let total: number = 0;
    this.pasajes.forEach(p => {
      if(p.categoriaPasajero === categoria){
        total += p.precioPasaje;
      }
    });
    return total;
  }

  getTotal(): number{
    let total: number = 0;
    this.pasajes.forEach(p => {
      total += p.precioPasaje;
    });
    return total;
  }
}
