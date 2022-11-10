const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { randomString } = require("../../utils");

const extGenerator = (mimetype) => {
  const mime = ["image/jpeg", "image/png", "image/webp"];
  const exts = ["jpg", "png", "webp"];
  return exts[mime.indexOf(mimetype)];
};

cloudinary.config({
  cloud_name: "dvtniqszt",
  api_key: "711548627161233",
  api_secret: "-FuEgsoKrey7Y2docvYpPbkTp9QQ"
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      const ext = extGenerator(file.mimetype);
      const randString = await randomString(5);
      return {
        folder: "public",
        format: ext,
        public_id: randString,
      };
    },
  });
  
  module.exports = storage;