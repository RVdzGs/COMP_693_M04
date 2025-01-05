import Employee from '../models/Employee.js'

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({})
        res.status(200).json({ employees, count: employees.length })
    } catch (err) {
        res.status(500).json ({ msg: err })
    }
}

const getEmployee = async (req, res) => {
    try {
        let {id:employeeId} = req.params
        const employee = await Employee.findOne({ _id: employeeId })
        if (!employee) {
            return res.status(404).json({ msg: `No employee with ID ${employeeId} found.` })
        }
        res.status(200).json({ employee })
    } catch (err) {
        res.status(500).json({ msg: err })
    }
}

const createEmployee = async (req, res) => {
    try {
        const employee = await Employee.create(req.body)
        res.status(201).json({ employee })
    } catch (err) {
        res.status(500).json({ msg: err })
    }
}

const updateEmployee = async (req, res) => {
    try {
        let {id:employeeId} = req.params
        const employee = await Employee.findOneAndUpdate({ _id: employeeId }, req.body, {
            new: true,
            runValidators: true
        })
        if (!employee) {
            return res.status(404).json({ msg: `No employee with id ${employeeId} found.` })
        }
        res.status(200).json({ msg: 'Successfully updated employee' })
    } catch (err) {
        res.status(500).json({ msg: err })
    }
}

const deleteEmployee = async (req, res) => {
    try {
        let {id:employeeId} = req.params
        const employee = await Employee.findOneAndDelete({ _id: employeeId })
        if (!employee) {
            return res.status(404).json({ msg: `No employee with ID ${employeeId} found.` })
        }
        res.status(200).json({ msg: 'Employee successfully deleted' })
    } catch (err) {
        res.status(500).json({ msg: err })
    }    
}

export {
    getAllEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
}