import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  cursos: string[] = ['Timoteo','Samanta','Pedro'];

  getCursoss(){
    return this.cursos;
  }

  addCurso(curso: string){
    this.cursos.push(curso);
  }
  constructor() {
    console.log("Construtor iniciado")
   }
}
