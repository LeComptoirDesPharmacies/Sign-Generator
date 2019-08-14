'use strict';

import { Banner } from '../../db'

function getBanner(bannerId, attributes) {
  return Banner.findOne({
    where: {
      id: bannerId
    },
    attributes: attributes
  })
}

function deleteBanner(id) {
  return Banner.destroy({
      where: {
        id: id
      }
    });
}

function getBannerUrl(bannerId) {
  const attributes = ["imgUrl"]
  return getBanner(bannerId, attributes)
}

function getRedirectUrl(bannerId) {
  const attributes = ["redirectUrl"]
  return getBanner(bannerId, attributes)
}

function getBannerName(bannerId) {
  const attributes = ["name"]
  return getBanner(bannerId, attributes)
}

function saveBanner(where, valueToUpdate) {
  return Banner.findOne({ where: where })
    .then(banner => {
      return banner.update(valueToUpdate)
    })
}

async function saveBannerImgUrl(bannerId, imgUrl) {
  return Banner.findOne({ where: { id: bannerId } })
    .then(banner => {
      return banner.update({ imgUrl: imgUrl })
    })
}

function saveBannerRedirectUrl(bannerId, bannerUrl) {
  const where = { id: bannerId }
  const valueToUpdate = { redirectUrl: bannerUrl }
  return saveBanner(where, valueToUpdate)
}

const BannersServiceFactory = () => ({
  getBannerUrl,
  saveBannerImgUrl,
  saveBannerRedirectUrl,
  getRedirectUrl,
  getBannerName,
  deleteBanner
});

export default BannersServiceFactory();