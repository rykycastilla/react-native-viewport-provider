import parseViewport from './parse_viewport'
import { Layout } from '../../viewport_context'

function parseStyleList( styleList:object[], layout:Layout ): object[] {
  const parsedStyles: object[] = []
  for( const style of styleList ) {
    const parsedStyle: object = parseViewport( style, layout )
    parsedStyles.push( parsedStyle )
  }
  return parsedStyles
}

export default parseStyleList