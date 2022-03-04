import { Component, OnInit } from '@angular/core';

import { CursosService} from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  nomePortal:string;//Aqui foi tipado a variavel, mas não tem necessidade

  cursos:string[];
  animais:string[];

  constructor(private cursoService: CursosService) {
    this.nomePortal = "http://loiane.training.com.br";

    this.cursos = this.cursoService.getCursos();
    this.animais = this.cursoService.getAnimais();
   }

  ngOnInit(): void {
  }

}
