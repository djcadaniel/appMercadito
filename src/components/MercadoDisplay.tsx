type MercadoDisplayProps = {
  text: string
  result: number
}

export default function MercadoDisplay({text, result}: MercadoDisplayProps) {
  return (
    <p className='text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center text-2xl'>
      <span className='font-black text-2xl text-orange'>{text}</span>
      {result}
    </p>
  )
}
