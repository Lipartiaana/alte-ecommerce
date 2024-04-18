import { Component, Input } from '@angular/core';

@Component({
  selector: 'alte-button',
  standalone: true,
  imports: [],
  template: '<ng-content/>',
  host: {
    class: 'alte-button',
    '[class.alte-button--default]': 'size === "default"',
    '[class.alte-button--small]': 'size === "small"',
    '[class.alte-button--primary]': 'theme === "primary"',
    '[class.alte-button--outline]': 'theme === "outline"',
    '[class.alte-button--link]': 'theme === "link"',
    '[class.alte-button--outline-black]': 'theme === "outline-black"',
  },
})
export class ButtonComponent {
  @Input() size: 'default' | 'small' = 'default';
  @Input() theme: 'primary' | 'outline' | 'link' | 'outline-black' = 'primary';
}
