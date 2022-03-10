import { ChangeDetectorRef, Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { ModalPage } from '../modal/modal.page';
import { Pokemon } from '../interface/pokemon';
import { PokemonService } from '../services/pokemon.service';
 
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  pokemon: Pokemon[] = [];
 
  constructor(private dataService: DataService,  private cd: ChangeDetectorRef, private alertCtrl: AlertController, private modalCtrl: ModalController, private pokemonService:PokemonService) {
    this.pokemonService.getPokemons().subscribe(res => {
      this.pokemon = res;
      this.cd.detectChanges();
    });
  }
 
  /*
  async addPokemon() {
    const alert = await this.alertCtrl.create({
      header: 'Add pokemon',
      inputs: [
        {
          name: 'name',
          placeholder: 'Nombre',
          type: 'text'
        },
        {
          name: 'id',
          placeholder: 'id',
          type: 'text'
        }
        ,
        {
          name: 'types',
          placeholder: 'types',
          type: 'text'
        },
        {
          name: 'abilities',
          placeholder: 'abilities',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Añadir',
          handler: res => {
            this.dataService.addPokemon({name: res.name, base_experience:res.base_experience, forms:res.forms, id: res.id, 
              types: res.types, abilities: res.abilities, is_default:res.is_default, held_items:res.held_items, 
              game_indices:res.game_indices, height:res.height, location_area_encounters:res.location_area_encounters, 
              moves:res.moves, order:res.order, past_types:res.past_types, species:res.species, sprites:res.sprites,
              stats:res.stats, weight:res.weight});
          }
          
        }
      ]
    });
 
    await alert.present();
  }*/
 
  async openPokemon(pokemon: Pokemon) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: { id: pokemon.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8
    });
 
    await modal.present();
  }
}

