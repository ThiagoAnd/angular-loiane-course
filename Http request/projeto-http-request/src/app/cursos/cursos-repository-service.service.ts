import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud-service';
import { Curso } from './cursos-lista/curso';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
//Aqui fazemos um extends igual um repository normal no Java, que vai passar o Curso para o generics
export class CursosRepositoryServiceService extends CrudService<Curso>{

  //Aqui testar se colocar publico em um e privado ness aqui da certo ainda. No da loiane ela colocou protected/protected
  constructor(public http: HttpClient) {
    super(http, `${environment.API}cursos`);
  }
}
