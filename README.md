> ⚠️ This library is in-progress, API might changed rapidly. I don't recommend to use it now. If you'd like to give it a try, please follow the [release note](https://github.com/wellyshen/react-cool-portal/releases) for any change. Here's the [milestone](#milestone).

# React Cool Portal

This is a React [hook](https://reactjs.org/docs/hooks-custom.html#using-a-custom-hook) for [Portals](https://reactjs.org/docs/portals.html). It helps you render an element outside of its component hierarchy. From now on you will never need to struggle with modals, dropdowns, tooltips etc. Hope you guys 👍🏻 it.

❤️ it? ⭐️ it on [GitHub](https://github.com/wellyshen/react-cool-portal/stargazers) or [Tweet](https://twitter.com/intent/tweet?text=With%20@react-cool-portal,%20I%20can%20build%20modals,%20dropdowns,%20tooltips%20etc.%20without%20struggle!%20Thanks,%20@Welly%20Shen%20🤩) about it.

[![build status](https://img.shields.io/travis/wellyshen/react-cool-portal/master?style=flat-square)](https://travis-ci.org/wellyshen/react-cool-portal)
[![coverage status](https://img.shields.io/coveralls/github/wellyshen/react-cool-portal?style=flat-square)](https://coveralls.io/github/wellyshen/react-cool-portal?branch=master)
[![npm version](https://img.shields.io/npm/v/react-cool-portal?style=flat-square)](https://www.npmjs.com/package/react-cool-portal)
[![npm downloads](https://img.shields.io/npm/dm/react-cool-portal?style=flat-square)](https://www.npmtrends.com/react-cool-portal)
[![npm downloads](https://img.shields.io/npm/dt/react-cool-portal?style=flat-square)](https://www.npmtrends.com/react-cool-portal)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-cool-portal?style=flat-square)](https://bundlephobia.com/result?p=react-cool-portal)
[![MIT licensed](https://img.shields.io/github/license/wellyshen/react-cool-portal?style=flat-square)](https://raw.githubusercontent.com/wellyshen/react-cool-portal/master/LICENSE)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange?style=flat-square)](#contributors-)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](https://github.com/wellyshen/react-cool-portal/blob/master/CONTRIBUTING.md)
[![Twitter URL](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Fwellyshen%2Freact-cool-portal)](https://twitter.com/intent/tweet?text=With%20@react-cool-portal,%20I%20can%20build%20modals,%20dropdowns,%20tooltips%20etc.%20without%20struggle!%20Thanks,%20@Welly%20Shen%20🤩)

![portal_modal](https://user-images.githubusercontent.com/21308003/76686161-6ff78580-6654-11ea-916b-117c85862711.gif)

⚡️ Try yourself: https://react-cool-portal.netlify.com

## Milestone

- [x] Auto creating/removing the container of the portal
- [x] Renders element to the portal container
- [x] Show/hide/toggle the portal
- [x] onShow/onHide event callbacks
- [x] Support clickOutsideToHide and escToHide interactions
- [x] Server-side rendering compatibility
- [ ] Unit testing
- [x] Demo app
- [ ] Demo code
- [x] Typescript type definition
- [x] CI/CD
- [ ] Documentation

## Requirement

To use `react-cool-portal`, you must use `react@16.8.0` or greater which includes hooks.

## Installation

This package is distributed via [npm](https://www.npmjs.com/package/react-cool-portal).

```sh
$ yarn add react-cool-portal
# or
$ npm install --save react-cool-portal
```

## Usage

### Basic Use Case

Inserts an element or component into the a different location in the DOM.

```js
import React from 'react';
import usePortal from 'react-cool-portal';

const App = () => {
  const { Portal } = usePortal();

  return (
    <div>
      <Portal>
        <div>
          Wow! I am rendered outside the DOM hierarchy of my parent component.
        </div>
      </Portal>
    </div>
  );
};
```

By default, the children of the `Portal` is rendered into `<div id="react-cool-portal">` of `<body>`. You can use your own container element by the `containerId` option.

```js
import React from 'react';
import usePortal from 'react-cool-portal';

const App = () => {
  const { Portal } = usePortal({ containerId: 'my-portal-root' });

  return (
    <div>
      <Portal>
        <div>Now I am rendered into the "my-portal-root" element.</div>
      </Portal>
    </div>
  );
};
```

> Note: If the container element doesn't exist, we will create it for you.

### Use with State

`react-cool-portal` provides many useful features, which enable you to build a component with state like modal, dropdown, tooltip and so on.

```js
import React from 'react';
import usePortal from 'react-cool-portal';

const App = () => {
  const { Portal, isShow, show, hide, toggle } = usePortal({
    containerId: 'my-portal-root',
    defaultShow: false, // Default is true.
    clickOutsideToHide: true, // Default is true.
    escToHide: true, // Default is true.
    onShow: e => {
      // Triggered on show portal.
      // The event object will be MouseEvent, KeyboardEvent, Your custom event. Depends on your interaction.
    },
    onHide: e => {
      // Triggered on hide portal.
      // The event object will be MouseEvent, KeyboardEvent, Your custom event. Depends on your interaction.
    }
  });

  return (
    <div>
      <button onClick={show}>Open Modal</button>
      <button onClick={hide}>Close Modal</button>
      <button onClick={toggle}>{isShow ? 'Close' : 'Open'} Modal</button>
      <Portal>
        <div class="modal-backdrop" tabIndex={-1}>
          <div
            class="modal"
            role="dialog"
            aria-labelledby="modal-label"
            aria-modal="true"
          >
            <div class="modal-header">
              <h5 id="modal-label" class="modal-title">
                Modal title
              </h5>
            </div>
            <div class="modal-body">
              <p>Modal body text goes here.</p>
            </div>
          </div>
        </div>
      </Portal>
    </div>
  );
};
```

> 🧹 When no element in the container, we will remove it for you to avoid DOM mess.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://wellyshen.com"><img src="https://avatars1.githubusercontent.com/u/21308003?v=4" width="100px;" alt=""/><br /><sub><b>Welly</b></sub></a><br /><a href="https://github.com/wellyshen/react-cool-portal/commits?author=wellyshen" title="Code">💻</a> <a href="https://github.com/wellyshen/react-cool-portal/commits?author=wellyshen" title="Documentation">📖</a> <a href="#maintenance-wellyshen" title="Maintenance">🚧</a></td>
  </tr>
</table>
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
