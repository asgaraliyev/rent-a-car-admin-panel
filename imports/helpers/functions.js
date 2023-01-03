import { notification } from "antd";
import { CustomersCol } from "../api/customers/collection";
import FilesCol from "../api/files/collection";
import slugify from "slugify";

export function makeSlug(text){
  return slugify(text)+`${parseInt(Math.random()*10000)}`
}
export function uploadToServer({ Col = FilesCol, file, other }) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("File cannot be null");
    }

    const upload = Col.insert({ file, chunkSize: "dynamic", ...other }, false);
    upload.on("end", function (error, fileObj) {
      if (error) {
        reject(`Error during upload: ${error}`);
      } else {
        resolve(fileObj);
      }
    });

    upload.start();
  });
}
export function getImage(
  id,
  options = {
    q: 80,
    w: null,
    h: null,
  }
) {
  if (!id) {
    console.log("image id gelmedi");
    return COMPANY.LOADING_GIF_PATH;
  }
  if (isImageFrom(MEDIA_STORE_TYPES.CLOUDINARY, id)) {
    return getImageFromClodinary(id, options);
  } else {
    return `${COMPANY.IMAGE_URL_ORIGIN}cdn/storage/Images/${id}/original/${id}.jpg`;
  }
}

export async function onProductFinish(values, callback) {
  if (values.imageIds?.fileList) {
    values.imageIds = values.imageIds.fileList.map(
      (file) => file.originFileObj
    );
    for (let index = 0; index < values.imageIds.length; index++) {
      const file = values.imageIds[index];
      if (file) {
        const fileObj = await uploadToServer({
          file,

          other: {
            meta: {
              product_id: values._id,
            },
          },
        });
      }
    }
  }

  Meteor.call("modify_product", values, (err, res) => {
    if (err) {
      console.log(err);
    }
    if (res) {
      notification.success({ message: "Uğurla modifikasiya edildi" });
      callback();
    }
  });
}
export async function onOrderFinish(values, callback) {
  if (values.date_range[0].toDate) values.date_range[0] = values.date_range[0].toDate()
  if (values.date_range[1].toDate) values.date_range[1] = values.date_range[1].toDate()
  const customer_doc = CustomersCol.findOne({ _id: values.customer_id })
  if (customer_doc.rating <= 1) {
    notification.error({ message: "Rating çox azdı maşını verə bilmərik" })
    return
  }
  Meteor.call("modify_order", values, (err, res) => {
    if (err) {
      console.log(err);
    }
    if (res) {
      notification.success({ message: "Uğurla modifikasiya edildi" });
      callback();
    }
  });
}
export async function onCustomerFinish(values, callback) {
  values.birth_date = values.birth_date.toDate()
  Meteor.call("modify_customer", values, (err, res) => {
    if (err) {
      console.log(err);
    }
    if (res) {
      notification.success({ message: "Uğurla modifikasiya edildi" });
      callback();
    }
  });
}


export async function onBannerFinish(values, callback) {
  if (values.imageIds?.fileList) {
    values.imageIds = values.imageIds.fileList.map(
      (file) => file.originFileObj
    );
    for (let index = 0; index < values.imageIds.length; index++) {
      const file = values.imageIds[index];
      if (file) {
        const fileObj = await uploadToServer({
          file,

          other: {
            meta: {
              banner_id: values._id,
            },
          },
        });
      }
    }
  }

  Meteor.call("modify_banner", values, (err, res) => {
    if (err) {
      console.log(err);
    }
    if (res) {
      notification.success({ message: "Uğurla modifikasiya edildi" });
      callback();
    }
  });
}

export async function onCategoryFinish(values, callback) {
  if (values.imageIds?.fileList) {
    values.imageIds = values.imageIds.fileList.map(
      (file) => file.originFileObj
    );
    for (let index = 0; index < values.imageIds.length; index++) {
      const file = values.imageIds[index];
      if (file) {
        const fileObj = await uploadToServer({
          file,

          other: {
            meta: {
              category_id: values._id,
            },
          },
        });
      }
    }
  }

  Meteor.call("modify_category", values, (err, res) => {
    if (err) {
      console.log(err);
    }
    if (res) {
      notification.success({ message: "Uğurla modifikasiya edildi" });
      callback();
    }
  });
}
export const authorization = () => {
  const { navigate } = this
  const res = {
    ready: false,
    user: Meteor.user(),
  };
  if (res.user === undefined) {
    res.ready = false;
  } else if (res.user === null) {
    console.log("user null du")
    navigate("/login");
    res.ready = true;
  } else if (res.user) {
    res.ready = false;
  }
  return res;
}