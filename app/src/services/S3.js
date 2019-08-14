const AWS = require('aws-sdk');

/**
 * This class contains all function related to download and upload of S3
 */
class S3 {
    constructor(bucketName, accessKeyId, secretAccessKey) {
        this.bucketName = bucketName;
        AWS.config = new AWS.Config();
        AWS.config.secretAccessKey = secretAccessKey;
        AWS.config.accessKeyId = accessKeyId;
        this.s3 = new AWS.S3();
    }

    isValidCredential(){
        const params = {
            Bucket: this.bucketName,
            MaxKeys: 2
        };
        return this.s3.listObjects(params).promise().then((data) => {
        },(err) => {
            return err.message
        });
    }

    /**
     * Permet d'upload un fichier sur le S3
     * @param {String} keyFile 
     * @param {*} buffer 
     * @param {String} type 
     */
    async uploadFile(keyFile, buffer, type) {
        var params = {
            Bucket: this.bucketName,
            Key: keyFile,
            ContentType: type.mime,
            Body: buffer,
            ACL: 'public-read',
        };

        return this.s3.upload(params).promise().then((res) => {return  res;});
    }

    /**
     * Permet de supprimer un fichier sur AWS S3
     */
    deleteFile(keyFile) {
        var params = {
            Bucket: this.bucketName,
            Key: keyFile
        };
        this.s3.deleteObject(params, function (err, data) {
            if (err) {
                console.log(err, err.stack)
            }
        })
    }

    /**
     * Permet de télécharger un fichier depuis le S3
     * @param {String} keyFile 
     */
    async downloadFile(keyFile) {
        var params = {
                    Bucket: this.bucketName,
                    Key: keyFile
                }
        let data = null;
        await this.s3.getObject(params).promise().then((res) => {
            data = res;
        });
        return data;
    }
}
    export default S3;