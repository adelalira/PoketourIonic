import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from 'src/app/interface/pokemon';
import { DataService } from 'src/app/services/data.service';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.page.html',
  styleUrls: ['./pokemon.page.scss'],
})
export class PokemonPage implements OnInit {

  constructor(private servicio:DataService, private route:ActivatedRoute, private pokemonService:PokemonService) { }

  ngOnInit() {
    this.carga();
  }

  id:string = this.route.snapshot.paramMap.get('id');

  pokemon:Pokemon;
  ver:boolean=false;  

  favorito:boolean=false;
  
  carga(){
    this.servicio.buscaPokemonPorId(this.id).subscribe({
      next: (resp) => {
        //console.log("ok");
        //console.log(resp); //devuelve tipo Welcome con un array de Doc[] (docs).

        this.pokemon = resp;
        this.ver=true;
      
      },
      error: (e) => {
        console.log(e);
        console.log("NO ok");
      }
    }
  )}


    addFavorito (pokemon:Pokemon){
      this.pokemonService.addFavorito(pokemon);
      this.favorito = true;
    }

    deleteFavorito(pokemon:Pokemon){
      this.pokemonService.deleteFavorito(pokemon);
      this.favorito = false;
    }

}
