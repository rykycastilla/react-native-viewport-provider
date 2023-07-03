function toZero( num:number ): number {
  const isNaN: boolean = num !== num,
    isInfinity: boolean = ( num === Infinity ) || ( num === -Infinity )
  if( isNaN || isInfinity ) { num = 0 }
  return num
}

export default toZero