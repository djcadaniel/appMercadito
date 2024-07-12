import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/16/solid";
import { categories } from "../data/categories";
import { Activity } from "../types"
import { Dispatch, useMemo } from "react";
import { ActivityActions } from "../reducers/activity-reducer";
import imgListVacia from '/img/listavacia.svg'

type ActivityListProps = {
  activities: Activity[],
  dispatch: Dispatch<ActivityActions>
}

export default function ActivityList({activities, dispatch}: ActivityListProps) {

  // const categoryColor = (category:number) => categories.find( cat => cat.id === category ? cat.color : '')
  const categoryColor = useMemo(()=>(category:number) => categories.find( cat => {
    let colorCategory;
    if(cat.id === category){
      colorCategory = cat.color
    }
    return colorCategory
  }),[activities])
  
  const categoryName = useMemo(()=> (categor:number) => categories.map( catName => catName.id === categor ? catName.name : ''), [activities])

  // console.log(categoryColor(2))
  // let colorCategory: string;
  // const changeColorCategory =  (id: number) => {
  //   switch(id){
  //     case id = 1:
  //       colorCategory = 'bg-green-500'
  //       break;
  //     case id = 2:
  //       colorCategory = 'bg-amber-500';
  //       break;
  //     case id = 3:
  //       colorCategory = 'bg-red-500';
  //       break;
  //     case id = 4:
  //       colorCategory = 'bg-amber-900';
  //       break;
  //     case id = 5:
  //       colorCategory = 'bg-sky-900';
  //       break;
  //   }
  //   return colorCategory;
  // }

  const isEmpty = useMemo(() => activities.length === 0, [activities]);

  return (
    <>
      {isEmpty ?
        <div className="w-full flex flex-col items-center space-y-6">
          <img src={imgListVacia} alt="" className="w-[15rem] max-w-full"/>
          <p className="text-[#8F8F91] text-xl font-bold">No hay productos aún</p>
        </div> :
        activities.map( item => (
          <div key={item.id} className="p-5 bg-white mt-5 flex justify-between rounded-md shadow-lg text-sm">
            <div className="space-y-1 relative">
              <p className={`absolute uppercase rounded-lg font-bold -top-4 -left-4 px-4 py-1 text-white ${categoryColor(item.category)?.color}`}>
                {categoryName(item.category)}
                {/* {JSON.stringify(categoryName(item.category))} */}
              </p>
              <p className="text-md pt-3 text-gray-500">{item.name}</p>
              <p className="text-md text-gray-500 m-0 font-semibold">
                S/. {item.precio}
              </p>
            </div>
            <div className="flex gap-5 items-center">
              <button
                onClick={()=> dispatch({type: 'set-activeId', payload: {id: item.id}})}
              >
                <PencilSquareIcon
                  className="h-6 w-6 text-[#41BFA4]"
                />
              </button>
              <button
                onClick={()=> dispatch({type: 'delete-activity', payload: {id: item.id}})}
              >
                <XCircleIcon 
                  className="h-6 w-6 text-red-400"
                />
              </button>
            </div>
          </div>
        ))
      }
    </>
  )
}