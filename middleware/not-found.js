const notFound = (req, res) => res.status(404).send({msg:'ERROR 404, ROUTE DOES NOT EXIST'})

module.exports = notFound
