import { Layout } from '../../viewport_context'

enum ViewportUnits {
  VW = 'vw',
  VH = 'vh',
  VMIN = 'vmin',
  VMAX = 'vmax',
}

// Get the size of the referenced display side
function getSide( unit:ViewportUnits, layout:Layout ): number {
  const { width, height } = layout
  switch( unit ) {
  case ViewportUnits.VW:
    return width
  case ViewportUnits.VH:
    return height
  case ViewportUnits.VMAX:
    return Math.max( width, height )
  case ViewportUnits.VMIN:
    return Math.min( width, height )
  }
}

// Calculate generic percentage
function calcPercentage( part:number, total:number ): number {
  return ( total / 100 ) * part
}

// Calculate percentage of viewport reference
function calcViewport( percentagePart:number, unit:ViewportUnits, layout:Layout ): number {
  const side: number = getSide( unit, layout ),
    result: number = calcPercentage( percentagePart, side )
  return Math.floor( result )  // 'round' (by default) to return integer value
}

export default calcViewport
export { ViewportUnits }