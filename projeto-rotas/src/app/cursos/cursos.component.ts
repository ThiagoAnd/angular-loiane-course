import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  cursos: any[] = [];
  pagina: number = 0;
  inscricao: Subscription = new Subscription;

  constructor(private route: ActivatedRoute,private cursosService: CursosService) { }

  ngOnInit(): void {
    this.cursos=this.cursosService.getCursos();

    this.inscricao = this.route.queryParams.subscribe(
      (queryParams:any)=>{
        this.pagina = queryParams['pagina'];
    })
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

}
