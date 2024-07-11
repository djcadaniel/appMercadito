import { useEffect, useReducer } from 'react'
import './App.css'
import Form from './components/Form'
import { activityReducer, initialState } from './reducers/activity-reducer'
import ActivityList from './components/ActivityList'
import MercadoTracker from './components/MercadoTracker'

function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(()=>{
    localStorage.setItem('activities', JSON.stringify(state.activities))
  },[state.activities])

  const restartApp = () => state.activities.length;
  
  const onHandleReset = () => {
    console.log('reeiniando')
    dispatch({type: 'restart-activity'})
  }

  return (
    <>
      <header className='bg-lime-600 py-3'>
        <div className='max-w-4xl mx-auto flex justify-between'>
          <h1>appMercado</h1>
          <button 
            className='bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10'
            disabled = {!restartApp()}
            onClick={onHandleReset}
          >
            Reiniciar
          </button>
        </div>
      </header>
      <section className='bg-lime-500 py-20 px-5'>
        <div className='max-w-4xl mx-auto'>
          <Form 
            dispatch={dispatch}
            state = {state}
          />
        </div>
      </section>
      <section className='bg-gray-800 py-10'>
        <div className='max-w-4xl mx-auto'>
          <MercadoTracker 
            activities = {state.activities}
          />
        </div>
      </section>
      <section className='p-10 mx-auto max-w-4xl'>
        <ActivityList 
          activities = {state.activities}
          dispatch = {dispatch}
        />
      </section>
    </>
  )
}

export default App