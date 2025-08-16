export const uploadToCloudnary = async (pics) => {
  if (pics) {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "twitter_clone");
    data.append("cloud_name", "deu2m62lt");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/deu2m62lt/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const fileData = await res.json();
    return fileData.secure_url || fileData.url;
  } else {
    console.error("No file passed to upload function");
    return null;
  }
};
