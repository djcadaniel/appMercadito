import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/16/solid";
import { categories } from "../data/categories";
import { Activity } from "../types"
import { Dispatch, useMemo } from "react";
import { ActivityActions } from "../reducers/activity-reducer";

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
      <h2 className="text-4xl font-bold text-slate-600 text-center">Lista de Compras</h2>
      {isEmpty ?
        <p>No hay productos aún</p> :
        activities.map( item => (
          <div key={item.id} className="p-5 bg-black mt-5 flex justify-between">
            <div className="space-y-2 relative">
              <p className={`absolute uppercase font-bold -top-8 -left-8 px-10 py-2 text-white ${categoryColor(item.category)?.color}`}>
                {categoryName(item.category)}
                {/* {JSON.stringify(categoryName(item.category))} */}
              </p>
              <p className="text-2xl font-bold pt-5 text-white">{item.name}</p>
              <p className="font-bold text-3xl text-lime-500">
                {item.precio}
                <span>soles</span>
              </p>
            </div>
            <div className="flex gap-5 items-center">
              <button
                onClick={()=> dispatch({type: 'set-activeId', payload: {id: item.id}})}
              >
                <PencilSquareIcon
                  className="h-8 w-8 text-gray-200"
                />
              </button>
              <button
                onClick={()=> dispatch({type: 'delete-activity', payload: {id: item.id}})}
              >
                <XCircleIcon 
                  className="h-8 w-8 text-red-500"
                />
              </button>
            </div>
          </div>
        ))
      }
    </>
  )
}