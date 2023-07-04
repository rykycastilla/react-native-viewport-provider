import viewport from '../../viewport'

const unitPattern = /^([+-]?)(([0-9]+)|([0-9]+[.][0-9]+))(vw|vh|vmin|vmax)$/
const unitTypePattern = /(vw|vh|vmin|vmax)$/

// Return true if "unit" have a viewport unit format
function isUnit( unit:string ): boolean {
  const format: boolean = unitPattern.test( unit )
  return format
}

// Replaces viewport literal value by the real (number) value (Parsing)
function getValue( unit:string ): string {
  const [ type ] = unit.match( unitTypePattern ),
    value = Number( unit.replace( unitTypePattern, '' ) ),
    resultValue: number = viewport.resolve( value, type )
  return String( resultValue )
}

// Execute calculation algorithm over a valid viewport unit
function resolveUnit( item:string ): string {
  return isUnit( item )
    ? getValue( item )
    : item
}

export default resolveUnit