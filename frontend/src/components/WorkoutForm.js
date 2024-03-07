import React, { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

function WorkoutForm({ onSubmit }) {
  const link = "http://localhost:4000"

  const {dispatch} = useWorkoutsContext()

  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, seterror] = useState(null);
  const [emptyFields, setemptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };
    console.log(workout)
    const response = await fetch(`${link}/api/workouts`, {
        method: 'POST',
        body: JSON.stringify(workout),
        headers: {
            'Content-Type': 'application/json' 
        }
    })

    if (!response.ok) {
      seterror(json.error)
      setemptyFields(json.emptyFields)
    }
      setTitle('')
      setLoad('')
      setReps('')
      seterror(null)
      setemptyFields([])
    const json = await response.json();
    console.log('New workout added:', json);
    dispatch({type: 'CREATE_WORKOUT', payload: json })
  };

  return (
    <form className='form-workouts' onSubmit={handleSubmit}>
      <h2>Add Workout</h2>
      <div>
        <label htmlFor='title'>Title:</label>
        <input
          type='text'
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={emptyFields.includes('title') ? 'error' : ''}
          required
        />
      </div>
      <div>
        <label htmlFor='load'>Load (kg):</label>
        <input
          type='number'
          id='load'
          value={load}
          onChange={(e) => setLoad(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor='reps'>Reps:</label>
        <input
          type='number'
          id='reps'
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          required
        />
      </div>
      <div>
        <button type='submit'>Add Workout</button>
      </div>
      {error && <div className='error'>{error}</div>}
    </form>
  );
}

export default WorkoutForm;
