import {ElementRef, Inject, Injectable, OnDestroy, Optional} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {INTERSECTION_ROOT} from '../tokens/intersection-root';
import {INTERSECTION_ROOT_MARGIN} from '../tokens/intersection-root-margin';
import {INTERSECTION_THRESHOLD} from '../tokens/intersection-threshold';

@Injectable()
export class IntersectionObserverService extends Observable<IntersectionObserverEntry[]>
    implements OnDestroy {
    private readonly observer: IntersectionObserver;

    private readonly entries$ = new Subject<IntersectionObserverEntry[]>();

    constructor(
        @Inject(ElementRef) private readonly elementRef: ElementRef<Element>,
        @Optional() @Inject(INTERSECTION_ROOT) root: ElementRef<Element> | null,
        @Optional() @Inject(INTERSECTION_ROOT_MARGIN) rootMargin: string | null,
        @Optional() @Inject(INTERSECTION_THRESHOLD) threshold: number | number[] | null,
    ) {
        super(subscriber => this.entries$.subscribe(subscriber));

        this.observer = new IntersectionObserver(
            entries => {
                this.entries$.next(entries);
            },
            {
                root: root ? root.nativeElement : undefined,
                rootMargin: rootMargin ? rootMargin : undefined,
                threshold: threshold ? threshold : undefined,
            },
        );
        this.observer.observe(this.elementRef.nativeElement);
    }

    ngOnDestroy() {
        this.observer.unobserve(this.elementRef.nativeElement);
        this.entries$.complete();
    }
}
