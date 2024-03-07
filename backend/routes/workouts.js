// libaries
const express = require('express')
const { 
    createWorkout,
    getWorker,
    getWorkers,
    updateWorkout,
    deleteWorkout
 } = require('../controllers/workoutControllers')

const router = express.Router()

// GET all workouts
router.get('/', getWorkers)
// router.get('/', async (req,res) => {
//     res.json({msg: 'Get a request'})
// })

// GET a single workout
router.get('/:id', getWorker)

// POST a single workout
router.post('/', createWorkout)

// PATCH - update a workout
router.patch('/:id', updateWorkout)

// DELETE  a single workout
router.delete('/:id', deleteWorkout)

module.exports = router