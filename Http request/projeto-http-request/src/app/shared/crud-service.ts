import { HttpClient } from '@angular/common/http';
import { delay, tap, take } from 'rxjs/operators';

export class CrudService <T>{

  constructor(public http: HttpClient,private API_URL: any) {}

  list() {
    //retorna tipando o retorno como um array de registro
    return (
      this.http
        .get(this.API_URL)
        .pipe(
          delay(1000),
          tap(console.log))
    );
  }

  loadById(id:any){
    //No jsonServer vc faz API/ID que ela retorna o registros
    //Quando bater em alguma outra API verificar o retorno
    //E fazemos o take 1 para dizer que só vamos bater uma vez e não vai
    //ser preciso ficar escutando, vai ja para completo
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1))
  }

  private create(registro: T){
    return this.http.post(this.API_URL,registro).pipe(take(1))
  }

  //Com o take 1, a partir da ida e volta do servidor , ja finaliza o observable e não precisa fazer unsubscribe
  private update(registro: T){
    return this.http.put(`${this.API_URL}/${registro['id' as keyof T]}`,registro).pipe(take(1))
  }

  save (registro: T){
    //Quando sabiamos que era um curso, o intelisense sabia que ele poderia ter um id
    //Agora isso não acontece com o generics, acho que no angular 4/6 que a loiane passou, bastava
    //setar de registro.id para registro['id'] que dava certo. No Angular 13 eu tive que fazer
    //do jeito abaixo, aind não testei.
    if(registro['id' as keyof T]){
      return this.update(registro)
    }
    return this.create(registro)
  }

  remove(id: number){
    return  this.http.delete(`${this.API_URL}/${id}`).pipe(take(1))
  }

}
