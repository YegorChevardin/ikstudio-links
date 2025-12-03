import { Component, OnInit, OnDestroy, NgZone, AfterViewInit, ElementRef, Renderer2, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  private timerId: any;
  
  titleText: string = 'TEMPEST REEF';
  titleChars: string[] = [];
  private isBrowser: boolean;

  constructor(
    private ngZone: NgZone, 
    private el: ElementRef, 
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.titleChars = this.titleText.split('');
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.updateTimer();
    });
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.animateLogo();
      this.animateTitle();
      this.animateSubtitle();
      this.initParallax();
    }
  }

  ngOnDestroy() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }

  private updateTimer() {
    const now = new Date();
    const newYear = new Date(`May 5, 2026 00:00:00`);
    const diff = newYear.getTime() - now.getTime();

    this.ngZone.run(() => {
      if (diff > 0) {
        this.days = Math.floor(diff / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        this.minutes = Math.floor((diff / (1000 * 60)) % 60);
        this.seconds = Math.floor((diff / 1000) % 60);
      } else {
        this.days = this.hours = this.minutes = this.seconds = 0;
      }
    });
    this.timerId = setTimeout(() => {
      this.updateTimer();
    }, 1000);
  }

  private animateTitle() {
    const chars = this.el.nativeElement.querySelectorAll('.title-char');
    
    chars.forEach((char: HTMLElement, index: number) => {
      this.renderer.addClass(char, 'animated');
      this.renderer.setStyle(char, 'animation-delay', `${index * 0.1}s`);
    });
  }

  private animateLogo() {
    const logo = this.el.nativeElement.querySelector('.logo-animated');
    
    if (logo) {
      this.renderer.addClass(logo, 'animated-logo');
    }
  }

  private animateSubtitle() {
    const subtitle = this.el.nativeElement.querySelector('.subtitle');
    
    if (subtitle) {
      this.renderer.addClass(subtitle, 'animated-subtitle');
    }
  }

  private initParallax() {
    const headerBanner = this.el.nativeElement.querySelector('.header-banner');
    if (headerBanner) {
      this.renderer.addClass(headerBanner, 'parallax-enabled');
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isBrowser) return;
    
    const headerBanner = this.el.nativeElement.querySelector('.header-banner');
    if (!headerBanner) return;

    // Get the header dimensions
    const header = this.el.nativeElement.querySelector('header');
    const rect = header.getBoundingClientRect();
    
    // Calculate mouse position relative to the header center
    const x = (event.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (event.clientY - rect.top - rect.height / 2) / rect.height;
    
    // Apply parallax effect (adjust multiplier for intensity)
    const moveX = x * 20; // 20px max movement
    const moveY = y * 20; // 20px max movement
    
    this.renderer.setStyle(headerBanner, 'transform', `translate(${moveX}px, ${moveY}px) scale(1.1)`);
  }

}
