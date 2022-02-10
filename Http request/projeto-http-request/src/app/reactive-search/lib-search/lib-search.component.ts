import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})
export class LibSearchComponent implements OnInit {

  queryField = new FormControl();
  readonly searchUrl = 'https://api.cdnjs.com/libraries';
  results$!: Observable<any>;
  total!: number;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onSearch(){

    let value = this.queryField.value;
    const campos = "name,description,version"


    //aqui se  o value existir, vc ja pode colocar o valor dentro e comparar com empty
    // se le: se tiver valor e se o valor recebido sem espaço for diferente de empty
    if (value && (value = value.trim()) !== ''){

      //outra forma de mandar parametros
      //ao inves de colocar assim this.searchUrl+"?fields="+campos+"&search=" + value
      //parece que o nome tem que ser params, não pode ser outro
      //essa forma abaixo pode ser utilizada quando vc ja vai passar todos os parametros
      const params = {
        search: value,
        fields: campos,
      }

      //outro modo de fazer, dai é só colocar ali no lugar do params, mas tanto essa a de cima é mais elegante do que concatenar
      let params2 = new HttpParams();
      params2 = params2.set('search',value);
      params2 = params2.set('fields',campos);

      //vc tambem pode fazer assim : params:  parametros , dai vc pode mudar o nome da variavel
    this.results$ = this.http.get(this.searchUrl,{params})
    .pipe(
      tap((res:any) => this.total = res.total),
      map(res => res.results)
     )
    }
  }

}
