import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CursosService } from '../cursos/cursos.service';

@Component({
  selector: 'app-curso-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.css']
})
export class CursoDetalheComponent implements OnInit {

  id: number = 0;
  curso: any;
  inscricao: Subscription = new Subscription;
  
  constructor(private route : ActivatedRoute,
              private router: Router,
              private cursoService: CursosService) {
   // this.id = route.snapshot.params['id'];
   }



   
  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe(
      (params: any) =>{
        this.id = params['id'];

        this.curso = this.cursoService.getCurso(this.id);

        if(this.curso==null){
          this.router.navigate(['/naoEncontrado']);
        }

      }

    );
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

}
