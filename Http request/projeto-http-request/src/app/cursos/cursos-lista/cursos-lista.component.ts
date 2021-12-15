import { Component, OnInit } from '@angular/core';
import { empty, Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CursosService } from '../cursos.service';
import { Curso } from './curso';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces:true
})
export class CursosListaComponent implements OnInit {

  //cursos: Curso[] = [];

  cursos$!: Observable<Curso[]>;
  //Aqui criamos um subject que é um objeto que consegue emitir valor
  //Sempre que for emitido um erro, vamos emitir um valor de TRUE, por isso vai ser
  //boleano
  error$ = new Subject <boolean>();

  constructor(private service: CursosService) { }

  ngOnInit(): void {
    //essa lista() retorna um observable, e eles são preguiçosos
    //
    //this.service.list()
    //.subscribe(console.log)
    //.subscribe(dados => this.cursos = dados);

    this.cursos$ = this.service.list()
    .pipe(
      catchError(
        error => {
          console.log("Ocorreu um erro")
          console.error(error)
          //Precisamos retornar um observable
          //Retornamos empty() ou of() para dizer que retornamos
          // um vazio, pois de acordo com a logica, é esperado algum retorno
          //no this.cursos$  e se retornar um erro, ele vai tentar fazer a iteração
          // e consequentemente vai dar erro no FOR EACH.
          //Aqui vamos emitir o valor para esse erro que vai ser o true
          //Emitindo, ele vai ser capturado no NGIF do pipe async
          this.error$.next(true);
          return of();

        }
      )
    );
  }

}
