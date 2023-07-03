import { Dispatch, SetStateAction } from 'react'

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
  private calc( value:number, total:number ): number {
    return ( total / 100 ) * value
  }
  private forceRenderLayout( screen:Screen ) {
    const layout: string = JSON.stringify( screen )
    for( const layoutSetter of this.layoutSettersList ) { layoutSetter( layout ) }
  }
  public setLayoutSetter( layoutSetter:LayoutSetter ) {
    this.layoutSettersList.push( layoutSetter )
  }
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
  public resolve( value:number, type:string ): number {
    const total: number = this.units.get( type as UnitType ),
      result: number = this.calc( value, total )
    return Math.floor( result )
  }
}

const viewport = new Viewport()

export default viewport