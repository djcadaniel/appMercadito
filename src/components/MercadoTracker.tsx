import { useMemo } from 'react';
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
      <div className='flex  items-center flex-row justify-between gap-5 mt-5 md:mt-0'>
        <MercadoDisplay 
          text = {'Productos: '}
          result = {cantProductos}
        />
        <MercadoDisplay 
          text = {'Total: S/'}
          result = {totalCost}
        />
      </div>
    </>
  )
}