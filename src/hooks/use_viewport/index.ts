import _eval from 'js-math-eval'
import allowedProps from './allowed_props.json'
import resolveUnit from './resolve_unit'
import toZero from './to_zero'
import { useEffect, useMemo, useState } from 'react'
import viewport from '../../viewport'

const percentagePattern = /^(([0-9]+)|([0-9]+[.][0-9]+))(%)$/

function isAllowedProp( propKey:string ): boolean {
  return allowedProps.includes( propKey )
}

function resolvePropValue( styleProp:string ): number {
  const valueUnits: string[] = styleProp.split( ' ' )
  for( let _this = 0; _this < valueUnits.length; _this++ ) {
    const unit: string = valueUnits[ _this ]
    valueUnits[ _this ] = resolveUnit( unit )
  }
  const result: string = valueUnits.join( ' ' ),
    resultNumber: number = _eval( result )
  return toZero( resultNumber )
}

interface StyleIndex {
  [ key:string ]: any
}

function useViewport( style:object ): object {
  const [ layout, setLayout ] = useState( '' )
  useEffect( () => viewport.setLayoutSetter( setLayout ), [] )
  const result: object = useMemo( (): object => {
    const keys: string[] = Object.keys( style ),
      indexedStyle: StyleIndex = style,
      resultStyle: StyleIndex = {}
    for( const key of keys ) {
      const styleProp: any = indexedStyle[ key ],
        isString: boolean = typeof styleProp === 'string',
        _isAllowedProp: boolean = isAllowedProp( key ),
        isPercentage: boolean = percentagePattern.test( styleProp )
      if( isString && _isAllowedProp && !isPercentage ) {
        resultStyle[ key ] = resolvePropValue( styleProp )
      }
      else {
        resultStyle[ key ] = styleProp
      }
    }
    return resultStyle as object
  }, [ layout ] )
  return result
}

export default useViewport