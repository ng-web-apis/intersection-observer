# ![ng-web-apis logo](projects/demo/src/assets/logo.svg) Intersection Observer API for Angular

> Part of <img src="projects/demo/src/assets/web-api.svg" align="top"> [Web APIs for Angular](https://ng-web-apis.github.io/)

[![npm version](https://img.shields.io/npm/v/@ng-web-apis/intersection-observer.svg)](https://npmjs.com/package/@ng-web-apis/intersection-observer)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@ng-web-apis/intersection-observer)](https://bundlephobia.com/result?p=@ng-web-apis/intersection-observer)
[![.github/workflows/ci.yml](https://github.com/ng-web-apis/intersection-observer/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/ng-web-apis/intersection-observer/actions/workflows/ci.yml)
[![Coveralls github](https://img.shields.io/coveralls/github/ng-web-apis/intersection-observer)](https://coveralls.io/github/ng-web-apis/intersection-observer?branch=master)
[![angular-open-source-starter](https://img.shields.io/badge/made%20with-angular--open--source--starter-d81676?logo=angular)](https://github.com/TinkoffCreditSystems/angular-open-source-starter)

This is a library for declarative use of
[Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
with Angular.

## Install

If you do not have [@ng-web-apis/common](https://github.com/ng-web-apis/common):

```
npm i @ng-web-apis/common
```

Now install the package:

```
npm i @ng-web-apis/intersection-observer
```

## Usage

1. Import `IntersectionObserverModule` for directives to work
2. Create [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) with `waIntersectionObserver` directive
3. Observe elements with `waIntersectionObservee` directive
4. _Optional:_ provide root element with `waIntersectionRoot` directive and
   use `waIntersectionThreshold` and `waIntersectionRootMargin` attributes to configure
   [IntersectionObserver options](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver)

    > **NOTE:** Keep in mind these are used one time in constructor so you cannot use binding, only strings. Pass comma separated numbers to set an array of thresholds.

### Usage with Jest

DOM environment provided by Jest does not emulate IntersectionObserver API and need to be mocked. You can add the following line to your `setup.ts`:

```ts
// setup.ts
import '@ng-web-apis/universal/mocks';
```

to use mocks from [@ng-web-apis/universal](https://github.com/ng-web-apis/universal) package.

## Examples

Observing multiple elements intersecting with viewport using single observer

```html
<section waIntersectionObserver waIntersectionThreshold="0.5">
    <div (waIntersectionObservee)="onIntersection($event)">
        I'm being observed
    </div>
    <div (waIntersectionObservee)="onIntersection($event)">
        I'm being observed
    </div>
</section>
```

Observing elements intersecting with parent element,
each having different configuration therefore using individual observers:

```html
<section waIntersectionRoot>
    <div
        waIntersectionObserver
        waIntersectionThreshold="0.5"
        (waIntersectionObservee)="onIntersection($event)"
    >
        I'm being observed
    </div>
    <div
        waIntersectionObserver
        waIntersectionThreshold="1,0.5,0"
        (waIntersectionObservee)="onIntersection($event)"
    >
        I'm being observed
    </div>
</section>
```

## Services

Alternatively you can use `Observable`-based services:

1. `IntersectionObserveeService` can be used to observe elements under `waIntersectionObserver`
   directive in the DI tree

2. `IntersectionObserverService` can be used to observe single element independently.
   Provide tokens manually to configure it:

```typescript
@Component({
    selector: 'my-component',
    providers: [
        IntersectionObserverService,
        {
            provide: INTERSECTION_THRESHOLD,
            useValue: 0.5,
        },
        {
            provide: INTERSECTION_ROOT_MARGIN,
            useValue: '10px',
        },
    ],
})
export class MyComponent {
    constructor(
        @Inject(IntersectionObserverService) entries$: IntersectionObserverService,
    ) {
        entries$.subscribe(entries => {
            // Don't forget to unsubscribe
            console.log(entries);
        });
    }
}
```

> In this case provide `INTERSECTION_ROOT` up the DI tree if you
> want to observe intersection with a particular parent element

## Browser support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                                15+                                                                                                |                                                                                                  55+                                                                                                  |                                                                                                51+                                                                                                 |                                                                                               12.2+                                                                                                |

> You can use [polyfill](https://www.npmjs.com/package/intersection-observer) to support older browsers

## Angular Universal

If you want to use this package with SSR, you need to mock `IntersectionObserver` class on the server.
You can use our Universal package for this, see [this example](https://github.com/ng-web-apis/universal#mocks).

## Demo

You can [try online demo here](https://ng-web-apis.github.io/intersection-observer)

## See also

Other [Web APIs for Angular](https://ng-web-apis.github.io/) by [@ng-web-apis](https://github.com/ng-web-apis)

## Open-source

Do you also want to open-source something, but hate the collateral work?
Check out this [Angular Open-source Library Starter](https://github.com/TinkoffCreditSystems/angular-open-source-starter)
we’ve created for our projects. It got you covered on continuous integration,
pre-commit checks, linting, versioning + changelog, code coverage and all that jazz.
