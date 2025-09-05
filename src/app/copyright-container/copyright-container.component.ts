import { Component } from '@angular/core';

@Component({
  selector: 'app-copyright-container',
  standalone: true,
  imports: [],
  templateUrl: './copyright-container.component.html',
  styleUrl: './copyright-container.component.css'
})
export class CopyrightContainerComponent {
  currentYear = new Date().getFullYear();
}
