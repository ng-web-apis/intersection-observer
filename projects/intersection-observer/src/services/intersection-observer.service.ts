import {ElementRef, Inject, Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs';
import {finalize, share} from 'rxjs/operators';
import {INTERSECTION_ROOT} from '../tokens/intersection-root';
import {INTERSECTION_ROOT_MARGIN} from '../tokens/intersection-root-margin';
import {INTERSECTION_THRESHOLD} from '../tokens/intersection-threshold';
import {INTERSECTION_OBSERVER_SUPPORT} from '../tokens/support';

@Injectable()
export class IntersectionObserverService extends Observable<IntersectionObserverEntry[]> {
    constructor(
        @Inject(ElementRef) {nativeElement}: ElementRef<Element>,
        @Inject(INTERSECTION_OBSERVER_SUPPORT) support: boolean,
        @Optional() @Inject(INTERSECTION_ROOT) root: ElementRef<Element> | null,
        @Optional() @Inject(INTERSECTION_ROOT_MARGIN) rootMargin: string | null,
        @Optional() @Inject(INTERSECTION_THRESHOLD) threshold: number | number[] | null,
    ) {
        let observer: IntersectionObserver;

        super(subscriber => {
            if (!support) {
                subscriber.error('IntersectionObserver is not supported in your browser');
            }

            observer = new IntersectionObserver(
                entries => {
                    subscriber.next(entries);
                },
                {
                    root: root ? root.nativeElement : undefined,
                    rootMargin: rootMargin ? rootMargin : undefined,
                    threshold: threshold ? threshold : undefined,
                },
            );
            observer.observe(nativeElement);
        });

        return this.pipe(
            finalize(() => observer.disconnect()),
            share(),
        );
    }
}
