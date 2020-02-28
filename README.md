# React Cool Portal

This is a React [hook](https://reactjs.org/docs/hooks-custom.html#using-a-custom-hook) for [Portals](https://reactjs.org/docs/portals.html). It helps you handle modals, dropdowns, tooltips etc. without struggle. Hope you guys 👍🏻 it.

[![build status](https://img.shields.io/travis/wellyshen/react-cool-portal/master?style=flat-square)](https://travis-ci.org/wellyshen/react-cool-portal)

<!-- [![coverage status](https://img.shields.io/coveralls/github/wellyshen/react-cool-portal?style=flat-square)](https://coveralls.io/github/wellyshen/react-cool-portal?branch=master) -->

[![npm version](https://img.shields.io/npm/v/react-cool-portal?style=flat-square)](https://www.npmjs.com/package/react-cool-portal)
[![npm downloads](https://img.shields.io/npm/dm/react-cool-portal?style=flat-square)](https://www.npmtrends.com/react-cool-portal)
[![npm downloads](https://img.shields.io/npm/dt/react-cool-portal?style=flat-square)](https://www.npmtrends.com/react-cool-portal)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-cool-portal?style=flat-square)](https://bundlephobia.com/result?p=react-cool-portal)
[![MIT licensed](https://img.shields.io/github/license/wellyshen/react-cool-portal?style=flat-square)](https://raw.githubusercontent.com/wellyshen/react-cool-portal/master/LICENSE)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange?style=flat-square)](#contributors-)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](https://github.com/wellyshen/react-cool-portal/blob/master/CONTRIBUTING.md)
[![Twitter URL](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Fwellyshen%2Freact-cool-portal)](https://twitter.com/intent/tweet?text=With%20@react-cool-portal,%20I%20can%20build%20modals,%20dropdowns,%20tooltips%20etc.%20without%20struggle!%20Thanks,%20@Welly%20Shen%20🤩)

![portal](https://user-images.githubusercontent.com/21308003/75577457-f6c93180-5a9c-11ea-94a7-6718bcf92fbf.gif)

⚡️ Try yourself: https://react-cool-portal.netlify.com

## 🚧 This library is in-progress. Milestone as below:

- [x] Auto creating/removing the container of the portal
- [x] Renders element to the portal container
- [x] Show/hide/toggle the portal
- [x] onShow/onHide event callbacks
- [x] Support clickOutsideToHide and escToHide interactions
- [ ] Server-side rendering compatibility
- [ ] Unit testing
- [x] Demo app
- [ ] Demo code
- [x] Typescript type definition
- [x] CI/CD
- [ ] Documentation

## 💡 My Idea

The following example shows you how to create your own modal component by `react-cool-portal`.

```js
import React from 'react';
import usePortal from 'react-cool-portal';

const App = () => {
  const { Portal, isShow, show, hide, toggle } = usePortal({
    containerId: 'my-portal-root', // Use your own portal container. If no set, we'll create it for you.
    defaultShow: false, // Default is true.
    clickOutsideToHide: true, // Default is true.
    escToHide: true, // Default is true.
    onShow: e => {
      // Triggered on show portal.
      // The event object will be: MouseEvent, KeyboardEvent, Your custom event.
    },
    onHide: e => {
      // Triggered on show portal.
      // The event object will be: MouseEvent, KeyboardEvent, Your custom event.
    }
  });

  return (
    <div>
      <button onClick={show}>Open Modal</button>
      <button onClick={hide}>Close Modal</button>
      <button onClick={toggle}>Toggle Modal</button>
      <Portal>
        {/* The "isShow" can be used to control CSS transition, animation */}
        <div class={`modal ${isShow ? 'fade-in' : 'fade-out'}`} role="dialog">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
          </div>
          <div class="modal-body">
            <p>Modal body text goes here.</p>
          </div>
        </div>
      </Portal>
    </div>
  );
};
```

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
