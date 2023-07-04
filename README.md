# react-native-viewport-provider
This is an **npm module** compatible with *react-native* projects to provide viewport values ( *vw, vh, vmin, vmax* ) for this platform using *hooks* and a "ViewportProvider" *Component*.

## API
The API offers one component (ViewportProvider) and two hooks (useViewport and useDimensions)

### ViewportProvider
``` TSX
import React, { ReactElement } from 'react'
import ViewportProvider from 'react-native-viewport-provider'

function App(): ReactElement {
  return (
    <ViewportProvider>
      { /* ... */ }
    </ViewportProvider>
  )
}

export default App
```
As you can see in the last example ```ViewportProvider``` admits another *Components* as children. Also it is extremely necesary to use the library *hooks*<sup>[1]</sup>. ```ViewportProvider``` have the size of its container and these values (width and height) are used as a reference by the *hooks*<sup>[2]</sup>.
You can only have one, use more will return an *exception*:

`Unexpected ViewportProvider: There can only be one ViewportProvider`

### useViewport
This hook is used to parse viewport values at style objects. It receives an style object and return a parsed object (with calculated properties) ready to use
``` TSX
import React, { ReactElement } from 'react'
import { View, StyleSheet } from 'react-native'
import ViewportProvider, { useViewport } from 'react-native-viewport-provider'

const styles = StyleSheet.create( {
  mySquare: {
    width: '25vh',
    // you can also use arithmetic operations (using spaces to separate members)
    height: '25vh + 5vh',
    backgroundColor: 'lightblue'
  }
} )

function MySquare(): ReactElement {
  return <View style={ useViewport( styles.mySquare ) } />
}

function App(): ReactElement {
  return (
    <ViewportProvider>
      <MySquare />
    </ViewportProvider>
  )
}

export default App
```
<sup>[3][4]</sup>
![useViewport Example](readme_media/use-viewport_example.png 'useViewport Example')

### useDimensions
Return an object with the following structure: `{ width:number, height:number }`, and these values are according to the provider size.
``` TSX
import React, { ReactElement } from 'react'
import { Text } from 'react-native'
import ViewportProvider, { useDimensions } from 'react-native-viewport-provider'

function App(): ReactElement {
  const { width, height } = useDimensions()
  return (
    <ViewportProvider>
      <Text>width: { width } ; height: { height }</Text>
    </ViewportProvider>
  )
}

export default App
```
<sup>[5]</sup>
![useDimensions Example](readme_media/use-dimensions_example.png 'useDimensions Example')

## Disclaimer
**react-native-viewport-provider** is a Beta right now, you can find functional and performance issues. It is an experimental project created to resolve incompatibilities with default *react-native* libraries and *ChromeOS* (`useDimensions`). Please, be careful using this for production.

It was tested using:
 - typescript: 4.9.4
 - react: 18.2.0
 - @types/react: 18.0.14
 - react-native: 0.71.8
 - @types/react-native: 0.72.2
 - expo: 48.0.18
 - react-dom: 18.2.0
 - react-native-web: 0.18.11

> 1. If **ViewportProvider** is not detected (yet) the default numeric values will be `0`
> 2. To simulate a real viewport you must use **ViewportProvider** as the *parent component* for all the app content.
> 3. Is recommendable avoid arithmetic operations to increase performance.
> 4. You can use literal pixels, without units ( *vw, vh, vmin, vmax* ).
> 5. Hooks can be used out of the provider context.