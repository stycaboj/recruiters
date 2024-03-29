import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})

export class HighlightDirective implements OnInit {

  @Input() appHighlight: string = 'red';
  
  constructor(private readonly eleRef: ElementRef) {}

  public ngOnInit() {
    this.eleRef.nativeElement.style.background = this.appHighlight;
  }
}