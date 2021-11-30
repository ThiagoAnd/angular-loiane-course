import {HttpClient} from '@angular/common/http'
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  //Variavel que representa o nosso formulario, onde vamos adicionar os campos
  formulario: FormGroup;

  //Segunda formula utiliada para criar formularios no angular, pelo construtor, utilizando o formbuilder
  constructor(
    private formBuilder : FormBuilder
    ,private http : HttpClient

    ) { }

  ngOnInit(): void {
    //Aqui vc inicializa o formulario e dentro dele estão os campos, cada campo pode ser criado inicialmente com valor ou vc pode jogar null
    //this.formulario = new FormGroup({
      //nome: new FormControl('Digite seu nome'),
     // email: new FormControl(null)
    //});


    //Outra forma de criar um formulario. A forma de cima foi comentada, essa debaixo
    //é com o builder, para uma pagina por exemplo, com uns 20 campos essa forma abaixo é mais enxuta
    this.formulario = this.formBuilder.group({
      nome: [null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]],
      email: [null,Validators.email],
      endereco: this.formBuilder.group({
        cep: [null],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      })
    })


  }

  onSubmit(): void {
    console.log(this.formulario);
    //Este é um site para fazer simulação HTTP, emula o envio do formulario que conseguimos emular as 4 operações Rest, ver nos videos de formulario antigo sem ser o reativo, para saber melhor

    //Aqui vamos fazer uma chamada e tratar o reset do formulario
    this.http.post('https://httpbin.org/post',JSON.stringify(this.formulario.value))
    .subscribe(dados => {
      console.log("ddddd "+dados);
    //Caminho feliz vai resetar formulario
    this.formulario.reset();
    },
    (erro: any)=> alert('Aconteceu um erro na chamada, vc pode simular , mudando a url da chamada'))
}

resetar(){
  this.formulario.reset();
}

verificaValidTouched(campo){
  //Utiliza o .get para acessar a referencia ao formControl do formulario
  //E pega o campo, e verifica se o campo NÃO é valido e se foi tocado
  return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
}

//Aqui vai aplicar um css de erro caso tiver conflito
aplicaCssErro(campo){
  return {
    'has-error': this.verificaValidTouched(campo),
    'has-feedback': this.verificaValidTouched(campo)
  }
}

consultaCEP(){
  let cep = this.formulario.get('endereco.cep').value;

  //Faz sempre o replace de qualquer carectere que não seja um digito
  cep = cep.replace(/\D/g,'');

  if (cep != ""){
    //Expressão regular para validar o cep
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do cep
    if(validacep.test(cep)){
      this.resetaDados();

      //Aqui utilizamos o template literal do typescript para utilizar a crase ````
      //Assim não precisamos fazer "+cep+", só fazer ${cep}, deixando mais elegante
      this.http.get(`//viacep.com.br/ws/${cep}/json`)
      .subscribe(dados => this.populaDados(dados));
    }

  }
}

resetaDados(){
  this.formulario.patchValue({
    endereco: {
      rua: null,
      complemento:null,
      cidade: null,
      bairro: null,
      estado:null
    }
  });
}

populaDados(dados){
 this.formulario.patchValue({
  endereco: {
    rua: dados.logradouro,
    complemento:dados.complemento,
    cidade: dados.localidade,
    bairro: dados.bairro,
    estado:dados.uf
  }
 })
}

}
