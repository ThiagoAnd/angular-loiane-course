import { Curso } from './../cursos-lista/curso';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//Aqui eu criei um guarda padrão para CanActivate como n sabia criar direto pra Resolve
//No Resolve podemos colocar <any> ou se ja tiver a interface do curso implementada, colocar o proprio curso
//como vamos colocar aqui
export class CursoResolverGuard implements Resolve<Curso>/*CanActivate*/ {
  //Esse método veio por padrão, só vou comentar mas vc pode apagar pq nos vamos implementar o Resolve e não o canActivate
  //Verificar depois se tem algum jeito de criar via CLI pois ja tentei ng g g guardanome e ng g guard guardanome mas nao aparece pra implementar a interface Resolve
  /*canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }*/

}
