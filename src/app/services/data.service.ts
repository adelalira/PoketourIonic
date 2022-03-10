import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Pokemon, Ability } from '../interface/pokemon';
 
export interface Note {
  id?: string;
  nombre:string;
  clase: string;
  reino: string;
  familia:string;
  descripcion:string;
}
 
@Injectable({
  providedIn: 'root'
})
export class DataService {

 
  constructor(private firestore: Firestore, private http:HttpClient) { }
 
  getPokemons(): Observable<Pokemon[]> {
    const notesRef = collection(this.firestore, 'pokemon');
    return collectionData(notesRef, { idField: 'id'}) as Observable<Pokemon[]>;
  }
 
  getPokemonById(id): Observable<Pokemon> {
    const noteDocRef = doc(this.firestore, `pokemon/${id}`);
    return docData(noteDocRef, { idField: 'id' }) as Observable<Pokemon>;
  }
 
  addPokemon(pokemon: Pokemon) {
    const notesRef = collection(this.firestore, 'pokemon');
    return addDoc(notesRef, pokemon);
  }
 
  deletePokemon(pokemon: Pokemon) {
    const noteDocRef = doc(this.firestore, `pokemon/${pokemon.id}`);
    return deleteDoc(noteDocRef);
  }
 
  updatePokemon(pokemon: Pokemon) {
    const noteDocRef = doc(this.firestore, `pokemon/${pokemon.id}`);
    return updateDoc(noteDocRef, { name: pokemon.name, id: pokemon.id, types: pokemon.types, ability: pokemon.abilities});
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