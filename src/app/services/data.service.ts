import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Pokemon, Ability } from '../interface/pokemon';

 
@Injectable({
  providedIn: 'root'
})
export class DataService {

 
  constructor(private firestore: Firestore, private http:HttpClient) { }
 
  getPokemons(): Observable<Pokemon[]> {
    const pokRef = collection(this.firestore, 'pokemon');
    return collectionData(pokRef, { idField: 'id'}) as Observable<Pokemon[]>;
  }
 
  getPokemonById(id): Observable<Pokemon> {
    const pokRef = doc(this.firestore, `pokemon/${id}`);
    return docData(pokRef, { idField: 'id' }) as Observable<Pokemon>;
  }
 
  addPokemon(pokemon: Pokemon) {
    const pokRef = collection(this.firestore, 'pokemon');
    return addDoc(pokRef, pokemon);
  }
 
  deletePokemon(pokemon: Pokemon) {
    const pokRef = doc(this.firestore, `pokemon/${pokemon.id}`);
    return deleteDoc(pokRef);
  }
 
  updatePokemon(pokemon: Pokemon) {
    const pokRef = doc(this.firestore, `pokemon/${pokemon.id}`);
    return updateDoc(pokRef, { name: pokemon.name, id: pokemon.id, types: pokemon.types, ability: pokemon.abilities});
  }


  buscarPokemon(valor) {
    const params: HttpParams = new HttpParams()
    .set('title',valor)
    .set('limit',3);  
    return this.http.get<Pokemon>("https://pokeapi.co/api/v2/pokemon/"+valor)
  }

  buscaPokemonPorId(id): Observable<Pokemon> {
    console.log("https://pokeapi.co/api/v2/pokemon/"+id);
    return this.http.get<Pokemon>("https://pokeapi.co/api/v2/pokemon/"+id);
  }

}