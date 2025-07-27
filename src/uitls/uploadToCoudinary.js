export const uploadToCloudnary = async (pics) => {
  if (pics) {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "twitter_clone");
    data.append("cloud_name", "deu2m62lt");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/deu2m62lt/image/upload",
      {
        method: "post",
        body: data,
      }
    );

    const fileData = await res.json();
    return fileData.url.toString();
  } else console.log("error from upload function");
};
