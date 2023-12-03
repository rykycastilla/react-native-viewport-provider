import HookType from '../../enums/HookType'
import noViewportTemplate from '../../scripts/no_viewport_template'
import parseStyleList from './parse_style_list'
import ViewportContext, { Layout } from '../../viewport_context'
import { useContext, useMemo } from 'react'

type ObjectNoArray = object & { length?:never }

// Overloads
function useViewport( style:object[] ): object[]
function useViewport( style:ObjectNoArray ): object

// React Hook: Accepts arrays and single objects to parse style
function useViewport( style:unknown ): object | object[] {
  // Getting layout data
  const layout: Layout | null = useContext( ViewportContext )
  if( layout === null ) {  // Avoiding "out of viewport context"
    noViewportTemplate( HookType.VIEWPORT )
  }
  // Making array of single item
  const isArray: boolean = Array.isArray( style )
  const styleList = isArray
    ? style as object[]
    : [ style ] as object[]
  // Parsing styles
  const result: object[] = useMemo( () => {
    return parseStyleList( styleList, layout )
  }, [ layout, ...styleList ] )
  // Desestructuring array of single item
  if( isArray ) { return result }
  const [ parsedStyle ] = result
  return parsedStyle
}

export default useViewport