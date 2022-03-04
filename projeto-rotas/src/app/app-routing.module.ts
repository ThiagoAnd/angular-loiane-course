
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CursosComponent } from './cursos/cursos.component';
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { LoginComponent } from './login/login.component';
import { CursoNaoExisteComponent } from './curso-nao-existe/curso-nao-existe.component';



const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'login',component: LoginComponent},
  {path:'cursos',component: CursosComponent},
  {path:'curso/:id',component: CursoDetalheComponent},
  {path:'naoEncontrado',component: CursoNaoExisteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
