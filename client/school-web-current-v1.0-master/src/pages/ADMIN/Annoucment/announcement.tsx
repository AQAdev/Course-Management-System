import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { FC, useEffect, useState } from "react";
import CustomButton from "../../../components/custom-buttom";
import InputFeild from "../../../components/input-feild";
import PageContainor from "../../../components/page-containor";
import { storage } from "../../../config/firebase";
import { ADMIN } from "../../../constants/role";
import { addNewAnnouncement, updateNewAnnouncement } from "./announcment";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { useLocation } from "react-router-dom";
interface INewAnnouncment {
  status?: string;
  object?: any;
}
const Announcemnt: FC<INewAnnouncment> = () => {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [file, setFile] = useState<any>(null);
  let [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);
  const [operation, setOperation] = useState("");
  let [object, setObject] = useState<any>();
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const notify = (text: string) => {
    toast(text);
    setProgress(0);
  };
  const location = useLocation();

  useEffect(() => {
    if (location.state !== null) {
      const { operation, object }: any = location.state;
      console.log({ object });
      setOperation(operation);
      setObject(object);
      if (operation === "UPDATE") {
        setTitle(object?.title);
        setDescription(object?.description);
        setImage(object?.image);
      }
    }
  }, []);
  useEffect(() => {
    if (image !== "") {
    }
  }, [image]);
  const addAnnouncment = () => {
    setTimeout(()=>{
      console.log("Add announcement");
      console.log(file);
    },1000)
    if (!(title?.length) || !(description?.length) || !(file)){
      return toast("Something is missing")
    }
    setImage("");
    setUploading(true);
    if (operation === "UPDATE") {
      uploadUpdatedFile();
    } else {
      uploadFile();
    }
  };

  const uploadFile = () => {
    if (!file) {
      // console.log("upload file is required");
      return toast("Something is missing")

    }
    const storageRef = ref(storage, `/file/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapShot) => {
        const prog = Math.round(
          (snapShot.bytesTransferred / snapShot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => {
        console.log(err);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImage(url);
          setUploading(false);
          // add to store latter when we apply redux here
          const ann_object = {
            title,
            description,
            url: url,
          };

          const uploadAnn = async () => {
            const data = await addNewAnnouncement(ann_object);
            if (data) {
              notify("File Upload....");
              setTitle("");
              setDescription("");
              setFile("");
            } else {
              notify("Fail to upload file");
            }
          };
          uploadAnn();

          // save to database
        });
      }
    );
  };

  const uploadUpdatedFile = () => {
    if (!file) {
      const updateObject = {
        title,
        description,
        url: object?.url,
      };
      console.log(updateObject);
      const uploadAnn = async () => {
        const data = await updateNewAnnouncement(object._id, updateObject);
        if (data) {
          setTitle("");
          setDescription("");
          setFile("");
          setUploading(false);
        } else {
          notify("Fail to upload file");
        }
      };
      uploadAnn();
      return;
      // call the method
    }
    const storageRef = ref(storage, `/file/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapShot) => {
        const prog = Math.round(
          (snapShot.bytesTransferred / snapShot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => {
        console.log(err);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImage(url);
          setUploading(false);
          // add to store latter when we apply redux here
          console.log({
            title,
            description,
            url: url,
          });
          const ann_object = {
            title,
            description,
            url: url,
          };

          const uploadAnn = async () => {
            const data = await updateNewAnnouncement(object._id, ann_object);
            if (data) {
              notify("File Upload....");
              setTitle("");
              setDescription("");
              setFile("");
            } else {
              notify("Fail to upload file");
            }
          };
          uploadAnn();

          // save to database
        });
      }
    );
  };

  const handleChange = (e:any)=>{
    // onChange={(e: any) => {
      console.log("handle chage");
      setMessage("");
      setFile(e.target.files[0]);
      // console.log("FIle")
      // console.log(e.target.files[0]);
      // console.log("uploading file......", uploading);
      const file = e.target.files[0];
      if (file && (file.type === "image/png" || file?.type === "image/jpg" || file?.type === "image/jpeg") && file.size / 1000000 <= 2) {
        console.log("good to go", file.type, file.size / 1000000);
      } else {
        console.warn("Invalud type of size");
        setMessage(
          "Invalid Type or Size, file size should less or 2mb and file type need to be .png, .jpg, .jpeg"
        );
      }
    // }}
  }

  return (
    <PageContainor role={ADMIN}>
      <div className="space-y-4 relative">
        <div
          className=" bg-red-500 rounded h-1"
          style={{
            width: progress + "%",
          }}
        ></div>

        <ToastContainer />
        <InputFeild
          input={title}
          setInput={setTitle}
          label="Title"
          placeholder="Enter the Title"
          
        ></InputFeild>

        <div className="flex">
          <div className="mr-20 flex justify-center pt-4">Data</div>
          <div className="w-full h-14 border-2 border-gray-400 rounded flex items-center px-3">
            {moment().format("L")}
          </div>
        </div>
        <div className="flex">
          <div className="w-32 flex felx-start">Details</div>

          <textarea
            placeholder="Enter title"
            rows={5}
            value={description}
            onChange={(e: any) => {
              setDescription(e.target.value);
            }}
            className=" text-gray-800  border-2 border-gray-400 outline-none  px-4 w-full rounded"
          ></textarea>
        </div>
        {uploading ? (
          <div className="text-center">Uploading File and Data</div>
        ) : (
          <div className="flex justify-between items-center">
            <div className="">
              <div className="w-32">Upload Image</div>
              <input
              onChange={handleChange}
                // onChange={(e: any) => {
                //   setMessage("");
                //   setFile(e.target.files[0]);

                //   const file = e.target.files[0];
                //   console.log(file.type);
                //   if (
                //     file &&
                //     file.type === "image/png" &&
                //     file.size / 1000000 <= 2
                //   ) {
                //     // console.log("good to go", file.type, file.size / 1000000);
                //   } else {
                //     console.warn("Invalud type of size");
                //     setMessage(
                //       "Invalid Type or Size, file size should less or 2mb and file type need to png"
                //     );
                //   }
                // }}
                type="file"
                placeholder="Enter title"
                className="bg-blue-500  text-white outline-none rounded"
              ></input>
            </div>
            {uploading ? <>Uploading file</> : <></>}
            <div className="items-center w-[510px] flex justify-end">
              {operation === "UPDATE" ? (
                <>
                  {message.length === 0 ? (
                    <>
                      <CustomButton
                        title="Update"
                        type="Update"
                        action={addAnnouncment}
                      ></CustomButton>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <>
                  {message.length === 0 ? (
                    <>
                      <CustomButton
                        title="Add"
                        type="Add"
                        action={addAnnouncment}
                      ></CustomButton>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
            <div className="bg-red-400 px-4  flex justify-center items-center rounded text-white">
              {message}
            </div>
          </div>
        )}
      </div>
    </PageContainor>
  );
};

export default Announcemnt;
