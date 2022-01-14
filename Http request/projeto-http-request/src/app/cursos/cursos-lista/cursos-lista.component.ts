import { GeralService } from './../../shared/geral.service';
import { AppModule } from './../../app.module';
import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EMPTY, empty, Observable, of, Subject } from 'rxjs';
import { catchError, take, switchMap } from 'rxjs/operators';
import { CursosService } from '../cursos.service';
import { Curso } from './curso';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosRepositoryServiceService } from '../cursos-repository-service.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true,
})
export class CursosListaComponent implements OnInit {
  //cursos: Curso[] = [];

  //essa exclamação é para estar explicada no one note, verificar
  cursos$!: Observable<any>;
  //Aqui criamos um subject que é um objeto que consegue emitir valor
  //Sempre que for emitido um erro, vamos emitir um valor de TRUE, por isso vai ser
  //boleano
  error$ = new Subject<boolean>();

  mensagem: string = 'testando mensagem';
  tipo: string = 'danger';

  //@ViewChild(AlertModalComponent) child!: AlertModalComponent;
  //@ViewChild('elemento') elemento!: ElementRef;

  constructor(
    //Esse abaixo não vai ser mais usado pois vamos usar aquele cursos repository que foi criado
    //para funcionar com generics
    //private service: CursosService,
    private service : CursosRepositoryServiceService,
    private router: Router,
    private geralService: GeralService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.onRefresh();
  }

  mudar() {
    //this.child.mensagem.replace.;
  }

  onRefresh() {
    //essa lista() retorna um observable, e eles são preguiçosos
    //
    //this.service.list()
    //.subscribe(console.log)
    //.subscribe(dados => this.cursos = dados);

    this.cursos$ = this.service.list().pipe(
      catchError((error) => {
        console.log('Ocorreu um erro');
        console.error(error);
        //Precisamos retornar um observable no catchError
        //Retornamos empty() ou of() para dizer que retornamos
        // um vazio, pois de acordo com a logica, é esperado algum retorno
        //no this.cursos$  e se retornar um erro, ele vai tentar fazer a iteração
        // e consequentemente vai dar erro no FOR EACH.
        //Aqui vamos emitir o valor para esse erro que vai ser o true
        //Emitindo true, ele vai ser capturado no NGIF do pipe async
        this.error$.next(true);

        //Para mostrar o alerta na pagina, vc coloca ele aqui dentro e tira o
        //this.error next, o retorn of vc deixa, assim quando der um
        //erro vai mostrar o alerta, e vc clica no x dele pra fechar.
        return of();
      })
    );
  }

  onEdit(id: number) {
    //Esse primeiro modo é caso vc não quiser colocar a url inteira, exemplo:
    //cursos/editar, então vc vai ter que dizer que vai navegar, relacionado a sua rota
    //atual, e para isso usamos o route. Ou então vc coloca a url inteira, como no segundo caso
    //que vou deixar ativo
    //this.router.navigate(['editar',id],{relativeTo:this.route});
    this.router.navigate(['cursos/editar', id]);
  }

  //Aqui usei o confirm("....") do javascript para mostrar uma popup com opção OK/CANCEL que retorna um boolean.
  onDelete(curso: Curso) {

    const result$ = this.geralService.showConfirm("Confirmacao","Tem certeza que deseja remover esse curso?");
    result$.asObservable()
    .pipe(
      take(1),
      //Esse EMPTY entrou no lugar do empty()
      switchMap(resultBoolean => resultBoolean ? this.service.remove(curso.id): EMPTY)
      //A cadeia do subscribe só é executado se resultBoolean for verdadeiro, pois
      //caso for salvo, o observable é finalizado por aqui.
    ).subscribe(
      sucesso => this.onRefresh(),
      erro => console.log("Erro ao deletar curso")
    )
    //Aqui embaixo é uma logica funcionando com o alert do javascript, vamos usar agora modal do bootstrap que vai estar acima
    /*let escolha = confirm('Gostaria de remover o registro? ');
   if (escolha){
     this.service.remove(curso.id).subscribe(
       sucesso => this.onRefresh(),
       erro => console.log('Ocorreu um erro')
     )
   }*/
  }
}
