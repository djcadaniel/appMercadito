type MercadoDisplayProps = {
  text: string
  result: number
}

export default function MercadoDisplay({text, result}: MercadoDisplayProps) {
  return (
    <p className='flex items-center font-bold rounded-full text-center text-lg md:text-xl'>
      <span className='text-lg md:text-xl text-orange mr-1'>{text}</span>{`${result}`}
    </p>
  )
}
