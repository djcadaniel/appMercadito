import { useEffect, useReducer } from 'react'
import './App.css'
import Form from './components/Form'
import { activityReducer, initialState } from './reducers/activity-reducer'
import ActivityList from './components/ActivityList'
import MercadoTracker from './components/MercadoTracker'
import logo from '/img/logo.png';

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
      <div className=' w-full md:h-screen bg-green-400'>
        <div className='flex flex-col h-full min-w-[420px]'>
          <header className='w-full bg-gray-800'>
            <div className='max-w-4xl mx-auto text-white px-5 py-3 bg-[#565CBA]'>
              <div className='flex justify-between items-center w-full'>
                <img src={logo} alt="" className='h-[80px]'/>
                <p className='text-xl md:text-2xl md:text-left text-center font-bold'>APP STORE</p>
                <button 
                  className='bg-[#41bfa4] hover:bg-gray-900 p-2 font-bold uppercase cursor-pointer rounded-lg text-sm disabled:opacity-10'
                  disabled = {!restartApp()}
                  onClick={onHandleReset}
                >
                  Reiniciar
                </button>
              </div>
              <MercadoTracker 
                activities = {state.activities}
              />
            </div>
          </header>
          <div className='w-full bg-fuchsia-300 order-2 md:order-1'>
            <section className='px-10 py-5 mx-auto max-w-4xl min-w-[420px] bg-slate-50'>
              <ActivityList 
                activities = {state.activities}
                dispatch = {dispatch}
              />
            </section>
          </div>
          <div className='w-full bg-red-700 order-1 md:order-2'>
            <section className='max-w-4xl min-w-[420px] mx-auto bg-slate-50'>
              <Form 
                dispatch={dispatch}
                state = {state}
              />
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

export default App