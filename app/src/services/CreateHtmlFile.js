const fse = require('fs-extra');
import { Banner, Department } from "../../db"

class SignatureFile {
  constructor(signature, settings, department) {
    this.signature = signature
    this.department = department
    this.banner = ''
    this.settings = settings
    this.htmlContent = ''
  }

  async getBanner(signature) {
    let banner = null
    if (signature.bannerId) {
        banner = await Banner.findOne(
          {where: {id: signature.bannerId}}
        )
    } else if (this.department) {
      const department = await Department.findOne({where: {id: this.department}})
      banner = await Banner.findOne(
        {where: {id: department.bannerId}}
      )
    }
    return banner
}

  async buildHtmlFile() {
    this.banner = await this.getBanner(this.signature)
    this.writeBody()
    if (this.banner) {
      this.writeBanner()
    }
    this.writeFileOnDisk()
  }

  writeBanner() {
    this.htmlContent += `
    <div style="margin-top:10px;">
      <a href="${this.banner.redirectUrl}">
        <img class="Signature" src="${this.banner.imgUrl}">
      </a>
    </div>
    `
  }

  writeBody() {
    this.htmlContent = `
    <table class="contents" style="border-collapse: collapse;border-spacing: 0;table-layout: fixed;width: 100%;">
    <tr>
      <td class="padded" style="width: 100px !important; padding: 0;vertical-align: top;padding-left: 32px;padding-right: 1px !important;word-break: break-word;word-wrap: break-word;">
        <div class="image" style="font-size: 12px;mso-line-height-rule: at-least;font-style: normal;font-weight: 100;Margin-bottom: 0;Margin-top: 0;font-family: sans-serif;color: #60666d;" align="center">
          <img class="gnd-corner-image gnd-corner-image-center gnd-corner-image-top" style="border: 0;-ms-interpolation-mode: bicubic;display: block;max-width: 900px;" src="${this.settings.logo}" alt="" width="90" height="90" />
        </div>
      </td>
      <td class="padded" style="padding: 0;vertical-align: center;padding-right: 32px; padding-left:0px !important;word-break: break-word;word-wrap: break-word;">
        <p style="font-style: normal !important;font-weight: 100 !important;Margin-bottom: 0px;Margin-top: 0;font-size: 13px !important;line-height: 17px !important;font-family: sans-serif !important;color: #00070E;">
        <strong style="font-weight: bold;"> ${this.signature.firstName} ${this.signature.lastName} </strong>
        <p style="font-style: normal !important;font-weight: 100 !important;Margin-bottom: 0px;Margin-top: 0;font-size: 13px !important;line-height: 17px !important;font-family: sans-serif !important;color: #00070E;">
         ${this.signature.position} </br>
        </p>
        <p style="font-style: normal !important;font-weight: 100 !important;Margin-bottom: 0px;Margin-top: 0;font-size: 13px !important;line-height: 17px !important;font-family: sans-serif !important;color: #00070E;">
         ${this.signature.phone}
        </p>
        <p style="font-style: normal !important;font-weight: 100 !important;Margin-bottom: 0px;Margin-top: 0;font-size: 13px !important;line-height: 17px !important;font-family: sans-serif !important;color: #00070E;">
          <a HREF="mailto:${this.signature.email}">${this.signature.email}</a>
        </p>
        <p style="font-style: normal !important;font-weight: 100 !important;Margin-bottom: 0px;Margin-top: 0;font-size: 13px !important;line-height: 17px !important;font-family: sans-serif !important;color: #00070E;">
          <a href="https://www.lecomptoirdespharmacies.fr">www.lecomptoirdespharmacies.fr</a>
        </p>
      </td>
    </tr>
    </table>
    `
  }

  //TODO: Renvoyer erreur afin qu'elle soit afficher
  writeFileOnDisk() {
    let fullPath = ""
    if (process.platform == "win32") {
      fullPath = this.settings.path + "\\" + this.signature.firstName + "_" + this.signature.lastName + "_" + this.signature.id + ".html"
    } else {
      fullPath = this.settings.path + "/" + this.signature.firstName + "_" + this.signature.lastName + "_" + this.signature.id + ".html"
    }
    console.log("fullPath createSign ----> ", fullPath)
    fse.outputFile(fullPath, this.htmlContent, (error) => {
      console.log(error)
    });
  }
}

export default SignatureFile