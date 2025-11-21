import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-divider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-divider.component.html',
  styleUrl: './section-divider.component.css'
})
export class SectionDividerComponent {
  @Input() variant: 'gradient' | 'wave' | 'ornamental' | 'glow' = 'gradient';
  @Input() height: string = '80px';
}
