import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { constants } from "zlib";
import { getAllBtach, getAllProgram, getAllSection } from "../../Api/batch";
import { getAllTeacher } from "../../Api/teacher";
import { addTimeTable, delTimeTable, getTimetable } from "../../Api/time-table";
import CustomButton from "../../components/custom-buttom";
import CustomDropDown from "../../components/custom-dropdown";
import { DownloadButton } from "../../components/download-file";
import { Loader } from "../../components/loader";
import PageContainor from "../../components/page-containor";
import { storage } from "../../config/firebase";
import { ADMIN } from "../../constants/role";
const data = [
  "America",
  "India",
  "Australia",
  "Argentina",
  "Ireland",
  "Indonesia",
  "Iceland",
  "Japan",
];
const TimeTable: FC = () => {
  const [dropValue, setDropValue] = useState("");
  const [whichRole, setWhichRole] = useState("");
  const [selectProgram, setSelectProgram] = useState<any>("");
  const [selectTeacher, setSelectedTeacher] = useState<any>("");
  const [selectBatch, setSelectBatch] = useState<any>("");
  const [selectSection, setSelectSection] = useState<any>("");
  let [selectFile, setSelectFile] = useState<any>("");
  let [progress, setProgress] = useState<any>("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [batch, setBatch] = useState([]);
  const [program, setProgram] = useState([]);
  const [section, setSection] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [update, setUpdate] = useState(false);
  const [timeTable, setTimeTable] = useState([]);
  const [reload, setReload] = useState(false);
  const notify = (text: string) => {
    toast(text);
    setProgress(0);
  };
  const uploadFile = () => {
    if (!selectFile) return;
    setUploading(true);
    const storageRef = ref(storage, `/file/${selectFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectFile);

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
          console.log(url);
          // add to store latter when we apply redux here
          if (whichRole === "Student") {
            const ann_object = {
              date: moment().format("L"),
              url: url,
              batch: selectBatch,
              section: selectSection,
              program: selectProgram,
              // teacher: selectTeacher,
            };
            // console.log(ann_object);

            const uploadAnn = async () => {
              // const data = await addNewAnnouncement(ann_object);
              const data = await addTimeTable(ann_object);
              if (data) {
                notify("Time Table Upload....");
                setSelectFile("");
                setReload(!reload);
              } else {
                // notify("Fail to upload file");
              }
            };
            uploadAnn();
          }
          if (whichRole === "Teacher") {
            const ann_object = {
              date: moment().format("L"),
              url: url,
              teacher: selectTeacher,
            };
            console.log(ann_object);

            const uploadAnn = async () => {
              // const data = await addNewAnnouncement(ann_object);
              const data = await addTimeTable(ann_object);
              if (data) {
                notify("Time Table Upload....");
                setSelectFile("");
                setReload(!reload);
              } else {
                // notify("Fail to upload file");
              }
            };
            uploadAnn();
          }
          setUpdate(false);
          // save to database
        });
      }
    );
  };

  useEffect(() => {
    const getData = async () => {
      // get batch
      const data = await getAllBtach();
      setBatch(data.batch);
      setSelectBatch(data.batch[0]._id);
    };
    getData();
  }, []);
  useEffect(() => {
    const getData = async () => {
      // get Program
      const data = await getAllProgram();
      setProgram(data.progam);
      setSelectProgram(data.progam[0]._id);
    };
    getData();
  }, []);
  useEffect(() => {
    const getData = async () => {
      // get Section
      const data = await getAllSection();
      setSection(data.section);
      setSelectSection(data.section[0]._id);
    };
    getData();
  }, []);
  useEffect(() => {
    const getData = async () => {
      // get Teacher
      const data = await getAllTeacher();
      setTeacher(data.teacher);
      setSelectedTeacher(data.teacher[0]._id);
    };
    getData();
  }, []);
  useEffect(() => {
    const getData = async () => {
      // get Teacher
      const data = await getTimetable();
      console.log({ data });
      setTimeTable(data);
    };
    getData();
  }, [reload]);

  const deleteTimeTable = (id: any) => {
    const deletes = async (ids: any) => {
      const data = await delTimeTable(ids);
      console.log(data);
      if (data === 201) {
        setReload(!reload);
      }
    };
    deletes(id);
  };
  return (
    <PageContainor role={ADMIN}>
      <>
        <ToastContainer />

        {whichRole !== "" ? (
          <></>
        ) : (
          <>
            <div className="flex space-x-2 justify-between mb-2">
              <select
                onChange={(E: any) => {
                  // setPreReq(E.target.value);
                }}
                className=" bg-green-500 p-2 rounded text-white "
              >
                {["Student", "Teacher"].map((el: any, key: any) => (
                  <option key={key} value={el}>
                    {el}
                  </option>
                ))}
              </select>
              <div className="flex space-x-2">
                <CustomButton
                  title="Student Time Table"
                  type="Add"
                  action={() => {
                    setWhichRole("Student");
                    setUpdate(false);
                  }}
                ></CustomButton>
                <CustomButton
                  title="Teacher Time Table"
                  type="Add"
                  action={() => {
                    setWhichRole("Teacher");
                    setUpdate(false);
                  }}
                ></CustomButton>
              </div>
            </div>
            <div className="space-y-1">
              {/*  */}
              {timeTable.map((el: any, key: any) => (
                <div className="border-b-2 py-1" key={key}>
                  <div className="flex justify-between items-center">
                    <h6>Time Table</h6>
                    <>
                      {el?.teacher?._id
                        ? el.teacher.tch_name
                        : el.program.prog_name + "-" + el.section.sec_name}
                    </>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setUpdate(true);
                          if (el?.teacher?._id) {
                            setSelectedTeacher(el.teacher.tch_name);
                            setWhichRole("Teacher");
                          } else {
                            setSelectBatch(el.batch._id);
                            setSelectProgram(el.program._id);
                            setSelectSection(el.section._id);
                            setWhichRole("Student");
                          }
                        }}
                        className="bg-yellow-400 rounded p-2 px-6 text-white cursor-pointer"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => {
                          deleteTimeTable(el._id);
                        }}
                        className="bg-red-400 rounded p-2 px-6 text-white cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        <div className="flex flex-col h-full">
          {/* row 1 */}

          {/* row 2 */}
          {whichRole === "Student" ? (
            <>
              <div className="flex flex-col space-y-3">
                <CustomButton
                  title="Back"
                  type="Add"
                  action={() => {
                    setWhichRole("");
                  }}
                ></CustomButton>
                <select
                  disabled={update}
                  onChange={(E: any) => {
                    setSelectProgram(E.target.value || selectProgram);
                  }}
                  className="w-full  bg-green-500 w-fill py-2 rounded text-white"
                >
                  {program.map((el: any, key: any) => (
                    <option key={key} value={el._id}>
                      {el.prog_name}
                    </option>
                  ))}
                </select>
                <select
                  disabled={update}
                  onChange={(E: any) => {
                    setSelectSection(E.target.value);
                  }}
                  className="w-full  bg-green-500 w-fill py-2 rounded text-white"
                >
                  {section.map((el: any, key: any) => (
                    <option key={key} value={el._id}>
                      {el.sec_name}
                    </option>
                  ))}
                </select>
                <select
                  disabled={update}
                  onChange={(E: any) => {
                    setSelectBatch(E.target.value);
                  }}
                  className="w-full  bg-green-500 w-fill py-2 rounded text-white"
                >
                  {batch.map((el: any, key: any) => (
                    <option key={key} value={el._id}>
                      {el.batch_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* upload btn */}

              <div className="">
                <div className="w-[150px] my-2">Upload Time Table</div>
                <input
                  onChange={(e: any) => {
                    setMessage("");
                    console.log(e.target.files[0]);
                    setSelectFile(e.target.files[0]);
                    console.warn("testing");
                    const file = e.target.files[0];
                    if (
                      file &&
                      file.type === "application/pdf" &&
                      file.size / 1000000 <= 20
                    ) {
                      // console.log("good to go", file.type, file.size / 1000000);
                    } else {
                      console.warn("Invalud type of size");
                      setMessage(
                        "Invalid Type or Size, file size should less or 20mb and file type need to be pdf"
                      );
                    }
                  }}
                  type="file"
                  placeholder="Enter title"
                  className="bg-blue-500  text-white outline-none rounded"
                ></input>
              </div>
              {/* <a href={image} target="_blank" download> */}
              {/* Click to download */}
              {/* </a> */}
              {/* upload the pdf button */}
              {uploading ? (
                <Loader></Loader>
              ) : (
                <div className="flex flex-1 justify-center px-4 items-center">
                  <CustomButton
                    title="Upload"
                    type="Add"
                    action={() => {
                      // console.log("testing Delete ...");
                      if (!selectFile) {
                        setMessage("Select File");
                        return;
                      }
                      uploadFile();
                    }}
                  ></CustomButton>
                </div>
              )}
              <div className="bg-red-400 px-4  flex justify-center items-center rounded text-white">
                {message}
              </div>
            </>
          ) : whichRole === "Teacher" ? (
            <>
              <div className="flex flex-col space-y-3">
                <CustomButton
                  title="Back"
                  type="Add"
                  action={() => {
                    setWhichRole("");
                  }}
                ></CustomButton>
                <select
                  disabled={update}
                  onChange={(E: any) => {
                    setSelectedTeacher(E.target.value);
                  }}
                  className="w-full  bg-green-500 w-fill py-2 rounded text-white"
                >
                  {teacher.map((el: any, key: any) => (
                    <option key={key} value={el._id}>
                      {el.tch_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* upload btn */}

              <div className="">
                <div className="w-[150px] my-2">Upload Time Table</div>
                <input
                  onChange={(e: any) => {
                    setMessage("");
                    console.log(e.target.files[0]);
                    setSelectFile(e.target.files[0]);
                    console.warn("testing");
                    const file = e.target.files[0];
                    if (
                      file &&
                      file.type === "application/pdf" &&
                      file.size / 1000000 <= 20
                    ) {
                      // console.log("good to go", file.type, file.size / 1000000);
                    } else {
                      console.warn("Invalud type of size");
                      setMessage(
                        "Invalid Type or Size, file size should less or 20mb and file type need to pdf"
                      );
                    }
                  }}
                  type="file"
                  placeholder="Enter title"
                  className="bg-blue-500  text-white outline-none rounded"
                ></input>
              </div>

              {/* upload the pdf button */}
              {uploading ? (
                <Loader></Loader>
              ) : (
                <div className="flex flex-1 justify-center px-4 items-center">
                  <CustomButton
                    title="Upload"
                    type="Add"
                    action={() => {
                      // console.log("testing Delete ...");
                      if (!selectFile) {
                        setMessage("Select File");
                        return;
                      }
                      uploadFile();
                    }}
                  ></CustomButton>
                </div>
              )}
              <div className="bg-red-400 px-4  flex justify-center items-center rounded text-white">
                {message}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </>
    </PageContainor>
  );
};

export default TimeTable;
