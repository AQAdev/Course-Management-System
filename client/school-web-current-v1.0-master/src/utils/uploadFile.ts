import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../config/firebase";

export const uploadFile = (file: any) => {
  if (!file) return;
  const storageRef = ref(storage, `/file/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapShot) => {
      const prog = Math.round(
        (snapShot.bytesTransferred / snapShot.totalBytes) * 100
      );
      //   setProgress(prog);
    },
    (err) => {
      console.log(err);
      //   setUploading(false);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        return url;
        // save to database
      });
    }
  );
};
