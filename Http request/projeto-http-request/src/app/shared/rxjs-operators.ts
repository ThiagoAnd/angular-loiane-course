import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { pipe } from "rxjs";
import { filter, map, tap } from 'rxjs/operators';

//Vai retornar um tipo T qualquer
export function filtrarResponse<T>(){
  return pipe(
    //Filtra todos os eventos que são do tipo 4 , indicando que o upload foi finalizado
    filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
    //Na loiane ela utilizou res: HttpResponse<T>, mas eu não consegui e coloquei any
    map((res: any) => res.body)
  );
}


//Função para tratar do upload progress
//Essa abaixo vai ser diferente da de cima, pois ela ai receber como parametro uma função, que vai ser um callback
//essa função de callback vai receber um parametro numero, que vai ser o numero da porcentagem
//Essa função em si vai ser void não vai retornar nada, mas vamos conseguir pegar o numero do progresso, ainda não entendo como funciona
export function uploadProgresso<T>(cb: (progresso:number)=> void){
  //O operador tap não faz nada, é usado apenas para executar alguma logica
  //esse return não é o retorno em si, é a forma que é utilizado para executar essa função
  return tap((event: HttpEvent<T>) => {
    if(event.type === HttpEventType.UploadProgress){
      cb(Math.round((event.loaded * 100)/(event.total || 1)));
    }
  });

}
