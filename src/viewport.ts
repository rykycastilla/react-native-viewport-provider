import { Dispatch, SetStateAction } from 'react'

/* Viewport object handle viewport units calculation. Also manage and call state setters to render again the react app if a viewport "resize" is detected */

type UnitType = 'vw' | 'vh' | 'vmin' | 'vmax'

class UnitIndex extends Map<UnitType,number>{}

interface Screen {
  width: number,
  height: number,
}

type LayoutSetter = Dispatch<SetStateAction<string>>

class Viewport {
  private units = new UnitIndex()
  private layoutSettersList: LayoutSetter[] = []
  // Calculate generic percentage
  private calc( value:number, total:number ): number {
    return ( total / 100 ) * value
  }
  // Call saved setters to change the react app state 
  private forceRenderLayout( screen:Screen ) {
    const layout: string = JSON.stringify( screen )
    for( const layoutSetter of this.layoutSettersList ) { layoutSetter( layout ) }
  }
  // Save setters
  public setLayoutSetter( layoutSetter:LayoutSetter ) {
    this.layoutSettersList.push( layoutSetter )
  }
  // Saving references
  public resize( screen:Screen ) {
    const { width, height } = screen
    const { units } = this
    units.set( 'vw', width )
    units.set( 'vh', height )
    const vmin = Math.min( width, height )
    const vmax = Math.max( width, height )
    units.set( 'vmin', vmin )
    units.set( 'vmax', vmax )
    this.forceRenderLayout( screen)
  }
  // Calculate percentage of viewport reference
  public resolve( percentage:number, type:string ): number {
    const total: number = this.units.get( type as UnitType ),
      result: number = this.calc( percentage, total )
    return Math.floor( result )  // 'round' (by default) to return integer value
  }
}

const viewport = new Viewport()

export default viewport