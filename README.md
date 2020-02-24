# React Cool Portal

🚧 This library is in-progress. Milestone as below:

- [x] Auto creating the container of a portal
- [x] Renders element to the portal container
- [x] Control the visible of a portal
- [x] Visible event callbacks
- [x] support clickOutsideToClose and escToClose
- [ ] Server-side rendering compatibility
- [ ] Unit testing
- [ ] Demo app
- [ ] Demo code
- [ ] Typescript type definition
- [ ] CI/CD
- [ ] Documentation

## 💡 Idea

The following example shows you how to create your own modal component by `react-cool-portal`.

```js
import React from 'react';
import usePortal from 'react-cool-portal';

const App = () => {
  const { Portal, visible, setVisible } = usePortal({
    containerId: 'my-portal-root', // Use your own portal container. If no set, we'll create it for you.
    defaultVisible: false, // Default is true.
    clickOutsideToClose: false, // Default is true.
    escToClose: false, // Default is true.
    onShow: e => {
      // Triggered on show portal.
      // The event object will be: your passed event, MouseEvent, KeyboardEvent.
    },
    onHide: e => {
      // Triggered on show portal.
      // The event object will be: your passed event, MouseEvent, KeyboardEvent.
    }
  });

  const handleOpen = e => {
    // You don't have to set the event parameter
    // unless you want to access it via onShow().
    setVisible(true, e);
  };

  const handleClose = e => {
    // You don't have to set the event parameter
    // unless you want to access it via onHide().
    setVisible(true, e);
  };

  return (
    <div>
      <button class="open-button" onClick={handleOpen}>
        Open Modal
      </button>
      <Portal>
        {/* The "visible" can be used to control CSS transition, animation */}
        <div class={`modal ${visible ? 'fade-in' : 'fade-out'}`} role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Modal title</h5>
                <button class="close-button" onClick={handleClose}>
                  Close Modal
                </button>
              </div>
              <div class="modal-body">
                <p>Modal body text goes here.</p>
              </div>
            </div>
          </div>
        </div>
      </Portal>
    </div>
  );
};
```
