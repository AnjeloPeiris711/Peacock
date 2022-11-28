# useFiglet

A React custom hook for [figlet.js](https://github.com/patorjk/figlet.js)

[![NPM](https://img.shields.io/npm/v/react-hook-figlet.svg)](https://www.npmjs.com/package/react-hook-figlet) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```sh-session
$ # With npm
$ npm install react-hook-figlet

$ # With yarn
$ yarn add react-hook-figlet
```

## Usage

```tsx
import React, { useEffect, useState } from 'react'

import { useFiglet } from 'react-hook-figlet'

export const App: React.VFC = () => {
  const [text, setText] = useState('')
  const [figletText, setSourceText] = useFiglet()

  const handleChange = (e) => {
    setText(e.target.value)
  }

  useEffect(() => {
    setSourceText(text)
  }, [text])

  return (
    <div>
      <textarea name="sourceText" value={text} onChange={handleChange} />
      <pre>{figletText}</pre>
    </div>
  )
}
```

Example app is here [react-hook-figlet/example](./example)

## Reference

### Types

```ts
export type FigletFont = figlet.Fonts
```

Alias of `figlet.Fonts`

### API

```ts
const [figletText, setSourceText, setFigletFont] = useFiglet(initialFont);
```

* `figletText: string`

	* The current ASCII art that created from source text (set in `setSourceText()`) based on the FIGlet font (specified in `setFigletFont()` or `initialFont`).

* `setSourceText: (text: string) => void`

	* Set source text

* `setFigletFont: (text: FigletFont) => void`

	* Set FIGlet font
	* [Font list](https://github.com/patorjk/figlet.js/tree/master/fonts)

* `initialFont: FigletFont`

	* Default FIGlet font

## License

MIT © [gongo](https://github.com/gongo)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
