import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { FeatureData } from '../features/features.component';

@Component({
  selector: 'app-feature-modal',
  standalone: true,
  imports: [],
  templateUrl: './feature-modal.component.html',
  styleUrl: './feature-modal.component.css',
  encapsulation: ViewEncapsulation.None
})
export class FeatureModalComponent {
  closeModal = output<void>();
  feature = input.required<FeatureData>();
  
  close() {
    this.closeModal.emit();
  }
}
