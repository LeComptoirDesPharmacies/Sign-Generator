'use strict';

import { Signature } from '../../db'

function createOrUpdate(where, obj) {
    return Signature.findOne({ limit: 1, where: where })
        .then(signature => {
            if (signature == null || signature.length < 0) {
                return Signature.create(obj);
            } else {
                return signature.update(obj);
            }
        })
}

function deleteSignature(id) {
    Signature.destroy({
        where: {
          id: id
        }
      });
}

function deleteSignatureBannerId(signatureId) {
    return Signature.update(
        { bannerId: null },
        {
            where: { id: signatureId }
        })
}

function getSignatureWithId(signatureId){
    return Signature.findOne({
        where: {
          id: signatureId
        }
      })
}

function getSignatureWithDepartment(departmentId){
    return Signature.findAll({
        where: {
          departmentId: departmentId
        }
      })
}

function getSignatureWithBannerId(bannerId){
    return Signature.findAll({
        where: {
          bannerId: bannerId
        }
      })
}

function getAllName() {
    return Signature.findAll({
        raw: true,
        attributes: ["firstName", "lastName", "id"]
    }).then(signature => signature.map(signature => {
        return {
            value: signature.id,
            label: signature.firstName + ' ' + signature.lastName
        }
    }))
}

function createOrUpdateSignature(id, obj) {
    const where = { 'id': id };
    return createOrUpdate(where, obj);
}

const SignaturesServiceFactory = () => ({
    createOrUpdateSignature,
    getSignatureWithId,
    deleteSignature,
    getAllName,
    getSignatureWithDepartment,
    deleteSignatureBannerId,
    getSignatureWithBannerId
});

export default SignaturesServiceFactory();