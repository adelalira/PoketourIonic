import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ModalController, ToastController } from '@ionic/angular';
import { Pokemon } from '../interface/pokemon';
 
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() id: string;
  pokemon: Pokemon = null;
 
  constructor(private dataService: DataService, private modalCtrl: ModalController, private toastCtrl: ToastController) { }
 
  ngOnInit() {
    this.dataService.getPokemonById(this.id).subscribe(res => {
      this.pokemon = res;
    });
  }
 
  async deletePokemon() {
    await this.dataService.deletePokemon(this.pokemon)
    this.modalCtrl.dismiss();
  }
 
  async updatePokemon() {
    await this.dataService.updatePokemon(this.pokemon);
    const toast = await this.toastCtrl.create({
      message: 'pokemon updated!.',
      duration: 2000
    });
    toast.present();
 
  }
}