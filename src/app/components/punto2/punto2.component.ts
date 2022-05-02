import { Component, OnInit } from '@angular/core';
import { Tecla } from 'src/app/models/tecla';
import { Categoria } from 'src/app/enums/categoria';
import { Intento } from 'src/app/models/intento';

@Component({
  selector: 'app-punto2',
  templateUrl: './punto2.component.html',
  styleUrls: ['./punto2.component.css']
})
export class Punto2Component implements OnInit {

  categoria: string = '';
  palabras: string[][];
  palabra: string = '';
  palabraOculta: string[] = [];
  teclado: Array<Tecla> = [];
  intentoImg: string = '';
  intentos: Intento;
  desactivado: boolean = true;
  oculto: string = 'opacity-0';

  constructor() {
    this.teclado = [{simbolo: 'A', isSelected: false}, {simbolo: 'B', isSelected: false},
    {simbolo: 'C', isSelected: false}, {simbolo: 'D', isSelected: false}, {simbolo: 'E', isSelected: false},
    {simbolo: 'F', isSelected: false}, {simbolo: 'G', isSelected: false}, {simbolo: 'H', isSelected: false},
    {simbolo: 'I', isSelected: false}, {simbolo: 'J', isSelected: false}, {simbolo: 'K', isSelected: false},
    {simbolo: 'L', isSelected: false}, {simbolo: 'M', isSelected: false}, {simbolo: 'N', isSelected: false},
    {simbolo: 'Ñ', isSelected: false}, {simbolo: 'O', isSelected: false}, {simbolo: 'P', isSelected: false},
    {simbolo: 'Q', isSelected: false}, {simbolo: 'R', isSelected: false}, {simbolo: 'S', isSelected: false},
    {simbolo: 'T', isSelected: false}, {simbolo: 'U', isSelected: false}, {simbolo: 'V', isSelected: false},
    {simbolo: 'W', isSelected: false}, {simbolo: 'X', isSelected: false}, {simbolo: 'Y', isSelected: false},
    {simbolo: 'Z', isSelected: false}];
    
    this.intentos = {contadorIntentos: 7, intentosImg: ['intento7.png', 'intento6.png', 'intento5.png', 'intento4.png', 'intento3.png', 'intento2.png', 'intento1.png', 'intento0.png']};
    this.intentoImg = this.intentos.intentosImg[this.intentos.contadorIntentos];
    this.palabras = [['PERRO', 'GATO', 'ELEFANTE'],['CASA', 'CAMION', 'TELEVISOR'],['TOMATE', 'TALLARINES'], ['FUTBOL', 'BASQUET']];
    this.obtenerPalabraAleatoria();
    this.esconderPalabra();
  }

  ngOnInit(): void {
  }

  obtenerPalabraAleatoria(){
    let indiceCategoria = Math.floor(Math.random() * this.palabras.length);
    let indicePalabra = Math.floor(Math.random() * this.palabras[indiceCategoria].length);
    this.palabra = this.palabras[indiceCategoria][indicePalabra];
    this.categoria = Categoria[indiceCategoria];
  }

  esconderPalabra(){
    for(let i = 0; i < this.palabra.length; i++){
      this.palabraOculta.push('_');
    }
  }

  reemplazarLetra(letra: string){
    let fallo = true;
    for(let i = 0; i < this.palabra.length; i++){
      for(let t of this.teclado){
        if(t.simbolo == letra){
          t.isSelected = true;
        }
      }
      if(this.palabra[i] == letra[0]){
        this.palabraOculta[i] = letra;
        fallo = false;
      }
    }
    if(fallo){
      this.intentos.contadorIntentos--;
      this.intentoImg = this.intentos.intentosImg[this.intentos.contadorIntentos];
    }
    this.gano();
    this.perdio();
  }

  gano(){
    const encontrado = this.palabraOculta.find(letra => letra == ('_'));
    if(encontrado === undefined){
      alert('Ganaste!! :D');
      this.modificarTeclas();
    }
  }

  perdio(){
    if(this.intentos.contadorIntentos == 0){
      alert('Perdiste :(');
      this.modificarTeclas();
      this.mostrarSolucion();
    }
  }

  modificarTeclas(){
    for(let t of this.teclado){
      t.isSelected = true;
    }
    this.desactivado = !this.desactivado;
    this.oculto = 'opacity-100';
  }

  mostrarSolucion(){
    for(let i = 0; i < this.palabra.length; i++){
      this.palabraOculta[i] = this.palabra[i];
    }
  }

  reiniciar(){
    location.reload();
  }

}
