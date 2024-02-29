import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dvrcdxqex",
  },
  url: {
    secure: true,
  },
});

export default cld;
