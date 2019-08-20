function createDepartment(Department) {
    console.log("est-ce que ça passe ici?")
    Department.findAll()
        .then(department => {
            if (department == null || department.length == 0) {
                console.log("Et ici?")
                Department.bulkCreate([
                    { name: "Développement" },
                    { name: "Commercial" },
                    { name: "Opérationnel" }
                ])
            }
        })
}

module.exports = {createDepartment};
