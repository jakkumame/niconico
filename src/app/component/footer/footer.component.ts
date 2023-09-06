import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {

  @Output() menuCloseRequest = new EventEmitter<void>();

  onRequestMenuClose() {
    this.menuCloseRequest.emit();
  }
}
