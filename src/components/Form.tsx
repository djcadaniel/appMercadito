import { ChangeEvent, Dispatch, FormEvent, useEffect, useState } from "react";
import { categories } from "../data/categories";
import { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";
import {v4 as uuidv4} from 'uuid';
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaMoneyBillWave } from "react-icons/fa";
import lemon from '/img/lemon.jpg';
import orange from '/img/orange.jpg';

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

  const MAX_PRICE = 200;
  const MIN_PRICE = 1;

  useEffect(()=>{
    if(state.activeId){
      const selectedActivity = state.activities.filter(item => item.id === state.activeId)[0]
      console.log(selectedActivity)
      setActivity(selectedActivity)
    }
  },[state.activeId])

  
  
  const handleChange = ({target}: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    const {id, value} = target;
    const isNumberField = ['category', 'precio'].includes(target.id)
    setActivity({
      ...activity,
      [id] : isNumberField ? +value: value
    })
  }
  
  const isValidityPrecio = (value : number)=>{
    if(value > MAX_PRICE || value < MIN_PRICE) {
      return false;
    }
    return true;
  }
  
  const handlePrecioChange = ({target} : ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    const {id, value} = target;
    const isNumberInput = ['category', 'precio'].includes(id);
    let inputPrecio = document.getElementById('precio') as HTMLInputElement;
    let valuePrecio = parseFloat(inputPrecio.value);
    
    if(isValidityPrecio(valuePrecio)) {
      setActivity({
        ...activity,
        [id] : isNumberInput ? +value : value,
      });
    }else{
      alert('Puedes ingresar máximo hasta 200 y mayor a 0')
      return;
    }  
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


  // const MAX_ITEMS = 10;
  // const MIN_ITEMS = 0;

  const handleSubmit = (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    let inputPrecio = document.getElementById('precio') as HTMLInputElement;
    let valuePrecio = parseFloat(inputPrecio.value);
    console.log(valuePrecio)
    if(valuePrecio > MAX_PRICE) return;

    dispatch({type:"save-activity", payload: {newActivity: activity}})
    setActivity({
      ...initialState,
      id: uuidv4()
    })
  }

  return (
    <form 
      // className={`w-full md:h-[calc(100vh-110px)] space-y-5 shadow p-10 rounded-lg bg-cover bg-center bg-no-repeat bg-fixed bg-[url(/img/orange.jpg)] md:bg-[url(/img/lemon.jpg)]`}
      className={`w-full md:h-[calc(100vh-110px)] space-y-5 shadow p-10 bg-cover bg-center bg-no-repeat bg-[url(${orange})] md:bg-[url(${lemon})]`}
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="" className="text-white flex items-center gap-1"><BiSolidCategoryAlt />Categoria</label>
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
          <label htmlFor="name" className="flex items-center gap-1 text-white"><BiSolidCategoryAlt />Actividad</label>
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
          <label htmlFor="precio" className="font-bold flex items-center gap-1 text-white"><FaMoneyBillWave />Precio (Monto máx. 200)</label>
          <input
            id="precio" 
            type="number"
            className={`border border-slate-300 p-2 rounded-lg ${isValidityPrecio(activity.precio) ? '' : 'error'}`}
            placeholder="Ingresa precio(monto máximo 200 soles)"
            value={activity.precio}    
            onChange={handlePrecioChange}
          />
      </div>
      <input 
        type="submit"
        className="bg-[#41BFA4] hover:bg-[#51a694] w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
        value={buttonSave(activity.category)}
        disabled={!isValidity()}
      />
    </form>
  )
}
