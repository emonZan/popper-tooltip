import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { createPopper } from '@popperjs/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css'],
})
export class TooltipComponent implements AfterViewInit {
  @Input() target!: HTMLElement;
  @ViewChild('tooltip') tooltip!: ElementRef;
  popperInstance: any;

  ngAfterViewInit(): void {
    if (this.target && this.tooltip) {
      this.initPopper();
    }
  }
  initPopper() {
     this.popperInstance = createPopper(
      this.target,
      this.tooltip.nativeElement,
      {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 8],
            },
          },
        ],
      }
    );

    const showEvents = ['mouseenter', 'focus'];
    const hideEvents = ['mouseleave', 'blur'];

    showEvents.forEach((event) => {
      this.target.addEventListener(event, this.show.bind(this));
    });

    hideEvents.forEach((event) => {
      this.target.addEventListener(event, this.hide.bind(this));
    });
  }

  show() {
    // Make the tooltip visible
    this.tooltip.nativeElement.setAttribute('data-show', '');

    // Enable the event listeners
    this.popperInstance.setOptions((options: any) => ({
      ...options,
      modifiers: [
        ...options.modifiers,
        { name: 'eventListeners', enabled: true },
      ],
    }));

    // Update its position
    this.popperInstance.update();
  }

  hide() {
    // Hide the tooltip
    this.tooltip.nativeElement.removeAttribute('data-show');

    // Disable the event listeners
    this.popperInstance.setOptions((options: any) => ({
      ...options,
      modifiers: [
        ...options.modifiers,
        { name: 'eventListeners', enabled: false },
      ],
    }));
  }
}
