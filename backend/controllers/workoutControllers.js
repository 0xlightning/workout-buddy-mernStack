const mongoose = require('mongoose');
const Workout = require('../models/workoutModel');

const getWorkers = async (req, res) => {
    try {
        const workouts = await Workout.find({}).sort({ createdAt: -1 });
        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getWorker = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' });
    }

    try {
        const workout = await Workout.findById(id);

        if (!workout) {
            return res.status(404).json({ error: 'No such workout' });
        }

        res.status(200).json(workout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;

    let emptyFields = []
    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if(emptyFields > 0) {
        return res.status(400).json({ error: 'Please fill in missing fields', emptyFields})
    }
    
    try {
        const workout = await Workout.create({ title, load, reps });
        res.status(200).json(workout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' });
    }

    try {
        const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });

        if (!workout) {
            return res.status(404).json({ error: 'No such workout' });
        }

        res.status(200).json(workout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' });
    }

    try {
        const workout = await Workout.findOneAndDelete({ _id: id });

        if (!workout) {
            return res.status(404).json({ error: 'No such workout' });
        }

        res.status(200).json(workout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createWorkout,
    getWorker,
    getWorkers,
    updateWorkout,
    deleteWorkout
};
