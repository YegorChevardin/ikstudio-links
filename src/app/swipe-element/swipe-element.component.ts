import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-swipe-element',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './swipe-element.component.html',
  styleUrl: './swipe-element.component.css'
})
export class SwipeElementComponent {
  @Input({required: true}) swipeUp: boolean = true;
}
