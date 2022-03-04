import { CursosService } from './cursos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  cursos: string[] = [];
 //cursosService: CursosService
//Voce pode declarar a classe privada ja no construtor e dai não precisa criar a variavel acima

  constructor(private cursosService: CursosService) {
   //this.cursosService = cursosService;
   }

  ngOnInit(): void { 
    this.cursos = this.cursosService.getCursoss();
  }

  adicionarCurso(curso: string){
    this.cursosService.addCurso(curso)
  }

}
