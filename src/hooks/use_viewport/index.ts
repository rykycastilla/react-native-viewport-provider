import _eval from 'js-math-eval'
import allowedProps from './allowed_props.json'
import resolveUnit from './resolve_unit'
import toZero from './to_zero'
import { useEffect, useMemo, useState } from 'react'
import viewport from '../../viewport'

const percentagePattern = /^(([0-9]+)|([0-9]+[.][0-9]+))(%)$/

// Verify if the prop is valid for viewport values
function isAllowedProp( propKey:string ): boolean {
  return allowedProps.includes( propKey )
}

// Analyze the value structure of the style property to parse its units
function resolvePropValue( styleProp:string ): number {
  const valueUnits: string[] = styleProp.split( ' ' )
  for( let _this = 0; _this < valueUnits.length; _this++ ) {
    const unit: string = valueUnits[ _this ]
    valueUnits[ _this ] = resolveUnit( unit )  // Replacing by parsed values
  }
  const result: string = valueUnits.join( ' ' ),
    resultNumber: number = _eval( result )  // Arithmetic work
  return toZero( resultNumber )
}

interface StyleIndex {
  [ key:string ]: any
}

// React Hook: Receives an style object with viewport units and parse it
function useViewport( style:object ): object {
  const [ layout, setLayout ] = useState( '' )  // Only for identify state changes
  // Adding setter for rendering after changes
  useEffect( () => viewport.setLayoutSetter( setLayout ), [] )
  // Parsing style object
  const result: object = useMemo( (): object => {
    const keys: string[] = Object.keys( style ),
      indexedStyle: StyleIndex = style,  // indexing properties
      resultStyle: StyleIndex = {}
    for( const key of keys ) {
      const styleProp: any = indexedStyle[ key ],
        // Parsing conditions
        isString: boolean = typeof styleProp === 'string',
        _isAllowedProp: boolean = isAllowedProp( key ),
        isPercentage: boolean = percentagePattern.test( styleProp )
      if( isString && _isAllowedProp && !isPercentage ) {
        resultStyle[ key ] = resolvePropValue( styleProp )  // Parsing value
      }
      else {
        resultStyle[ key ] = styleProp  // By default
      }
    }
    return resultStyle as object
  }, [ layout ] )
  return result
}

export default useViewport