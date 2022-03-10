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

/**
   * Metodo para añadir un pokemon a favorito
   * @returns 
   */
  addFavorito(pokemon:Pokemon){
    const pokRef = collection(this.firestore, 'pokemon');
    return addDoc(pokRef, pokemon);
  }

  /**
   * Metodo para borrar un pokemon de favorito
   * @returns 
   */
  deleteFavorito(pokemon:Pokemon){
    const pokRef = doc(this.firestore, `pokemon/${pokemon.id}`);
    return deleteDoc(pokRef);
  }

  /**
   * Metodo para buscar un pokemon
   * @returns 
   */
  getPokemons(): Observable<Pokemon[]> {
    const pokRef = collection(this.firestore, 'pokemon');
    return collectionData(pokRef, { idField: 'id'}) as Observable<Pokemon[]>;
  }

  /**
   * Metodo para buscar un pokemon favorito
   * @returns 
   */
  getFavorites(): Observable<Pokemon[]>{
    const pokRef = collection(this.firestore, 'pokemon');
    return collectionData(pokRef, {idField: 'id'}) as Observable<Pokemon[]>;
}
}
