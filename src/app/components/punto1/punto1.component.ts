import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/models/noticia';

@Component({
  selector: 'app-punto1',
  templateUrl: './punto1.component.html',
  styleUrls: ['./punto1.component.css']
})
export class Punto1Component implements OnInit {

  noticias: Array<Noticia> = [];
  indice: number = 0;
  noticia: Noticia = new Noticia('', '', '');

  constructor() { 
    this.noticias = new Array<Noticia>();
    this.noticias = [
      { titulo: 'El conflicto entre Rusia y Ucrania alcanza el espacio',
        contenido: 'El director de la agencia rusa dijo que la decisión se debe a las sanciones; en marzo calificó a los gobiernos occidentales como “perros de la guerra” y dijo que Moscú daría prioridad a los satélites militares.',
        img: 'img1.jpg'
      },
      { titulo: 'Eclipse solar "luna negra" de abril 2022', 
        contenido: 'Solo las personas en siete países sudamericanos podrán ver directamente el tránsito de la Luna por delante del astro rey.', 
        img: 'img2.jpg'
      },
      { titulo: 'Un asteroide "potencialmente peligroso" pasará cerca de la Tierra', 
        contenido: 'La NASA informó que el objeto denominado 418135 (también conocido como 2008 AG33) pasará hoy cerca de la Tierra.', 
        img: 'img3.jpg'
      },
      { titulo: 'Fotografían el equipo que ayudó a aterrizar al rover Perseverance', 
        contenido: 'Observar algunos de los componentes que permitieron que el rover llegara de forma segura a la superficie marciana, podría proporcionar información valiosa para futuras misiones.', 
        img: 'img4.jpg'}
    ];
    this.iniciar();
  }

  ngOnInit(): void {
  }

  iniciar(){
    if(this.indice < this.noticias.length){
      this.noticia = this.noticias[this.indice];
    }
  }

  siguiente(){
    this.indice += 1;
    if(this.indice > this.noticias.length-1){
      this.indice = 0;
    }
    this.noticia = this.noticias[this.indice];
  }

  anterior(){
    this.indice -= 1;
    if(this.indice < 0){
      this.indice = this.noticias.length-1;
    }
    this.noticia = this.noticias[this.indice];
  }

}
