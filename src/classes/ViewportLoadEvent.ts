type FunctionVoid = () => void

class ViewportLoadEvent {
  
  private readonly handler = () => { return }
  private loaded = false

  constructor( handler?:FunctionVoid ) {
    if( handler ) { this.handler = handler }
  }

  public trigger() {
    if( !this.loaded ) {
      this.loaded = true
      this.handler()
    }
  }

}

export default ViewportLoadEvent