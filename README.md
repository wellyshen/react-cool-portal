# <em><b>REACT COOL PORTAL</b></em>

This is a React [hook](https://reactjs.org/docs/hooks-custom.html#using-a-custom-hook) for [Portals](https://reactjs.org/docs/portals.html). It helps you render children into a DOM node that exists outside the DOM hierarchy of the parent component. From now on you will never need to struggle with modals, dropdowns, tooltips etc. Check the [features](#features) section out to learn more. Hope you guys 👍🏻 it.

❤️ it? ⭐️ it on [GitHub](https://github.com/wellyshen/react-cool-portal/stargazers) or [Tweet](https://twitter.com/intent/tweet?text=With%20@react-cool-portal,%20I%20can%20build%20modals,%20dropdowns,%20tooltips%20etc.%20without%20struggle!%20Thanks,%20@Welly%20Shen%20🤩) about it.

[![build status](https://img.shields.io/github/workflow/status/wellyshen/react-cool-portal/CI?style=flat-square)](https://github.com/wellyshen/react-cool-portal/actions?query=workflow%3ACI)
[![coverage status](https://img.shields.io/coveralls/github/wellyshen/react-cool-portal?style=flat-square)](https://coveralls.io/github/wellyshen/react-cool-portal?branch=master)
[![npm version](https://img.shields.io/npm/v/react-cool-portal?style=flat-square)](https://www.npmjs.com/package/react-cool-portal)
[![npm downloads](https://img.shields.io/npm/dm/react-cool-portal?style=flat-square)](https://www.npmtrends.com/react-cool-portal)
[![npm downloads](https://img.shields.io/npm/dt/react-cool-portal?style=flat-square)](https://www.npmtrends.com/react-cool-portal)
[![gzip size](https://badgen.net/bundlephobia/minzip/react-cool-portal?label=gzip%20size&style=flat-square)](https://bundlephobia.com/result?p=react-cool-portal)
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange?style=flat-square)](#contributors-)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)
[![Twitter URL](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Fwellyshen%2Freact-cool-portal)](https://twitter.com/intent/tweet?text=With%20@react-cool-portal,%20I%20can%20build%20modals,%20dropdowns,%20tooltips%20etc.%20without%20struggle!%20Thanks,%20@Welly%20Shen%20🤩)

## Live Demo

![demo](https://user-images.githubusercontent.com/21308003/91049364-b1eb1580-e64f-11ea-9776-4668551db40d.gif)

⚡️ Try yourself: https://react-cool-portal.netlify.app

## Features

- 🍒 Renders an element or component to `<body>` or [a specified DOM element](#basic-use-case).
- 🎣 React [Portals](https://reactjs.org/docs/portals.html) feat. [Hook](https://reactjs.org/docs/hooks-custom.html#using-a-custom-hook).
- 🤖 Built-in [state controllers](#use-with-state), event listeners and many [useful features](#api) for a comprehensive DX.
- 🧱 Used as a scaffold to [build your customized hook](#build-your-customized-hook).
- 🧹 Auto removes the un-used portal container for you. Doesn't produce any DOM mess.
- 📜 Supports [TypeScript](https://www.typescriptlang.org) type definition.
- 🗄️ Server-side rendering compatibility.
- 🦔 Tiny size ([~ 1KB gzipped](https://bundlephobia.com/result?p=react-cool-portal)). No external dependencies, aside for the `react` and `react-dom`.

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

Here are some minimal examples of how does it work. You can learn more about it by checking the [API](#api) out.

### Basic Use Case

Inserts an element or component into a different location in the DOM.

```js
import usePortal from "react-cool-portal";

const App = () => {
  const { Portal } = usePortal();

  return (
    <div>
      <Portal>
        <p>
          Wow! I am rendered outside the DOM hierarchy of my parent component.
        </p>
      </Portal>
    </div>
  );
};
```

By default, the children of portal is rendered into `<div id="react-cool-portal">` of `<body>`. You can specify the DOM element you want through the `containerId` option.

```js
import usePortal from "react-cool-portal";

const App = () => {
  const { Portal } = usePortal({ containerId: "my-portal-root" });

  return (
    <div>
      <Portal>
        <p>Now I am rendered into the specify element (id="my-portal-root").</p>
      </Portal>
    </div>
  );
};
```

> Note: If the container element doesn't exist, we will create it for you.

### Use with State

`react-cool-portal` provides many useful features, which enable you to build a component with state. For instance, modal, dropdown, tooltip, and so on.

[![Edit usePortal](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/useportal-v8voh?fontsize=14&hidenavigation=1&theme=dark)

```js
import usePortal from "react-cool-portal";

const App = () => {
  const { Portal, isShow, show, hide, toggle } = usePortal({
    defaultShow: false, // The default visibility of portal, default is true
    onShow: (e) => {
      // Triggered when portal is shown
      // The event object will be the parameter of `show(e?)`
    },
    onHide: (e) => {
      // Triggered when portal is hidden
      // The event object will be the parameter of `hide(e?)`, it maybe MouseEvent (on clicks outside) or KeyboardEvent (press ESC key)
    },
  });

  return (
    <div>
      <button onClick={show}>Open Modal</button>
      <button onClick={hide}>Close Modal</button>
      <button onClick={toggle}>{isShow ? "Close" : "Open"} Modal</button>
      <Portal>
        <div className="modal" tabIndex={-1}>
          <div
            className="modal-dialog"
            role="dialog"
            aria-labelledby="modal-label"
            aria-modal="true"
          >
            <div className="modal-header">
              <h5 id="modal-label" className="modal-title">
                Modal title
              </h5>
            </div>
            <div className="modal-body">
              <p>Modal body text goes here.</p>
            </div>
          </div>
        </div>
      </Portal>
    </div>
  );
};
```

> 🧹 When no element in the container, we will remove it for you to avoid DOM mess. However, the feature can be turn off via the [autoRemoveContainer](#parameter-object-optional) option.

The above example shows how easy you can handle the visibility of your component. You may ask how to handle the visibility with animations? No worries, you can disable the built-in `show/hide` functions by setting the `internalShowHide` option to `false` then handling the visibility of your component via the `isShow` state.

[![Edit usePortal with Animation](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/useportal-with-animation-eorc2?fontsize=14&hidenavigation=1&theme=dark)

```js
import usePortal from "react-cool-portal";

const App = () => {
  const { Portal, isShow, show, hide, toggle } = usePortal({
    defaultShow: false,
    internalShowHide: false, // Disable the built-in show/hide portal functions, default is true
    onShow: (e) => {
      // Triggered when `isShow` is set to true
    },
    onHide: (e) => {
      // Triggered when `isShow` is set to false
    },
  });

  return (
    <div>
      <button onClick={show}>Open Modal</button>
      <button onClick={hide}>Close Modal</button>
      <button onClick={toggle}>{isShow ? "Close" : "Open"} Modal</button>
      <Portal>
        <div
          // Now you can use the `isShow` state to handle the CSS animations
          className={`modal${isShow ? " modal-open" : ""}`}
          tabIndex={-1}
        >
          <div
            className="modal-dialog"
            role="dialog"
            aria-labelledby="modal-label"
            aria-modal="true"
          >
            <div className="modal-header">
              <h5 id="modal-label" className="modal-title">
                Modal title
              </h5>
            </div>
            <div className="modal-body">
              <p>Modal body text goes here.</p>
            </div>
          </div>
        </div>
      </Portal>
    </div>
  );
};
```

Besides that, you can also handle the visibility of your component via React [animation events](https://reactjs.org/docs/events.html#animation-events) or [transition events](https://reactjs.org/docs/events.html#transition-events) like [what I did](demo/App/index.tsx) for the [demo app](#live-demo).

### Build Your Customized Hook

Are you tired to write the same code over and over again? It's time to build your own hook based on `react-cool-portal` then use it wherever you want.

```js
import { useCallback } from "react";
import usePortal from "react-cool-portal";

// Customize your hook based on react-cool-portal
const useModal = (options = {}) => {
  const { Portal, isShow, ...rest } = usePortal({
    ...options,
    defaultShow: false,
    internalShowHide: false,
  });

  const Modal = useCallback(
    ({ children }) => (
      <Portal>
        <div className={`modal${isShow ? " modal-open" : ""}`} tabIndex={-1}>
          {children}
        </div>
      </Portal>
    ),
    [isShow]
  );

  return { Modal, isShow, ...rest };
};

// Use it wherever you want
const App = () => {
  const { Modal, show, hide } = useModal();

  return (
    <div>
      <button onClick={show}>Open Modal</button>
      <button onClick={hide}>Close Modal</button>
      <Modal>
        <div
          className="modal-dialog"
          role="dialog"
          aria-labelledby="modal-label"
          aria-modal="true"
        >
          <div className="modal-header">
            <h5 id="modal-label" className="modal-title">
              Modal title
            </h5>
          </div>
          <div className="modal-body">
            <p>Modal body text goes here.</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
```

One problem of the above example is that CSS transition/animation will be cut off due to the re-creating of the `Portal` component. So if you want to apply transitions or animations to the wrapped element of the customized hook. The `isShow` need to be passed from the props.

[![Edit usePortal - custom](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/useportal-custom-clnqz?fontsize=14&hidenavigation=1&theme=dark)

```js
const useModal = (options = {}) => {
  const { Portal, ...rest } = usePortal({
    ...options,
    defaultShow: false,
    internalShowHide: false,
  });

  const Modal = useCallback(
    // Pass the `isShow` from props to prevent CSS transition/animation to be cut off
    ({ isShow, children }) => (
      <Portal>
        <div className={`modal${isShow ? " modal-open" : ""}`} tabIndex={-1}>
          {children}
        </div>
      </Portal>
    ),
    []
  );

  return { Modal, ...rest };
};
```

## Conditionally ESC or Click Outside to Hide

**ESC or click outside to hide** is an out-of-box feature of `react-cool-portal`. However, you can conditionally hide the portal based on the presence or absence of an element. Here we take a nested modal as the example:

```js
import usePortal from "react-cool-portal";

const App = () => {
  const [showChildModal, setShowChildModal] = useState(false);
  const { Portal: ChildModal, show } = usePortal({ defaultShow: false });
  const { Portal: ParentModal } = usePortal({
    // Provide the class name of the child modal, so the parent modal will only be hidden when the child modal is hidden
    escToHide: ["child-modal"],
    // The same as `escToHide`
    clickOutsideToHide: ["child-modal"],
  });

  return (
    <div>
      <ParentModal>
        <div>
          <p>I'm parent modal.</p>
          <button onClick={show}>Open Child Modal</button>
          <ChildModal>
            <div className="child-modal">
              <p>I'm child modal.</p>
            </div>
          </ChildModal>
        </div>
      </ParentModal>
    </div>
  );
};
```

## API

```js
const returnObj = usePortal(parameterObj);
```

### Return object

It's returned with the following properties.

| Key    | Type      | Default | Description                                                                                     |
| ------ | --------- | ------- | ----------------------------------------------------------------------------------------------- |
| Portal | component |         | Renders children into a DOM node that exists outside the DOM hierarchy of the parent component. |
| isShow | boolean   | `false` | The show/hide state of portal.                                                                  |
| show   | function  |         | To show the portal or set the `isShow` to `true`.                                               |
| hide   | function  |         | To hide the portal or set the `isShow` to `false`.                                              |
| toggle | function  |         | To toggle (show/hide) the portal or set the `isShow` to `true/false`.                           |

### Parameter object (optional)

When use `react-cool-portal` you can configure the following options via the parameter.

| Key                 | Type             | Default             | Description                                                                                                                              |
| ------------------- | ---------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| containerId         | string           | `react-cool-portal` | You can specify your own container id from an existing DOM element or let this hook automatically creates it for you.                    |
| autoRemoveContainer | boolean          | `true`              | Enable/disable the built-in automatically remove container function.                                                                     |
| defaultShow         | boolean          | `true`              | The initial show/hide state of the portal.                                                                                               |
| clickOutsideToHide  | boolean \| array | `true`              | Hide the portal by clicking outside of it. For conditionally hide please see the [example](#conditionally-esc-or-click-outside-to-hide). |
| escToHide           | boolean \| array | `true`              | Hide the portal by pressing ESC key. For conditionally hide please see the [example](#conditionally-esc-or-click-outside-to-hide).       |
| internalShowHide    | boolean          | `true`              | Enable/disable the built-in `show/hide` portal functions, which gives you a flexible way to handle your portal.                          |
| onShow              | function         |                     | Triggered when portal is shown or the `isShow` set to `true`.                                                                            |
| onHide              | function         |                     | Triggered when portal is hidden or the `isShow` set to `false`.                                                                          |

## Articles / Blog Posts

> 💡 If you have written any blog post or article about `react-cool-portal`, please open a PR to add it here.

- Featured on [React Newsletter #206](https://reactnewsletter.com/issues/206).

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://wellyshen.com"><img src="https://avatars1.githubusercontent.com/u/21308003?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Welly</b></sub></a><br /><a href="https://github.com/wellyshen/react-cool-portal/commits?author=wellyshen" title="Code">💻</a> <a href="https://github.com/wellyshen/react-cool-portal/commits?author=wellyshen" title="Documentation">📖</a> <a href="#maintenance-wellyshen" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/hinok"><img src="https://avatars2.githubusercontent.com/u/1313605?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dawid Karabin</b></sub></a><br /><a href="https://github.com/wellyshen/react-cool-portal/commits?author=hinok" title="Documentation">📖</a></td>
    <td align="center"><a href="http://janstepanovsky.cz"><img src="https://avatars.githubusercontent.com/u/854103?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Honza Stepanovsky</b></sub></a><br /><a href="https://github.com/wellyshen/react-cool-portal/issues?q=author%3Ahhhonzik" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
