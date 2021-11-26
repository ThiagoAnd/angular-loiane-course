import {HttpClient} from '@angular/common/http'
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  //Variavel que representa o nosso formulario, onde vamos adicionar os campos
  formulario: FormGroup;

  //Segunda formula utiliada para criar formularios no angular, pelo construtor, utilizando o formbuilder
  constructor(
    private formBuilder : FormBuilder
    ,private http : HttpClient
    
    ) { }

  ngOnInit(): void {
    //Aqui vc inicializa o formulario e dentro dele estão os campos, cada campo pode ser criado inicialmente com valor ou vc pode jogar null
    //this.formulario = new FormGroup({
      //nome: new FormControl('Digite seu nome'),
     // email: new FormControl(null)
    //});


    //Outra forma de criar um formulario. A forma de cima foi comentada, essa debaixo
    //é com o builder, para uma pagina por exemplo, com uns 20 campos essa forma abaixo é mais enxuta
    this.formulario = this.formBuilder.group({
      nome: [null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]],
      email: [null,Validators.email]
    })


  }

  onSubmit(): void {
    console.log(this.formulario);
    //Este é um site para fazer simulação HTTP, emula o envio do formulario que conseguimos emular as 4 operações Rest, ver nos videos de formulario antigo sem ser o reativo, para saber melhor

    //Aqui vamos fazer uma chamada e tratar o reset do formulario
    this.http.post('https://httpbin.org/post',JSON.stringify(this.formulario.value))
    .subscribe(dados => {
      console.log("ddddd "+dados);
    //Caminho feliz vai resetar formulario
    this.formulario.reset();
    },
    (erro: any)=> alert('Aconteceu um erro na chamada, vc pode simular , mudando a url da chamada'))
} 

resetar(){
  this.formulario.reset();
}

}
