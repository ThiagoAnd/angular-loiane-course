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

  //FormBuilder é necessario para criar form de forma reativa
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      //atributo: valorInicial,ArrayDeValidacoes
      nome: [null,[Validators.required,Validators.minLength(3),Validators.maxLength(250)]]
    })
  }

}
