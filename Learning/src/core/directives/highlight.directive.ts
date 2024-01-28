import { Directive, ElementRef, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})

export class HighlightDirective implements OnInit {

  @Input() appHighlight: string = 'red';
  
  constructor(private eleRef: ElementRef) {}

  ngOnInit() {
    this.eleRef.nativeElement.style.background = this.appHighlight;
  }
}