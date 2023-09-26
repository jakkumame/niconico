import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appViewportAnimation]'
})
export class ViewportAnimationDirective {

  private hasBeenViewed = false;

  @Input() animationClass: string = 'animate__fadeIn';  // アニメーションの種類
  @Input() animationDelay?: string;  // アニメーションの遅延
  @Input() animationDuration?: string;  // アニメーションのデュレーション

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // 初期状態で非表示にする
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
    this.initIntersectionObserver();
  }

  initIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasBeenViewed) {
          this.renderer.setStyle(this.el.nativeElement, 'opacity', '1'); // 表示する
          this.startAnimation();
          this.hasBeenViewed = true;
          observer.unobserve(entry.target);
        }
      });
    }, options);

    observer.observe(this.el.nativeElement);
  }

  startAnimation() {
    this.renderer.addClass(this.el.nativeElement, 'animate__animated');
    this.renderer.addClass(this.el.nativeElement, this.animationClass);

    if (this.animationDelay) {
      this.renderer.addClass(this.el.nativeElement, this.animationDelay);
    }

    if (this.animationDuration) {
      this.renderer.addClass(this.el.nativeElement, this.animationDuration);
    }
  }
}
