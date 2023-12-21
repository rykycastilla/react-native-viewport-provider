# react-native-viewport-provider
This is an **npm module** compatible with *react-native* projects to provide viewport values ( *vw, vh, vmin, vmax* ) for this platform using *hooks* and a "ViewportProvider" *Component*.

## API
The API offers one component (ViewportProvider), two hooks (useViewport and useDimensions) and one interface (Layout)

### ViewportProvider
``` TSX
import React, { ReactElement } from 'react'
import ViewportProvider from 'react-native-viewport-provider'

const App = (): ReactElement => {
  return (
    <ViewportProvider>
      { /* ... */ }
    </ViewportProvider>
  )
}

export default App
```
As you can see in the last example `ViewportProvider` admits another *Components* as children. Also is extremely necesary to use the library *hooks*<sup>[1]</sup>. `ViewportProvider` have the size of its container and these values (width and height) are used as a reference by the *hooks*<sup>[2]</sup>.

ViewportProvider Component admits an event of type *load*: It is called when the viewport is loaded and the values are ready to use
``` TSX
import React, { ReactElement } from 'react'
import ViewportProvider from 'react-native-viewport-provider'

const App = (): ReactElement => {
  return (
    <ViewportProvider
      onLoad={ () => console.log( 'Now the viewport values are ready to use!' ) }>
      { /* ... */ }
    </ViewportProvider>
  )
}

export default App
```

### useViewport
This hook is used to parse viewport values at style objects. It receives an style object and return a parsed object (with calculated properties) ready to use
``` TSX
import React, { ReactElement } from 'react'
import { View, StyleSheet } from 'react-native'
import ViewportProvider, { useViewport } from 'react-native-viewport-provider'

const MySquare = (): ReactElement => {
  return <View style={ useViewport( styles.mySquare ) } />
}

const App = (): ReactElement => {
  return (
    <ViewportProvider>
      <MySquare />
    </ViewportProvider>
  )
}

const styles = StyleSheet.create( {
  mySquare: {
    width: '25vh' as unknown as number,
    // You can also use arithmetic operations (using spaces to separate members)
    height: '25vh + 5vh' as unknown as number,
    backgroundColor: 'lightblue'
  }
} )

export default App
```
<sup>[3][4]</sup>
![useViewport Example](readme_media/use-viewport_example.png 'useViewport Example')

### useDimensions
Returns an object with the type `Layout`, and its values are according to the provider size.
``` TSX
import React, { ReactElement } from 'react'
import { Text } from 'react-native'
import ViewportProvider, { useDimensions } from 'react-native-viewport-provider'

const Dimensions = (): ReactElement => {
  const { width, height } = useDimensions()
  return <Text>width: { width } ; height: { height }</Text>
}

const App = (): ReactElement => {
  return (
    <ViewportProvider>
      <Dimensions />
    </ViewportProvider>
  )
}

export default App
```
![useDimensions Example](readme_media/use-dimensions_example.png 'useDimensions Example')

### Layout
`Layout` is a TypeScript interface with the following structure
``` typescript
interface Layout {
  width: number,
  height: number,
}
```
It represents viewport dimensions and is returned by ```useDimensions```

## Disclaimer
**react-native-viewport-provider** is a Beta right now, you can find functional and performance issues. It is an experimental project created to resolve incompatibilities with default *react-native* libraries and *ChromeOS* (`useDimensions`). Please, be careful using this for production.

## News [1.1.0]
 - Using React Context API to improve performance and stability
 - Support multiple ViewportProviders
 - Support borders and padding style properties
 - Incluiding array syles
 - Using `useVP` alias (instead of `useViewport`)

> 1. If you try to use a viewport hook (useDimensions or useViewport) out of the Context of a ViewportProvider it will return the following exemption: `Executing hook out of Viewport Provider Context`
> 2. To simulate a real viewport you must use **ViewportProvider** as the *parent component* for all the app content.
> 3. Is recommendable avoid arithmetic operations to increase performance.
> 4. You can use literal pixels, without units ( *vw, vh, vmin, vmax* ).