import { Activity } from '../types'
import MercadoDisplay from './MercadoDisplay'

type MercadoTrackerProps = {
  activities: Activity[]
}

export default function MercadoTracker({activities}: MercadoTrackerProps) {

  const cantProductos = activities.length

  return (
    <>
      <h2 className='text-3xl font-black text-white text-center'>Resumen del Mercado</h2>
      <div className='flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10'>
        <MercadoDisplay 
          cantProductos = {cantProductos}
          text = {'Productos'}
        />
        <MercadoDisplay 
          totalCost = {cantProductos}
          text = {'Productos'}
        />
      </div>
    </>
  )
}