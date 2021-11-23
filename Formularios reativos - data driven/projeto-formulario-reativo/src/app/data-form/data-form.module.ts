import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataFormComponent } from './data-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from '../form-debug/form-debug.component';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations:[DataFormComponent,FormDebugComponent]
})
export class DataFormModule { }
