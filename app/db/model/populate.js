function createDepartment(Department) {
    Department.findAll()
        .then(department => {
            if (department == null || department.length == 0) {
                Department.bulkCreate([
                    { name: "Développement" },
                    { name: "Commercial" },
                    { name: "Opérationnel" }
                ])
            }
        })
}

module.exports = {createDepartment};
