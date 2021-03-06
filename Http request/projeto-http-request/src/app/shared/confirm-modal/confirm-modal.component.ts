import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  @Input() title!: string;
  @Input() msg!: string;
  @Input() cancelButton = "Cancelar";
  @Input() okButton = "Sim";

  //SUBJECT é um objeto que emite valores
  confirmResult$!: Subject<boolean>;
  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.confirmResult$ = new Subject();
  }

  onClose(){
    this.confirmAndClose(false);
  }

  onConfirm(){
    //emite o valor true
    this.confirmAndClose(true);
  }

 private confirmAndClose(value: boolean){
    this.confirmResult$.next(value);
    this.bsModalRef.hide();
  }

}
