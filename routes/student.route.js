// backend/routes/student.route.js

const express = require('express');
const router = express.Router();
const Student = require('../models/Student'); // Student Model

// CREATE Student
router.post('/students', async (req, res, next) => {
    try {
        const data = await Student.create(req.body);  // No change needed here, just make sure the body includes dob
        console.log(data);
        res.json(data);
    } catch (error) {
        return next(error);
    }
});

// READ Students
router.get('/', async (req, res, next) => {
    try {
        const data = await Student.find();
        res.json(data);
    } catch (error) {
        return next(error);
    }
});

// UPDATE Student
router.route('/students/:id')
    
    .get(async (req, res, next) => {
        try {
            const data = await Student.findById(req.params.id);
            res.json(data);
        } catch (error) {
            return next(error);
        }
    })
   
    .put(async (req, res, next) => {
        try {
            const data = await Student.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });
            res.json(data);
            console.log("Student updated successfully!");
        } catch (error) {
            return next(error);
        }
    });

router.delete('/students/:id', async (req, res, next) => {
    try {
       
        const data = await Student.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).json({ msg: 'Student not found' });
        }
        res.status(200).json({
            msg: 'Student deleted successfully!',
            data: data,
        });
    } catch (error) {
        return next(error);
    }
});


module.exports = router;
