import React, { useEffect } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const link = "http://localhost:4000"
function Home() {
  const {workouts, dispatch} = useWorkoutsContext()

  useEffect(() => {
    const fetchworkouts = async () => {
      const response = await fetch(`${link}/api/workouts`)
      const res = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: res})
      }

    }
    fetchworkouts()
    // console.log(workouts)
  }, [])

  // console.log(workouts)

  return (
    <div className="container">
      
      <div className='workouts'>
        {workouts && workouts.map((workout, index) => (
          <WorkoutDetails key={workout._id || index} workout={workout} />
        ))}
      </div>
      <div className="form">
        <WorkoutForm />
      </div>
    </div>
  )
}

export default Home