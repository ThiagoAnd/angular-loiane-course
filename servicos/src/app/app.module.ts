import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CursosComponent } from './cursos/cursos.component';
//Depois testar e retirar todas as referencias de cursosService daqui do app module
//pois no curso do Cod3r ele não referenciou aqui, tirar do import e tirar do provider, talvez no angular 11 ja não precise
//Descobri, é pq quando vc cria o serviço , tem uma annotation/decorator que tem a linha de codigo provideIn: root,
//Essa linha ja fornece o serviço para todos os componentes, e não precisa importar e prover dentro do app.module.ts
//No Curso da loiane o injectable que ela fez manualmente não tinha essa linha provideIn: root, por isso ela importou no app.module.ts 
//import { CursosService } from './cursos/cursos.service';

@NgModule({
  declarations: [
    AppComponent,
    CursosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    //CursosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
