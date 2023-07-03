import { LayoutChangeEvent, StyleSheet, View } from 'react-native'
import React, { ReactElement, useEffect } from 'react'
import viewport from '../viewport'

const styles = StyleSheet.create( {
  provider: {
    width: '100%',
    height: '100%',
  }
} )

type ReactElements = ReactElement | ReactElement[]

function onLayout( event:LayoutChangeEvent ) {
  const { width, height } = event.nativeEvent.layout
  viewport.resize( { width: width, height: height } )
}

function avoidRender() {
  throw 'Unexpected ViewportProvider: Developer just can set one ViewportProvider. Please Fix it and reload the app'
}

let init = false

interface ViewportProviderProps { children?:ReactElements }

function ViewportProvider( props:ViewportProviderProps ): ReactElement {
  useEffect( () => {
    if( init ) { avoidRender() }
    init = true
  }, [] )
  const { children } = props
  return (
    <View
    onLayout={ ( event:LayoutChangeEvent ) => onLayout( event ) }
    style={ styles.provider }>
    { children }
    </View>
  )
}

export default ViewportProvider