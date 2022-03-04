import { map } from 'rxjs/operators';

import { Observable, interval } from 'rxjs';


import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-exemplos-pipes',
  templateUrl: './exemplos-pipes.component.html',
  styleUrls: ['./exemplos-pipes.component.css']
})
export class ExemplosPipesComponent implements OnInit {
  livro: any ={
    titulo: 'Aprendendo Java',
    numeroPaginas: 340,
    preco: 44.99,
    lancamento: new Date(2016,5,23)
  }

 
//Esse codigo abaixo vai atribuir a string valor assincrono para a variavel
//valorAsync em 2 segundos

  valorAsync = new Promise((resolve,reject)=>{

   setTimeout(() => resolve('Valor assincrono, trabalhando com pipe async'), 2000);
  });


  constructor() { }

  ngOnInit(): void {
  }

}
