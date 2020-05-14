import {Directive, Inject, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {IntersectionObserveeService} from '../services/intersection-observee.service';

// @dynamic
@Directive({
    selector: '[waIntersectionItem]',
})
export class IntersectionObserveeDirective {
    @Output()
    waIntersectionItem = this.entries$;

    constructor(
        @Inject(IntersectionObserveeService)
        private readonly entries$: Observable<IntersectionObserverEntry[]>,
    ) {}
}
