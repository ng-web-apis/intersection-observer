# ![ng-web-apis logo](projects/demo/src/assets/logo.svg) Intersection Observer API for Angular

> Part of <img src="projects/demo/src/assets/web-api.svg" align="top"> [Web APIs for Angular](https://ng-web-apis.github.io/)

[![npm version](https://img.shields.io/npm/v/@ng-web-apis/intersection-observer.svg)](https://npmjs.com/package/@ng-web-apis/intersection-observer)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@ng-web-apis/intersection-observer)](https://bundlephobia.com/result?p=@ng-web-apis/intersection-observer)
[![Travis (.com)](https://img.shields.io/travis/com/ng-web-apis/intersection-observer)](https://travis-ci.com/ng-web-apis/intersection-observer)
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

1. Use `waIntersectionRoot` directive to designate root element
   for observer.
2. Use `waIntersectionObserver` directive to observe an element:

```html
<section waIntersectionRoot>
    <h1 waIntersectionThreshold="0.5" (waIntersectionObserver)="onIntersection($event)">
        I'm being observed
    </h1>
</section>
```

Alternatively you can use `waIntersectionRootSelector` attribute
to pass CSS selector to `waIntersectionObserver` directive to look
for a root element.

Use `waIntersectionThreshold` and `waIntersectionRootMargin` attributes to configure
[IntersectionObserver options](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver)

**NOTE:** Keep in mind these are used one time in constructor so you cannot use
binding, only strings. Pass coma separated numbers to set an array of thresholds.

## Browser support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                                15+                                                                                                |                                                                                                  55+                                                                                                  |                                                                                                51+                                                                                                 |                                                                                               12.2+                                                                                                |

> You can use [polyfill](https://www.npmjs.com/package/intersection-observer) to support older browsers

## Demo

You can [try online demo here](https://ng-web-apis.github.io/intersection-observer)

## See also

Other [Web APIs for Angular](https://ng-web-apis.github.io/) by [@ng-web-apis](https://github.com/ng-web-apis)

## Open-source

Do you also want to open-source something, but hate the collateral work?
Check out this [Angular Open-source Library Starter](https://github.com/TinkoffCreditSystems/angular-open-source-starter)
we’ve created for our projects. It got you covered on continuous integration,
pre-commit checks, linting, versioning + changelog, code coverage and all that jazz.
