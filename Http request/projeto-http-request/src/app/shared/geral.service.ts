import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';


@Injectable({
  providedIn: 'root'
})
export class GeralService {

  constructor(private modalService: BsModalService) {}

  //Operador Elvis, que é interrogação quer dizer que esses parametros são opcionais
  showConfirm(title: string,msg: string,okButton?: string,cancelButton?: string){

    //Aqui nos criamos uma constante do tipo BsModalRef que vai mostrar uma modal que sera o componente ConfirmModal
    const bsModalRef: BsModalRef = this.modalService.show(ConfirmModalComponent)

    //Nas 4 linhas abaixo nos referenciamos os 4 Inputs que a ConfirmModal espera receber(segundo o que esta no ConfirmModalComponent.ts)
    bsModalRef.content.title = title;
    bsModalRef.content.msg = msg;

    if(okButton){
      bsModalRef.content.okButton = okButton;
    }
    if(cancelButton){
      bsModalRef.content.cancelButton = cancelButton;
    }
    //Se quisermos o intelisense, ou seja , o auto complete, podemos fazer o cast
    //do bsModalRef.content, que sabemos que é um confirmModalComponent, dai vamos poder dar auto complete
    //Mas não é obrigado
    return (<ConfirmModalComponent>bsModalRef.content).confirmResult$;
  }
}
