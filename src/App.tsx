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
      <div className=' w-full md:h-screen font-signika'>
        <div className='flex flex-col flex-wrap md:flex-row md:flex-wrap h-full min-w-[420px]'>
          <header className='w-full bg-[#565CBA]'>
            <div className='max-w-[1400px] mx-auto text-white px-5 py-3 md:py-1 bg-[#565CBA]'>
              <div className='flex justify-between items-center w-full'>
                <img src={logo} alt="" className='h-[80px]'/>
                <p className='text-xl md:text-xl md:text-left text-center font-bold'>APP STORE</p>
                <button 
                  className='bg-[#41bfa4] hover:bg-gray-900 p-2 font-bold uppercase cursor-pointer rounded-lg text-sm disabled:opacity-10'
                  disabled = {!restartApp()}
                  onClick={onHandleReset}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>
                </button>
              </div>
              <MercadoTracker 
                activities = {state.activities}
              />
            </div>
          </header>
          <div className='w-full mx-auto'>
            <div className='flex flex-col md:flex-row max-w-[1400px] mx-auto'>
              <div className='w-full md:w-1/2 order-2'>
                <section className='mx-auto min-w-[420px] md:h-[calc(100vh-110px)] bg-white md:overflow-scroll pt-16 md:p-0'>
                  <ActivityList 
                    activities = {state.activities}
                    dispatch = {dispatch}
                  />
                </section>
              </div>
              <div className='w-full md:w-1/2 bg-red-700 order-1'>
                <section className='min-w-[420px] mx-auto bg-slate-50'>
                  <Form 
                    dispatch={dispatch}
                    state = {state}
                  />
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App