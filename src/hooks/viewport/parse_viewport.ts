import _eval from 'js-math-eval'
import allowedProps from './allowed_props.json'
import resolveUnit from './resolve_unit'
import toZero from './to_zero'
import { Layout } from '../../viewport_context'

const percentagePattern = /^(([0-9]+)|([0-9]+[.][0-9]+))(%)$/

// Verify if the prop is valid for viewport values
function isAllowedProp( propKey:string ): boolean {
  return allowedProps.includes( propKey )
}

// Analyze the value structure of the style property to parse its units
function resolvePropValue( styleProp:string, layout:Layout ): number {
  const valueUnits: string[] = styleProp.split( ' ' )
  for( let _this = 0; _this < valueUnits.length; _this++ ) {
    const unit: string = valueUnits[ _this ]
    valueUnits[ _this ] = resolveUnit( unit, layout )  // Replacing by parsed values
  }
  const result: string = valueUnits.join( ' ' ),
    resultNumber: number = _eval( result )  // Arithmetic work
  return toZero( resultNumber )
}

interface StyleIndex {
  [ key:string ]: unknown
}

// Receives an style object with viewport units and parse it
function parseViewport( styleObject:object, layout:Layout ): object {
  const style = styleObject as StyleIndex
  // Parsing style object
  const keys: string[] = Object.keys( style ),
    resultStyle: StyleIndex = {}
  for( const key of keys ) {
    const styleValue: unknown = style[ key ]
    // Parsing conditions
    const isString: boolean = typeof styleValue === 'string',
      _isAllowedProp: boolean = isAllowedProp( key ),
      isPercentage: boolean = percentagePattern.test( String( styleValue ) )
    if( isString && _isAllowedProp && !isPercentage ) {
      const viewportValue = styleValue as string
      resultStyle[ key ] = resolvePropValue( viewportValue, layout )  // Parsing value
    }
    else {
      resultStyle[ key ] = styleValue  // By default
    }
  }
  return resultStyle as object
}

export default parseViewport