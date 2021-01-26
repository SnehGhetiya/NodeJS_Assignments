// databse connectivity
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Sample',
    password: '123456',
    port: 5432,
})

// logic for getting all cars details
const getCars = (request, response) => {
        pool.query('SELECT md.name model_name, mk.name make_name, cr.id, cr.name FROM model md INNER JOIN car cr ON cr.model_id = md.id INNER JOIN make mk ON cr.make_id = mk.id ORDER BY cr.id;', (error, results) => {
                    if (error) {
                        throw error
                    }
            response.status(200).json(results.rows)
            })
}
       
// logic for getting car details by id
const getCarById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT md.name model_name, mk.name make_name, cr.id, cr.name FROM model md INNER JOIN car cr ON cr.model_id = md.id INNER JOIN make mk ON cr.make_id = mk.id WHERE cr.id = $1 ORDER BY cr.name', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// routing methods
module.exports = {
    getCars,
    getCarById,
}
