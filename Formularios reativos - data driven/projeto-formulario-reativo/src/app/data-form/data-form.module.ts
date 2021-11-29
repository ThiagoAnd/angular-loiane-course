import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { DataFormComponent } from './data-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from '../form-debug/form-debug.component';
import { CampoControlErroComponent } from '../campo-control-erro/campo-control-erro.component';




@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations:[DataFormComponent,FormDebugComponent,CampoControlErroComponent]
})
export class DataFormModule { }
