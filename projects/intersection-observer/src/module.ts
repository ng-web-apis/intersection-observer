import {NgModule} from '@angular/core';
import {IntersectionObserverDirective} from './directives/intersection-observer';
import {IntersectionRootDirective} from './directives/intersection-root';

@NgModule({
    declarations: [IntersectionObserverDirective, IntersectionRootDirective],
    exports: [IntersectionObserverDirective, IntersectionRootDirective],
})
export class IntersectionObserverModule {}
