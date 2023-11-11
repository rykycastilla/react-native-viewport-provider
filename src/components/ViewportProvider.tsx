import { LayoutChangeEvent, StyleSheet, View } from 'react-native'
import React, { ReactElement, useState } from 'react'
import ViewportContext, { initValue, Layout } from '../viewport_context'

function onLayout( event:LayoutChangeEvent, setDimensions:React.Dispatch<React.SetStateAction<{width:number,height:number}>> ) {
  const { width, height } = event.nativeEvent.layout
  const layout: Layout = { width, height }
  setDimensions( layout )
}

type ReactElements = ReactElement | ReactElement[]

interface ViewportProviderProps { children?:ReactElements }

const ViewportProvider = ( props:ViewportProviderProps ): ReactElement => {
  const { children } = props
  const [ dimensions, setDimensions ] = useState( initValue )
  return (
    <ViewportContext.Provider value={ dimensions }>
      <View
        onLayout={ ( event:LayoutChangeEvent ) => onLayout( event, setDimensions ) }
        style={ styles.provider }>
        { children }
      </View>
    </ViewportContext.Provider>
  )
}

const styles = StyleSheet.create( {
  provider: {
    width: '100%',
    height: '100%',
  }
} )

export default ViewportProvider
export { ViewportContext }