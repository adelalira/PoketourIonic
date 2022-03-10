import { Injectable } from '@angular/core';
import { Pokemon } from '../interface/pokemon';

import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http:HttpClient, private firestore: Firestore) { }


  addFavorito(pokemon:Pokemon){
    const pokRef = collection(this.firestore, 'pokemon');
    return addDoc(pokRef, pokemon);
  }

  deleteFavorito(pokemon:Pokemon){
    const pokRef = doc(this.firestore, `pokemon/${pokemon.id}`);
    return deleteDoc(pokRef);
  }

  getPokemons(): Observable<Pokemon[]> {
    const pokRef = collection(this.firestore, 'pokemon');
    return collectionData(pokRef, { idField: 'id'}) as Observable<Pokemon[]>;
  }

}
