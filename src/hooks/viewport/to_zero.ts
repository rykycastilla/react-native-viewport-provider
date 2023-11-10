// Return zero if the value is not an explicit number ( NaN and infinity )
function toZero( num:number ): number {
  const isNaN: boolean = num !== num,
    isInfinity: boolean = ( num === Infinity ) || ( num === -Infinity )
  if( isNaN || isInfinity ) { num = 0 }
  return num
}

export default toZero