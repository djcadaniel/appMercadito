type MercadoDisplayProps = {
  cantProductos: number
  text: string
}

export default function MercadoDisplay({cantProductos, text}: MercadoDisplayProps) {
  return (
    <p className='text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center text-2xl'>
      <span className='font-black text-2xl text-orange'>{text}</span>
      {cantProductos}
    </p>
  )
}