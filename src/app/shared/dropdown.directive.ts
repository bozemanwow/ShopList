import { Directive, ElementRef, Renderer2, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropDown]'
})
export class DropDownDirective{
 @HostBinding('class.open') isSelected = false;
  constructor(private eleRef: ElementRef, private renRef: Renderer2){

  }
  @HostListener('click') clickSelect(eventData: Event){

console.log('Click');
this.isSelected = !this.isSelected;
  }

}
