import {Attribute, Directive, ElementRef, Inject, OnDestroy} from '@angular/core';
import {rootMarginFactory} from '../utils/root-margin-factory';
import {thresholdFactory} from '../utils/threshold-factory';

@Directive({
    selector: '[waIntersectionObserver]',
})
export class IntersectionObserverDirective extends IntersectionObserver
    implements OnDestroy {
    private readonly callbacks = new Map<Element, IntersectionObserverCallback>();

    constructor(
        @Inject(ElementRef) {nativeElement}: ElementRef<Element>,
        @Attribute('waIntersectionRootMargin') rootMargin: string | null,
        @Attribute('waIntersectionThreshold') threshold: string | null,
    ) {
        super(
            entries => {
                this.callbacks.forEach((callback, element) => {
                    const filtered = entries.filter(entrie => entrie.target === element);

                    if (filtered.length) {
                        callback(filtered, this);
                    }
                });
            },
            {
                root: nativeElement,
                rootMargin: rootMarginFactory(rootMargin),
                threshold: thresholdFactory(threshold),
            },
        );
    }

    observe(target: Element, callback: IntersectionObserverCallback = () => {}) {
        super.observe(target);
        this.callbacks.set(target, callback);
    }

    unobserve(target: Element) {
        super.unobserve(target);
        this.callbacks.delete(target);
    }

    ngOnDestroy() {
        this.disconnect();
    }
}
