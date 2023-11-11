import HookType from '../enums/HookType'
import noProvider from '../scripts/no_viewport_template'
import { useContext } from 'react'
import ViewportContext, { Layout } from '../viewport_context'

// React Hook: Return width and height of ViewportProvider
function useDimensions(): Layout {
  const protectedDimensions: Layout | null = useContext( ViewportContext )
  if( protectedDimensions === null ) {  // Avoiding "out of viewport context"
    noProvider( HookType.DIMENSIONS )
  }
  // Cloning to avoid editing global data
  const dimensions = Object.assign( {}, protectedDimensions )
  return dimensions
}

export default useDimensions