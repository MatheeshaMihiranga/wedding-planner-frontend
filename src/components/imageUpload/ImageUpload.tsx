import { useState } from "react";
import { storage } from "../../config/fireabse";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { CustomButton } from "../button/Button";
import { Grid } from "semantic-ui-react";

function ImageUpload({ returnImageUrl }: any) {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const file = e.target?.files[0];
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        e.target.value = null;
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: any) => {
          returnImageUrl(downloadURL);
          e.target.value = null;
        });
      }
    );
  };

  return (
    <Grid className="App">
      <Grid.Column computer={16}>
        <input type="file" onChange={handleSubmit} />
      </Grid.Column>
    </Grid>
  );
}
export default ImageUpload;
