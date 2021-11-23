import {HttpClient} from '@angular/common/http'
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
      nome: [null],
      email: [null]
    })


  }

  onSubmit(): void {
    console.log(this.formulario);
    this.http.post('https://httpbin.org/post',JSON.stringify(this.formulario.value))
    .subscribe(dados => console.log("ddddd "+dados))
} 

}
