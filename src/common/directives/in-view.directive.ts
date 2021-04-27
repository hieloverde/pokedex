import {Directive, Component, Input, ViewContainerRef, TemplateRef, AfterViewInit} from '@angular/core';
import {PokemonListComponent} from '../../app/pokemon-list/pokemon-list.component';

@Directive({
  selector: '[appInView]'
})
export class InViewDirective implements AfterViewInit {
  alreadyRendered = false; // cheking if visible already

  @Input() url = 'some';

  constructor(
    private vcRef: ViewContainerRef,
    private tplRef: TemplateRef<any>
  ) {}

  ngAfterViewInit(): void {
    const commentEl = this.vcRef.element.nativeElement; // template
    const elToObserve = commentEl.parentElement;
    this.setMinWidthHeight(elToObserve);

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        this.renderContents(entry.isIntersecting)
      });
    }, {threshold: [0, .1, .9, 1]});
    observer.observe(elToObserve);
  }

  renderContents(isInView: boolean): void {
    if (isInView && !this.alreadyRendered) {
      this.vcRef.clear();
      this.vcRef.createEmbeddedView(this.tplRef);
      this.alreadyRendered = true;
      console.log('myValue', this.url);
/*      this.pokemonListComponent.testMethod(this.appInView);*/
    }
  }

  setMinWidthHeight(el: any): void { // prevent issue being visible all together
    const style = window.getComputedStyle(el);
    const [width, height] = [parseInt(style.width, 10), parseInt(style.height, 10)];
/*    !width && (el.style.minWidth = '40px');
    !height && (el.style.minHeight = '40px');*/
  }
}
