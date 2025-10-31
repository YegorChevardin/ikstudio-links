import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

export interface FeatureData {
  label: string;
  description: string;
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css'
})
export class FeaturesComponent implements OnInit, OnDestroy, AfterViewInit {
  features: FeatureData[] = [
    {
      label: "Survive the Storm",
      description: "Navigate treacherous waters and weather devastating storms as you fight to keep your crew alive in the unforgiving Tempest Reef."
    },
    {
      label: "Explore Mysterious Islands",
      description: "Discover hidden treasures, ancient ruins, and dangerous creatures on uncharted islands scattered throughout the reef."
    },
    {
      label: "Form Alliances",
      description: "Team up with other players to take on powerful sea monsters, raid enemy strongholds, or engage in thrilling naval battles."
    }
  ];
  
  currentFeatureIndex: number = 0;
  private intervalId: any;
  private readonly AUTO_ROTATE_INTERVAL = 5000; // 5 seconds
  private isBrowser: boolean;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.initializeCarousel();
  }

  ngAfterViewInit() {
    // Animation will be triggered after features are loaded
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private initializeCarousel() {
    if (this.isBrowser) {
      this.startAutoRotate();
      setTimeout(() => this.animateFeature('in'), 100);
    }
  }

  private startAutoRotate() {
    if (this.isBrowser) {
      this.intervalId = setInterval(() => {
        this.nextFeature();
      }, this.AUTO_ROTATE_INTERVAL);
    }
  }

  nextFeature() {
    this.animateFeature('out', () => {
      this.currentFeatureIndex = (this.currentFeatureIndex + 1) % this.features.length;
      this.animateFeature('in');
    });
  }

  previousFeature() {
    this.animateFeature('out', () => {
      this.currentFeatureIndex = (this.currentFeatureIndex - 1 + this.features.length) % this.features.length;
      this.animateFeature('in');
    });
  }

  goToFeature(index: number) {
    if (index === this.currentFeatureIndex) return;
    
    this.animateFeature('out', () => {
      this.currentFeatureIndex = index;
      this.animateFeature('in');
    });
    
    // Reset auto-rotate timer
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.startAutoRotate();
    }
  }

  private animateFeature(direction: 'in' | 'out', onComplete?: () => void) {
    if (!this.isBrowser) {
      if (onComplete) onComplete();
      return;
    }

    const featureContent = this.el.nativeElement.querySelector('.feature-content');
    
    if (!featureContent) {
      if (onComplete) onComplete();
      return;
    }

    if (direction === 'out') {
      featureContent.style.transition = 'opacity 0.3s, transform 0.3s';
      featureContent.style.opacity = '0';
      featureContent.style.transform = 'translateX(-30px)';
      
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 300);
    } else {
      featureContent.style.opacity = '0';
      featureContent.style.transform = 'translateX(30px)';
      
      setTimeout(() => {
        featureContent.style.transition = 'opacity 0.5s, transform 0.5s';
        featureContent.style.opacity = '1';
        featureContent.style.transform = 'translateX(0)';
        
        if (onComplete) {
          setTimeout(onComplete, 500);
        }
      }, 10);
    }
  }

  get currentFeature(): FeatureData | null {
    return this.features[this.currentFeatureIndex] || null;
  }
}
