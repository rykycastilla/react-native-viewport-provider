import { createContext } from 'react'

interface Layout {
  readonly width: number,
  readonly height: number,
}

const initValue: Layout = {
  width: 0,
  height: 0,
}
const ViewportContext = createContext<Layout>( null )

export default ViewportContext
export { initValue, Layout }