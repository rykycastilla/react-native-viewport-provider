import calcViewport, { ViewportUnits } from './calc_viewport'
import { Layout } from '../../viewport_context'

const unitPattern = /^([+-]?)(([0-9]+)|([0-9]+[.][0-9]+))(vw|vh|vmin|vmax)$/
const unitTypePattern = /(vw|vh|vmin|vmax)$/

// Return true if "unit" have a viewport unit format
function haveViewportUnit( unit:string ): boolean {
  const format: boolean = unitPattern.test( unit )
  return format
}

// Replaces viewport literal value by the real (number) value (Parsing)
function getValue( expression:string, layout:Layout ): string {
  const [ unit ] = expression.match( unitTypePattern )
  const viewportUnit = unit as ViewportUnits
  const value = Number( expression.replace( unitTypePattern, '' ) ),
    resultValue: number = calcViewport( value, viewportUnit, layout )
  return String( resultValue )
}

// Execute calculation algorithm over a valid viewport unit
function resolveUnit( item:string, layout:Layout ): string {
  return haveViewportUnit( item )
    ? getValue( item, layout )
    : item
}

export default resolveUnit