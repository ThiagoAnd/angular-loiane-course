import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  tap,
  switchMap,
} from 'rxjs/operators';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss'],
})
export class LibSearchComponent implements OnInit {
  readonly CAMPOS = 'name,description,version';
  queryField = new FormControl();
  readonly searchUrl = 'https://api.cdnjs.com/libraries';
  results$!: Observable<any>;
  total!: number;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    //aqui vamos escutar o campo de queryFields para escutar o campo, para ser um formulario reativo, para nao precisar clicar
    //podemos acessar uma propriedade chamada valuechanges que retorna um boservable
    //o result$ foi escolhido para não precisarmos fzer um subscribe no queryFields OBS, ela tirou o result aqui por enquanto
    //vamos modificicar um pouco a questão do observable, vver a aula da loiane qualquer coisa
    this.results$ = this.queryField.valueChanges
      .pipe(
        map((value) => value.trim()),
        filter((value) => value.length > 1),
        //aplicando um delay para podermos digitar sem que ele fique batendo na requisição
        debounceTime(200),
        //me dê todos os valores distintos, até que o valor seja modificado, ou seja, se vc ficar dando um monte de espaço ele não vai ficar pegando a palavra
        distinctUntilChanged(),
        //tap(x => console.log(x)),
        //para evitar de colocar chamadas aninhadas no subscribe nos colocamos um switchmap
        switchMap((value) =>
          this.http.get(this.searchUrl, {
            params: {
              search: value,
              fields: this.CAMPOS
            }
          })),

        tap((res: any) => this.total = res.total),
        map((res: any) => res.results)
      );

  }

  onSearch() {
    let value = this.queryField.value;
    const campos = 'name,description,version';

    //aqui se  o value existir, vc ja pode colocar o valor dentro e comparar com empty
    // se le: se tiver valor e se o valor recebido sem espaço for diferente de empty
    if (value && (value = value.trim()) !== '') {
      //outra forma de mandar parametros
      //ao inves de colocar assim this.searchUrl+"?fields="+campos+"&search=" + value
      //parece que o nome tem que ser params, não pode ser outro
      //essa forma abaixo pode ser utilizada quando vc ja vai passar todos os parametros
      const params = {
        search: value,
        fields: campos,
      };

      //outro modo de fazer, dai é só colocar ali no lugar do params, mas tanto essa a de cima é mais elegante do que concatenar
      let params2 = new HttpParams();
      params2 = params2.set('search', value);
      params2 = params2.set('fields', campos);

      //vc tambem pode fazer assim : params:  parametros , dai vc pode mudar o nome da variavel, mas como o nome da variavel aqui no
      //angular, ta igual a variavel do http, só precisa do params, que o javascript ja entende, não precisa de params:params
      this.results$ = this.http.get(this.searchUrl, { params }).pipe(
        tap((res: any) => (this.total = res.total)),
        map((res) => res.results)
      );
    }
  }
}
