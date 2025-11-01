import { Component, AfterViewInit, ElementRef, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback-form.component.html',
  styleUrl: './feedback-form.component.css'
})
export class FeedbackFormComponent implements AfterViewInit {
  formData = {
    name: '',
    email: '',
    message: ''
  };
  
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  private isBrowser: boolean;

  constructor(
    private el: ElementRef, 
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.animateForm();
    }
  }

  private animateForm() {
    const formElements = this.el.nativeElement.querySelectorAll('.form-element');
    
    formElements.forEach((element: HTMLElement, index: number) => {
      this.renderer.addClass(element, 'animated');
      this.renderer.setStyle(element, 'animation-delay', `${index * 0.15 + 0.2}s`);
    });
  }

  onSubmit() {
    if (this.formData.name && this.formData.email && this.formData.message) {
      this.isSubmitting = true;
      
      // Simulate form submission
      setTimeout(() => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        
        // Reset form after 3 seconds
        setTimeout(() => {
          this.formData = { name: '', email: '', message: '' };
          this.submitSuccess = false;
        }, 3000);
      }, 1500);
    }
  }
}
