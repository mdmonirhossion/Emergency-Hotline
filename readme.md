1. Difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll:
getElementById returns a single element by its ID, while getElementsByClassName returns a list of elements with that class.
querySelector returns the first element that matches a CSS selector, whereas querySelectorAll gives a static list of all elements that match the selector.
2. How to create and insert a new element into the DOM:
First, create an element using createElement, then add content or attributes, and finally insert it into the DOM using methods like appendChild.
3. Event Bubbling and how it works:
An event starts at the target element and then propagates upward through its parent elements in the DOM tree.
4. Event Delegation and why it’s useful:
Event delegation is when you keep an event listener on a parent element to handle events for its children. This is useful for better performance and for handling dynamically created elements.
5. Difference between preventDefault() and stopPropagation():
preventDefault() stops the browser’s default action, while stopPropagation() stops the event from bubbling up to parent elements.