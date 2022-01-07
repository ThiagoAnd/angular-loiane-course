import { CursosService } from './../cursos.service';
import { Curso } from './../cursos-lista/curso';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//Aqui eu criei um guarda padrão para CanActivate como n sabia criar direto pra Resolve
//No Resolve podemos colocar <any> ou se ja tiver a interface do curso implementada, colocar o proprio curso
//como vamos colocar aqui
//Vamos colocar o Curso que é o objeto que o Resolver vai devolver/resolver
export class CursoResolverGuard implements Resolve<Curso>/*CanActivate*/ {

  constructor(private service:CursosService) { }

  //Clicando em implementar metodo padrão vamos pegar esse abaixo.Vamos receber uma foto da rota com o objeto, um estado e um desses 3 tipos abaixo: curso,observable ou promise. Apesar que agora eu deletei e deixei só o observable
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<Curso>{
//aqui podemos mexer com parametros da rota mas como é um snapshot, ja é o parametro em si, não é observable

    //if rota é de editar
    if (route.params && route.params.id){
     return this.service.loadById(route.params.id)
    }

    //Quando for criar curso
    //Como curso é apenas uma interface e não uma classe, nós voltamos somente os atributos do curso com oum objeto
    //e não o curso inteiro. E usamos tambem o of do rxjs que diz que vamos retornar
    //um observable a partir de um objeto, somente vamos usar para manter a padronização.
    return of({
      id: null as any,
      nome: null as any
    });

  }
  //Esse método veio por padrão, só vou comentar mas vc pode apagar pq nos vamos implementar o Resolve e não o canActivate
  //Verificar depois se tem algum jeito de criar via CLI pois ja tentei ng g g guardanome e ng g guard guardanome mas nao aparece pra implementar a interface Resolve
  /*canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }*/

}
