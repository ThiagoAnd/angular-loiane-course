//O hostlistener vai escutar o host, que é o elemento hospedeiro dessa diretiva... é o elemento na verdade
//Mas reparem pelo codigo do hostlistener que ele fica duplicado, no mouse sobre e mouse out. Pra tentar melhorar
//o codigo, podemos usar o hostbinding
import { Directive,Host,HostListener,ElementRef,Renderer2,HostBinding } from '@angular/core';

@Directive({
  selector: '[highlightMouse]'
})
export class HighlightMouseDirective {

  @HostListener('mouseenter') onMouseSobre(){
    /*
    this.renderer.setStyle(this.elementRef.nativeElement,
    'backgroundColor',
    'green' )*/
    this.fundoCor = 'green';
  };


  @HostListener('mouseleave') onMouseSair(){
    /*this.renderer.setStyle(this.elementRef.nativeElement,
      'backgroundColor',
      'white' )*/
      this.fundoCor = 'white';
      };


        //O host binding tambem é um metadado. E ele faz a associação com algum atributo do elemento no html
  //pode ser um seletor css, uma classe,etc
  @HostBinding('style.backgroundColor') fundoCor: string;

  constructor(
    //private elementRef: ElementRef, 
   // private renderer: Renderer2
    ) {
this.fundoCor="";

     }

}
