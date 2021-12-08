import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Curso } from './cursos-lista/curso';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  //readonly é um tipo que não vou poder atualizar a variavel
  private readonly API = 'http://localhost:3000/cursos';

  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<Curso[]>(this.API)
    .pipe(
      tap(console.log)
    );
  }
}
