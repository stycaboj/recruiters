import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent {
  @Input() title?: string;
  @Input() items: any;
  @Input() itemNameColor: string = 'dteal';

  getColorClass(color: string): string {
    return `text-${color}`;
  }
}
