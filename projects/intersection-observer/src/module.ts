import {NgModule} from '@angular/core';
import {IntersectionObserverDirective} from './directives/intersection-observer.directive';
import {IntersectionRootDirective} from './directives/intersection-root.directive';

@NgModule({
    declarations: [IntersectionObserverDirective, IntersectionRootDirective],
    exports: [IntersectionObserverDirective, IntersectionRootDirective],
})
export class IntersectionObserverModule {}
