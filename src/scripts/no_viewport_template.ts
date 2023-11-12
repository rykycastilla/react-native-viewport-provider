import HookType from '../enums/HookType'

function noViewportTemplate( hookType:HookType ) {
  throw( `Executing ${ hookType } hook out of Viewport Provider Context` )
}

export default noViewportTemplate