import { ChangeEvent, Dispatch, FormEvent, useEffect, useState } from "react";
import { categories } from "../data/categories";
import { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";
import {v4 as uuidv4} from 'uuid';

type FormProps = {
  dispatch: Dispatch<ActivityActions>,
  state: ActivityState
}
const initialState = {
  id: uuidv4(),
  category: 1,
  name: '',
  precio: 0
}

export default function Form({dispatch, state}: FormProps) {

  const [activity, setActivity] = useState<Activity>(initialState)

  useEffect(()=>{
    if(state.activeId){
      const selectedActivity = state.activities.filter(item => item.id === state.activeId)[0]
      //me va a traer la misma actividad con el mismo id que seleccione
      //al poner[0], me devolverá el objeto
      //recuerdda:filter: Devuelve un nuevo array con todos los elementos que cumplan la condición.
      //const numbers = [1, 2, 3, 4];
      //const evens = numbers.filter(num => num % 2 === 0); 
      // evens será [2, 4]
      console.log(selectedActivity)
      setActivity(selectedActivity)
    }
  },[state.activeId])

  const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    const isNumberField = ['category', 'precio'].includes(e.target.id)
    console.log(isNumberField)
    setActivity({
      ...activity,
      [e.target.id] : isNumberField ? +e.target.value : e.target.value
    })
  }

  const buttonSave = (category: number) => {
    const getCategoryID = categories.find(item => item.id === category)
    const getCategoryName = getCategoryID?.name

    let buttonText;

    switch(getCategoryName){
      case 'Verduras':
        buttonText = 'Guardar verduras';
        break;
      case 'Frutas':
        buttonText = 'Guardar frutas'
        break;
      case 'Carnes':
        buttonText = 'Guardar carnes'
        break;
      case 'Cereales':
        buttonText = 'Guardar cereales'
        break;
      case 'Otros':
        buttonText = 'Guardar otros'
        break;

        default:
          buttonText= 'Guardar';
    }

    return buttonText;
  }

  const isValidity = ()=>{
    const {name, precio} = activity;
    return name.trim() !== '' && precio > 0
  }

  const handleSubmit = (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    dispatch({type:"save-activity", payload: {newActivity: activity}})
    setActivity({
      ...initialState,
      id: uuidv4()
    })
  }

  return (
    <form 
      className="w-full md:h-[calc(100vh-110px)] space-y-5 shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="" className="text-black">Categoria</label>
        <select 
          name="" 
          id="category" 
          className="w-full border border-slate-300 p-2 rounded-lg bg-slate-50"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map( category => (
            <option
              key={category.name}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
          <label htmlFor="name">Actividad</label>
          <input
            id="name" 
            type="text"
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Ingresa"
            value={activity.name}
            onChange={handleChange}
          />
      </div>
      <div className="grid grid-cols-1 gap-3">
          <label htmlFor="precio" className="font-bold">Precio</label>
          <input
            id="precio" 
            type="number"
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Ingresa precio"
            value={activity.precio}    
            onChange={handleChange}
          />
      </div>
      <input 
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
        value={buttonSave(activity.category)}
        disabled={!isValidity()}
      />
    </form>
  )
}
