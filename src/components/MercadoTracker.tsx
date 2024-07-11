import { useMemo, useReducer } from 'react';
import { Activity } from '../types'
import MercadoDisplay from './MercadoDisplay'

type MercadoTrackerProps = {
  activities: Activity[]
}

export default function MercadoTracker({activities}: MercadoTrackerProps) {

  const cantProductos = useMemo(()=>activities.length, [activities]) ;
  // const totalCost = activities.reduce((total, item) =>{
  //   return total + item.precio;
  // },0)
  const totalCost = activities.reduce((total, item) => total + item.precio,0);

  return (
    <>
      <h2 className='text-3xl font-black text-white text-center'>Resumen del Mercado</h2>
      <div className='flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10'>
        <MercadoDisplay 
          text = {'Productos'}
          result = {cantProductos}
        />
        <MercadoDisplay 
          text = {'Productos'}
          result = {totalCost}
        />
      </div>
    </>
  )
}