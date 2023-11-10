import { useContext } from 'react'
import ViewportContext, { Layout } from '../viewport_context'

// React Hook: Return width and height of ViewportProvider
function useDimensions(): Layout {
  const protectedDimensions = useContext( ViewportContext )
  // Cloning to avoid editing global data
  const dimensions = Object.assign( {}, protectedDimensions )
  return dimensions
}

export default useDimensions