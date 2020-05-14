import {NgModule} from '@angular/core';
import {IntersectionObserveeDirective} from './directives/intersection-observee.directive';
import {IntersectionObserverDirective} from './directives/intersection-observer.directive';
import {IntersectionRootDirective} from './directives/intersection-root.directive';
import {IntersectionDirective} from './directives/intersection.directive';

@NgModule({
    declarations: [
        IntersectionObserverDirective,
        IntersectionObserveeDirective,
        IntersectionRootDirective,
        IntersectionDirective,
    ],
    exports: [
        IntersectionObserverDirective,
        IntersectionObserveeDirective,
        IntersectionRootDirective,
        IntersectionDirective,
    ],
})
export class IntersectionObserverModule {}
