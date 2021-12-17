import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {

  //Essa mensagem vai ser utilizada para mostrar a mensagem no html do alert
  //colocamos esse sinal de exclamação para dizer ao angular que em algum momento
  //vamos instanciar a variavel, então ele pode ficar despreocupado
  @Input() mensagem!: string;

  //Aqui vai passar o tipo do alerta, danger, sucesso, etc. Por padrão vai ser success
  @Input() tipo = 'success';

  constructor() { }

  ngOnInit(): void {
  }

}
