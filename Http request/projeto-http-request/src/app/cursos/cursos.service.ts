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

  loadById(id:any){
    //No jsonServer vc faz API/ID que ela retorna o cursos
    //Quando bater em alguma outra API verificar o retorno
    //E fazemos o take 1 para dizer que só vamos bater uma vez e não vai
    //ser preciso ficar escutando, vai ja para completo
    return this.http.get<Curso>(`${this.API}/${id}`).pipe(take(1))
  }

  private create(curso: Curso){
    return this.http.post(this.API,curso).pipe(take(1))
  }

  //Com o take 1, a partir da ida e volta do servidor , ja finaliza o observable e não precisa fazer unsubscribe
  private update(curso: Curso){
    return this.http.put(`${this.API}/${curso.id}`,curso).pipe(take(1))
  }

  save (curso: Curso){
    if(curso.id){
      return this.update(curso)
    }
    return this.create(curso)
  }

  remove(id: number){
    return  this.http.delete(`${this.API}/${id}`).pipe(take(1))
  }

}
