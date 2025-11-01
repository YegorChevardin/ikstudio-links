import { Component, OnInit, OnDestroy, NgZone, AfterViewInit, ElementRef, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SwipeElementComponent } from "../swipe-element/swipe-element.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SwipeElementComponent],
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
      this.animateTitle();
      this.animateSubtitle();
    }
  }

  ngOnDestroy() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }

  private updateTimer() {
    const now = new Date();
    const nextYear = now.getFullYear() + 1;
    const newYear = new Date(`January 1, ${nextYear} 00:00:00`);
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

  private animateSubtitle() {
    const subtitle = this.el.nativeElement.querySelector('.subtitle');
    
    if (subtitle) {
      this.renderer.addClass(subtitle, 'animated-subtitle');
    }
  }

}
