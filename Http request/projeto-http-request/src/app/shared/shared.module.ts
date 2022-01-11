import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';



@NgModule({
  declarations: [AlertModalComponent, ConfirmModalComponent],
  exports: [AlertModalComponent],
  // entryComponents não é necessário a partir do angular v9
  //entryComponents: [ConfirmModalComponent],
  imports: [
    CommonModule
  ],
})
export class SharedModule { }
