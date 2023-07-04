import { useEffect, useMemo, useState } from 'react'
import viewport from '../../viewport'

interface Layout {
  width: number,
  height: number
}

// React Hook: Return width and height of ViewportProvider
function useDimensions(): Layout {
  const [ layout, setLayout ] = useState( '{"width":0,"height":0}' )
  useEffect( () => viewport.setLayoutSetter( setLayout ), [] )
  const dimensions: Layout = useMemo( () => {
    return JSON.parse( layout ) as Layout
  }, [ layout ] )
  return dimensions
}

export default useDimensions