import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso } from './cursos-lista/curso';
import { delay, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  //readonly é um tipo que não vou poder atualizar a variavel
  private readonly API = `${environment.API}cursos`;

  constructor(private http: HttpClient) {}

  list() {
    //retorna tipando o retorno como um array de curso
    return (
      this.http
        .get(this.API)
        //Esse pipe a loiane disse que é a forma mais facil para debugar
        //esse .pipe transforma as informações de um obsevable para fazer um output na tela
        .pipe(
          delay(1000),
          tap(console.log))
    );
  }

  create(curso: Curso){
    return this.http.post(this.API,curso).pipe(take(1))
  }
}
