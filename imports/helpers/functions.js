import FilesCol from "../api/files/collection"

export function uploadToServer({
    Col=FilesCol,file, other
}) {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject('File cannot be null')
      }
  
      const upload = Col.insert({ file, chunkSize: 'dynamic', ...other }, false)
      upload.on('end', function (error, fileObj) {
        if (error) {
          reject(`Error during upload: ${error}`)
        } else {
          resolve(fileObj)
        }
      })
  
      upload.start()
    })
  }
  export function getImage(
    id,
    options = {
      q: 80,
      w: null,
      h: null,
    },
  ) {
    if (!id) {
      console.log("image id gelmedi")
      return COMPANY.LOADING_GIF_PATH
    }
    if (isImageFrom(MEDIA_STORE_TYPES.CLOUDINARY, id)) {
      return getImageFromClodinary(id, options)
    } else {
      return `${COMPANY.IMAGE_URL_ORIGIN}cdn/storage/Images/${id}/original/${id}.jpg`
    }
  }
  