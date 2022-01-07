import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursosService } from '../cursos.service';
import { ActivatedRoute } from '@angular/router';
import { Curso } from '../cursos-lista/curso';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  //O formgroup faz com q nosso formulario funcione como uma arvore, ele mapeia
  formulario!: FormGroup;

  //Flag para saber se foi submetido
  submited = false;

  //FormBuilder é necessario para criar form de forma reativa
  constructor(private fb: FormBuilder,
    private service:CursosService,
    private location: Location,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    //Esse metodo funciona mas abaixo vamos refatorar ele
/*     this.route.params.subscribe(
      (params:any) => {
        //Acessar como . ou acessar como array
        const id = params.id;
        //const id = params['id'];
        //console.log(id)
        //Pega o curso, que sera um observable, eu setei o
        //diamond operator, mas pode voltar sem se quiser
        const curso$ = this.service.loadById(id);
        //Com esse curso em mãos vc tem que fazer um subscribe se não
        //ele não faz nada, e dai vc atualiza o formulario do html com o updateForm
        curso$.subscribe(
          curso =>{
            this.updateForm(curso)
          }
        );
      }
    ) */

    //Verificar o route.params é uma das exceções de que não precisamos fazer o
    //unsubscribe, pois o Angular cuida disso, assim como ele faz com pipe async
       // this.route.params
        //.pipe(
          //Mapeia o valor recebido e volta valor modificado
       //   map((params:any) => params['id']),
          //O id que é retornado nesse map de cima, vai para esse switchMap abaixo pelo return
          //do metodo acima
          //nesse switchMap é retornado o curso associado a esse ID
          //O switchMap retorna um observable, portanto
          //quando fazemos o .subscribe abaixo, na verdade estamos fazendo o subscribe
          //desse switchMap agora, não do map e nem do route params (que apesar de que tambem retorna um observable, não é ele tratado abaixo)
        //  switchMap(id => this.service.loadById(id))
          //Se eu quiser eu posso ir enfileirando o switchMpa
          //Com novas requisições e ele vai devolvendo, como se fosse o Apache Camel
      //  )
      //  .subscribe(
          //curso retornado do observable switchMap
      //  curso => this.updateForm(curso)
      //   )


      //Agora que temos o guarda de rotas fazemos assim:
      //Agora que temos uma rota, vamos ter a foto da nossa rota
      //ja com o curso, ou seja, vamos poupar alguns segundos e deixar
      //o codigo mais enxuto
      const curso = this.route.snapshot.data['cursoVariavel']

//Devemos sempre inicializar nosso formulario
//para poder trabalhar depois com os campos que tem nele
    this.formulario = this.fb.group({
      //id:[null],
      id:[curso.id],
      //atributo: valorInicial,ArrayDeValidacoes
      //nome: [null,[Validators.required,Validators.minLength(3),Validators.maxLength(250)]]
      nome: [curso.nome,[Validators.required,Validators.minLength(3),Validators.maxLength(250)]]
    })
  }

//esse update form era utlizado antes de usar o guarda de rotas
  /*updateForm(curso: Curso){
    this.formulario.patchValue({
      id: curso.id,
      nome: curso.nome
    })
  }*/

  onSubmit(){
    this.submited = true;
    //console.log(this.formulario.value)
    //Brincando tentando testar o operador ternario, se for valido console, se não volta null
    this.formulario.valid ? console.log('submit'):null

    if (this.formulario.valid){
      //com o take(1) que esta no service, não vamos precisar nos desinscrever do observable
      this.service.create(this.formulario.value).subscribe(
        sucesso => {alert('Sucesso ao criar curso');
                    this.location.back();
      },
        erro => alert('Erro ao criar curso: '+erro),
        () => console.log('request completo')
      )
    }

  }



  onCancel(){
    this.submited = false;
    this.formulario.reset;
    console.info('cancel')
  }

  hasErrors(campo: string){
    console.log('Entrei na validação de erros')
    console.log('Campo required: '+this.formulario.controls[campo].errors?.required)
    //Returna true se o campo tiver erros
    //Esse interrogação é o elvis operator, ele é utilizado
    //para somente verificar o atributo de um objeto apenas se não for nulo
    return this.formulario.get(campo)?.errors
  }
}
