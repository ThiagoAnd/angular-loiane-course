import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { CursosListaComponent } from './cursos-lista/cursos-lista.component';
import { SharedModule } from '../shared/shared.module';
//O cursosformcomponent acho que foi add automaticamente assim que eu criei o component
import { CursosFormComponent } from './cursos-form/cursos-form.component';
//O reactiveFormsModule é Necessario quando utilizar o formgroup
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
      CursosListaComponent,
      CursosFormComponent
    ],
    imports: [
      CommonModule,
      CursosRoutingModule,
      SharedModule,
      ReactiveFormsModule

    ]
  })
  export class CursosModule { }

