import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../interface/pokemon';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private servicio:DataService,  private route :ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
  }

  searchTerm=""

  ver:boolean=false;

  pokemon:Pokemon;

  carga(event){

    const valor: string = event.detail.value;

    this.servicio.buscarPokemon(valor).subscribe({
      next: (resp) => {
        console.log("ok");
        console.log(resp); //devuelve tipo Welcome con un array de Doc[] (docs).

        this.pokemon = resp;
        this.ver=true;
       
      
      },
      error: (e) => {
        console.log(e);
        console.log("NO ok");
      }
}
    )}

}
