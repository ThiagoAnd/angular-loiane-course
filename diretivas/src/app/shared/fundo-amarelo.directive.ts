
//Adicionamos o ElementRef para poder trabalhar com o elemento
import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[fundoAmarelo]'
})
export class FundoAmareloDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
   // console.log(this.elementRef);
   //O ElementRef pode ser utilizado mas na propria documentação fala para tentar evitar, pois vc acessa
   //direto o elemento pela DOM, e isso pode deixar a aplicação aberta, deixar vulneravel. pesquisar
   //Então vamos comentar esse codigo abaixo com o elementRef e usar o renderer, pode se usar o elementRef mas evitar sempre que possivel
   //this.elementRef.nativeElement.style.backgroundColor = 'yellow';
   this.renderer.setStyle(this.elementRef.nativeElement, 
    'backgroundColor',
    'yellow');
   }

}
