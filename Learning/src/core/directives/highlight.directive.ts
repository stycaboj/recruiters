import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})

export class HighlightDirective implements OnInit {

  constructor(private eleRef: ElementRef) {}

  ngOnInit() {
    this.eleRef.nativeElement.style.background = 'red';
  }
}