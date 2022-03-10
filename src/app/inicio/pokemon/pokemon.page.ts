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
    this.getAllFavoritesPokemons();
  }

  id:string = this.route.snapshot.paramMap.get('id');

  pokemon:Pokemon;
  ver:boolean=false;  

  favorito:boolean=false;

  pokFav:Pokemon[];
  
    addFavorito (pokemon:Pokemon){
      this.pokemonService.addFavorito(pokemon);
      this.favorito = true;
    }

    deleteFavorito(pokemon:Pokemon){
      this.servicio.deletePokemon(pokemon);
      this.favorito = false;
    }

    getAllFavoritesPokemons(){
      this.pokemonService.getFavorites()
      .subscribe(data =>{
        this.pokFav = data; 
        
        this.getPokemon(); 
      })
    }


    getPokemon(){
      this.servicio.buscaPokemonPorId(this.id)
      .subscribe({
        next: data =>{
          this.checkFavorite(data); 
          this.pokemon = data;
          this.ver = true;
        },
        error: e =>{
          console.log("No exist");
        }
      })
    }


    checkFavorite(pokemon : Pokemon){

      if(this.pokFav!=undefined){
  
        this.pokFav.forEach(element => {     
          if(element.name == pokemon.name){
            this.favorito = true;
          }else{
            this.favorito = false;
          }
        });
      }
    }

}
