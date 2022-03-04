import { Component, Input, OnInit, Output,EventEmitter, ViewChild, ElementRef } from '@angular/core';
//import * as EventEmitter from 'events';

@Component({
  selector: 'contador',
  templateUrl: './output-property.component.html',
  styleUrls: ['./output-property.component.css']
})
export class OutputPropertyComponent implements OnInit {

  @Input() valor: number = 0;
//Aqui vamos declarar uma variavel do tipo emissor de valor, ela sera responsavel por enviar um valor para o componente pai do output
//property.component, que é o data-binding.component, ou seja, se algum metodo incrementa ou decrementa for chamado, sera enviado um novo valor
//Para expor esse evento não basta só colocar new EventEmitter, tem que colocar o decorator @Output
  @Output() mudouValor = new EventEmitter();

  //Aqui vamos ter acesso ao valor do input direto pelo elemento, sem a necessidade de usar a variavel valor
  //Inicialmente utilizamos HTMLElement e fazendo um console.log descobrimos que na verdade ele é um ElementRef, então para ir para
  //os atributos desse elemento, trocamos o HTMLElement para ElementRef em baixo
  @ViewChild('inputViewChild') valorInputViewChild:ElementRef;

  incrementa(){
    console.log(this.valorInputViewChild)
    //this.valor++; Vamos mudar para modificar ao inves pelo valor, modificar direto pelo DOM
    this.valorInputViewChild.nativeElement.value++;
    //vamos emitir o evnto
    this.mudouValor.emit({novoValor:this.valor});
  }

  decrementa(){
    this.valor--;
    this.mudouValor.emit({novoValor:this.valor});
  }

  constructor() { }

  ngOnInit(): void {
  }

}
