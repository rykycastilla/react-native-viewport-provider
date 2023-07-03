import viewport from '../../viewport'

const unitPattern = /^([+-]?)(([0-9]+)|([0-9]+[.][0-9]+))(vw|vh|vmin|vmax)$/
const unitTypePattern = /(vw|vh|vmin|vmax)$/

function isUnit( unit:string ): boolean {
  const format: boolean = unitPattern.test( unit )
  return format
}

function getValue( unit:string ): string {
  const [ type ] = unit.match( unitTypePattern ),
    value = Number( unit.replace( unitTypePattern, '' ) ),
    resultValue: number = viewport.resolve( value, type )
  return String( resultValue )
}

function resolveUnit( item:string ): string {
  return isUnit( item )
    ? getValue( item )
    : item
}

export default resolveUnit