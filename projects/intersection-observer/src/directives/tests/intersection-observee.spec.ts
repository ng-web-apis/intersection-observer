import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {IntersectionObserverModule} from '../../module';
import {IntersectionObserverDirective} from '../intersection-observer.directive';

describe('IntersectionObserveeDirective', () => {
    @Component({
        template: `
            <section
                *ngIf="observe"
                #root
                id="observer_root"
                style="position: relative; height: 200px; overflow: auto;"
                waIntersectionThreshold="0.5"
                waIntersectionObserver
            >
                <h1
                    style="position: absolute; top: 700px; height: 200px;"
                    (waIntersectionObservee)="onIntersection($event)"
                >
                    I'm being observed
                </h1>
                <div style="height: 900px;">Height expander</div>
                <h1
                    style="position: absolute; top: 200px; height: 200px;"
                    (waIntersectionObservee)="onIntersection($event)"
                >
                    I'm being observed
                </h1>
            </section>
        `,
    })
    class TestComponent {
        @ViewChild('root', {read: IntersectionObserverDirective})
        observer!: IntersectionObserverDirective;

        onIntersection = jasmine.createSpy('onIntersection');
        observe = true;
    }

    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [IntersectionObserverModule],
            declarations: [TestComponent],
        });

        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
        testComponent.onIntersection.calls.reset();
    });

    it('Emits intersections', done => {
        document.querySelector('#observer_root')!.scrollTop = 350;
        fixture.detectChanges();

        setTimeout(() => {
            expect(testComponent.onIntersection).toHaveBeenCalled();
            document.querySelector('#observer_root')!.scrollTop = 0;
            fixture.detectChanges();
            testComponent.observe = false;
            fixture.detectChanges();
            done();
        }, 100);
    });

    it('Compatible with native method signature', done => {
        const div = document.createElement('div');

        document.body.appendChild(div);

        expect(() => testComponent.observer.observe(div)).not.toThrow();
        document.querySelector('#observer_root')!.scrollTop = 350;
        fixture.detectChanges();

        setTimeout(() => {
            expect(testComponent.onIntersection).toHaveBeenCalled();
            document.querySelector('#observer_root')!.scrollTop = 0;
            fixture.detectChanges();
            testComponent.observe = false;
            fixture.detectChanges();
            done();
        }, 100);
    });
});
