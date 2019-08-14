'use strict';

import { Department } from '../../db'

function createDepartment(obj) {
    return Department.findOne({ limit: 1, where: obj })
        .then(department => {
            if (department == null || department.length < 0) {
                return Department.create(obj);
            } else {
                return department.update(obj)
            }
        })
}

function isDepartmentExist(property) {
    return Department.findOne({ where: { id: property } })
        .then(department => {
            if (department) {
                return Promise.resolve(department)
            } else {
                return Promise.reject(new Error("fail"))
            }
        });
}

function getDepartmentName(id) {
    const obj = { 'id': id }
    const attributes = ["name"]
    return getDepartmentInfo(obj, attributes)
}

function getDepartmentIdWithBannerId(bannerId) {
    const obj = { 'bannerId': bannerId }
    const attributes = ["id"]
    return getDepartmentInfo(obj, attributes)
}

function getAllDepartmentName() {
    return Department.findAll({
        raw: true,
        attributes: ["name", "id"]
    }).then(departments => departments.map(department => {
        return {
            value: department.id,
            label: department.name
        }
    }))
}

function getDepartmentInfo(where, attributes) {
    return Department.findOne({
        where: where,
        attributes: attributes
    })
}

function deleteDepartmentBannerId(departmentId) {
    return Department.update(
        { bannerId: null },
        {
            where: { id: departmentId }
        })
}

function createDepartmentName(departmentName) {
    const obj = { 'name': departmentName };
    return createDepartment(obj);
}

const DepartmentsServiceFactory = () => ({
    createDepartmentName,
    getDepartmentName,
    getAllDepartmentName,
    isDepartmentExist,
    deleteDepartmentBannerId,
    getDepartmentIdWithBannerId
});

export default DepartmentsServiceFactory();