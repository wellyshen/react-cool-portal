# React Cool Portal

🚧 This library is in-progress. Milestone as below:

- [x] Auto creating the container of the portal
- [x] Renders element to the portal container
- [x] Show/hide/toggle the portal
- [x] onShow/onHide event callbacks
- [x] Support clickOutsideToHide and escToHide interactions
- [ ] Server-side rendering compatibility
- [ ] Unit testing
- [ ] Demo app
- [ ] Demo code
- [x] Typescript type definition
- [ ] CI/CD
- [ ] Documentation

## 💡 My Idea

The following example shows you how to create your own modal component by `react-cool-portal`.

```js
import React from 'react';
import usePortal from 'react-cool-portal';

const App = () => {
  const { Portal, isShow, show, hide, toggle } = usePortal({
    containerId: 'my-portal-root', // Use your own portal container. If no set, we'll create it for you.
    defaultIsShow: false, // Default is true.
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
