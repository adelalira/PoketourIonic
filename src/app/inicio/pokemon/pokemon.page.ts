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
  
  /**
   * Metodo para añadir un pokemon a favorito
   * @returns 
   */
    addFavorito (pokemon:Pokemon){
      this.pokemonService.addFavorito(pokemon);
      this.favorito = true;
    }

    /**
   * Metodo para borrar un pokemon de favorito
   * @returns 
   */
    deleteFavorito(pokemon:Pokemon){
      this.servicio.deletePokemon(pokemon);
      this.favorito = false;
    }

    /**
   * Metodo para buscar todos los favoritos
   * @returns 
   */
    getAllFavoritesPokemons(){
      this.pokemonService.getFavorites()
      .subscribe(data =>{
        this.pokFav = data; 
        
        this.getPokemon(); 
      })
    }


    /**
   * Metodo para buscar un pokemon por su id
   * @returns 
   */
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


    /**
   * Metodo para ver si el pokemon esta ya en favorito o no
   * @returns 
   */
    checkFavorite(pokemon : Pokemon){

      if(this.pokFav!=undefined){
  
        this.pokFav.forEach(element => {     
          if(element.name == pokemon.name){
            this.favorito = true;
          }
         if(this.favorito==false){
            this.favorito = false;
          }
        });
      }
    }

}
