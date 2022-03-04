import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class CursosService {

  getCursos(){
    return [
      {id:1,nome: 'Angular 10'},
      {id:2,nome: 'Java'},
  
    ]
  }

  getCurso(id: number){
    for(let i=0;i<this.getCursos().length;i++){
      if (this.getCursos()[i].id==id){
        return this.getCursos()[i];
      }
    }
    return null;
  }

  constructor() { }
}
