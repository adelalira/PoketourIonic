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
 
 /**
   * Metodo para que en los favoritos podamos ver uno en detalle
   * @returns 
   */
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

