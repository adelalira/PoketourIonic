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
 
  /**
   * Metodo para buscar un pokemon
   * @returns 
   */
  getPokemons(): Observable<Pokemon[]> {
    const pokRef = collection(this.firestore, 'pokemon');
    return collectionData(pokRef, { idField: 'id'}) as Observable<Pokemon[]>;
  }
 
  /**
   * Metodo para buscar un pokemon por id
   * @returns 
   */
  getPokemonById(id): Observable<Pokemon> {
    const pokRef = doc(this.firestore, `pokemon/${id}`);
    return docData(pokRef, { idField: 'id' }) as Observable<Pokemon>;
  }
 
  /**
   * Metodo para añadir un pokemon a la base de datos
   * @returns 
   */
  addPokemon(pokemon: Pokemon) {
    const pokRef = collection(this.firestore, 'pokemon');
    return addDoc(pokRef, pokemon);
  }
 
  /**
   * Metodo para borrar un pokemon dela base de datos
   * @returns 
   */
  deletePokemon(pokemon: Pokemon) {
    const pokRef = doc(this.firestore, `pokemon/${pokemon.id}`);
    return deleteDoc(pokRef);
  }
 
  /**
   * Metodo para actualizar los datos de un pokemon en la base de datos
   * @returns 
   */
  updatePokemon(pokemon: Pokemon) {
    const pokRef = doc(this.firestore, `pokemon/${pokemon.id}`);
    return updateDoc(pokRef, { name: pokemon.name, order: pokemon.order, types: pokemon.types, ability: pokemon.abilities});
  }


  /**
   * Metodo para buscar un pokemon en la api
   * @returns 
   */
  buscarPokemon(valor) {
    const params: HttpParams = new HttpParams()
    .set('title',valor)
    .set('limit',3);  
    return this.http.get<Pokemon>("https://pokeapi.co/api/v2/pokemon/"+valor)
  }

  /**
   * Metodo para buscar un pokemon por id en la api
   * @returns 
   */
  buscaPokemonPorId(id): Observable<Pokemon> {
    console.log("https://pokeapi.co/api/v2/pokemon/"+id);
    return this.http.get<Pokemon>("https://pokeapi.co/api/v2/pokemon/"+id);
  }

}