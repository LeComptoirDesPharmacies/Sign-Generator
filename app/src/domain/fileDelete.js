import KeytarService from "../services/KeytarService"
import S3 from "../services/S3"
import SettingService from "../services/SettingService";

class FileDelete {
    constructor(imageUrl) {
        let tmp = imageUrl.split('.')
        this.fileName = tmp[tmp.length - 2] + '.' + tmp[tmp.length - 1]
    }

    async deleteBannerOnS3() {
        await KeytarService.getS3Credentials().then(async data => {
            let s3 = new S3(SettingService.getBucketName(), data.account, data.password)
            await s3.deleteFile(this.fileName)
        })
    }
}

export default FileDelete;