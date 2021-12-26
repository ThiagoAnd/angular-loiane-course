import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      //atributo: valorInicial,ArrayDeValidacoes
      nome: [null,[Validators.required,Validators.minLength(3),Validators.maxLength(250)]]
    })
  }

  onSubmit(){
    this.submited = true;
    console.log(this.formulario.value)
    this.formulario.valid ? console.log('submit'):null
  }

  onCancel(){
    this.submited = false;
    this.formulario.reset;
    console.info('cancel')
  }

  hasErrors(campo: string){
    console.log('Entrei na validação de erros')
    console.log(this.formulario.controls[campo].errors?.required)
    //Returna true se o campo tiver erros
    //Esse interrogação é o elvis operator, ele é utilizado
    //para somente verificar o atributo de um objeto apenas se não for nulo
    return this.formulario.get(campo)?.errors
  }
}
