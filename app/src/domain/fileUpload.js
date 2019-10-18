import fs from 'fs';
import keytarService from "../services/KeytarService"
import S3 from "../services/S3"
import SettingService from "../services/SettingService";

class FileUpload {
    constructor(file, name) {
        this.buffer = fs.readFileSync(file.path)
        this.type = file.type
        this.fileName = name + '.' + this.type.split('/')[1]
    }

    async uploadFileToS3() {
        return await keytarService.getS3Credentials().then(async data => {
            let bucketName = await SettingService.getBucketName();
            let s3 = new S3(bucketName, data.account, data.password);
            let res = await s3.uploadFile(this.fileName, this.buffer, this.type);
            return res;
        })
    }
}

export default FileUpload;