/// <reference types="react-scripts" />

// see: https://github.com/patorjk/figlet.js/issues/52#issuecomment-783541121
declare module 'figlet/importable-fonts/*.js' {
  const value: string
  export default value
}
