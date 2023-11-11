import { LayoutChangeEvent, StyleSheet, View } from 'react-native'
import React, { Dispatch, ReactElement, SetStateAction, useMemo, useState } from 'react'
import ViewportContext, { initValue, Layout } from '../viewport_context'
import ViewportLoadEvent from '../classes/ViewportLoadEvent'

type DimensionsSetter = Dispatch<SetStateAction<Layout>>

function onLayout( event:LayoutChangeEvent, setDimensions:DimensionsSetter, loadEvent:ViewportLoadEvent ) {
  const { width, height } = event.nativeEvent.layout
  const layout: Layout = { width, height }
  setDimensions( layout )
  loadEvent.trigger()
}

interface ViewportProviderProps {
  children?: ReactElement | ReactElement[],
  onLoad?: () => void,
}

const ViewportProvider = ( props:ViewportProviderProps ): ReactElement => {
  const { children, onLoad } = props
  const [ dimensions, setDimensions ] = useState( initValue )
  const loadEvent: ViewportLoadEvent = useMemo( () => {
    return new ViewportLoadEvent( onLoad )
  }, [] )
  return (
    <ViewportContext.Provider value={ dimensions }>
      <View
        style={ styles.provider }
        onLayout={ ( event:LayoutChangeEvent ) => { onLayout( event, setDimensions, loadEvent ) } }>
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