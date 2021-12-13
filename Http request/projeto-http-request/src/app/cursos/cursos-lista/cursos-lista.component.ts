import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(private service: CursosService) { }

  ngOnInit(): void {
    //essa lista() retorna um observable, e eles são preguiçosos
    //
    //this.service.list()
    //.subscribe(console.log)
    //.subscribe(dados => this.cursos = dados);

    this.cursos$ = this.service.list();
  }

}
