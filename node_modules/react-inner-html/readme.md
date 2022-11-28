# react-inner-html

A little helper for simpler dangerouslySetInnerHTML using the spread operator.

Before:

```jsx
function MyComponent() {
  return <div dangerouslySetInnerHTML={{ __html: 'my <b>hot</b> html' }} />;
}
```

After:

```jsx
import html from 'react-inner-html';

function MyComponent() {
  return <div {...html('my <b>hot</b> html')} />;
}
```

Or, if you get your html component through a prop, which was the case for me, it gets even simpler:

```jsx
import html from 'react-inner-html';

function MyComponent({ content }) {
  return <div {...html(content)} />;
}
```

Remember:

```
Setting HTML from code is risky because it's easy to inadvertently expose your users to a cross-site scripting (XSS) attack.
```

So, use it carefully.

## Installation:

npm:

```bash
npm i -S react-inner-html
```

yarn:

```bash
yarn add react-inner-html
```