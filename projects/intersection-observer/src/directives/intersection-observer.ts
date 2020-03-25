import {DOCUMENT} from '@angular/common';
import {
    Attribute,
    Directive,
    ElementRef,
    EventEmitter,
    Inject,
    OnDestroy,
    Optional,
    Output,
} from '@angular/core';
import {INTERSECTION_ROOT} from '../tokens/intersection-root';

const DEFAULT_MARGIN = '0px 0px 0px 0px';
const DEFAULT_THRESHOLD = 0;

// @dynamic
@Directive({
    selector: '[waIntersectionObserver]',
})
export class IntersectionObserverDirective extends IntersectionObserver
    implements OnDestroy {
    @Output()
    readonly waIntersectionObserver = new EventEmitter<IntersectionObserverEntry[]>();

    constructor(
        @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLElement>,
        @Optional() @Inject(INTERSECTION_ROOT) root: HTMLElement | null,
        @Inject(DOCUMENT) documentRef: Document,
        @Attribute('waIntersectionRootSelector') selector: string | null,
        @Attribute('waIntersectionRootMargin') margin: string | null,
        @Attribute('waIntersectionThreshold') threshold: string | null,
    ) {
        super(
            entry => {
                this.waIntersectionObserver.emit(entry);
            },
            {
                root: selector ? documentRef.querySelector(selector) || root : root,
                rootMargin: margin || DEFAULT_MARGIN,
                threshold: threshold
                    ? threshold.split(',').map(value => parseFloat(value))
                    : DEFAULT_THRESHOLD,
            },
        );

        this.observe(this.elementRef.nativeElement);
    }

    ngOnDestroy() {
        this.unobserve(this.elementRef.nativeElement);
    }
}
