import { FC, useEffect, useState } from "react";
import { getAllBtach, getAllProgram } from "../../Api/batch";
import { addCourse } from "../../Api/course";
import { Loader } from "../../components/loader";
import PageContainor from "../../components/page-containor";
import { ADMIN } from "../../constants/role";
import { CourseTile } from "../COURSE/attendance";

export const AddCourses: FC = () => {
  const [coruse_name, setCourseName] = useState("");
  const [course_code, setCourseCode] = useState("");
  const [type, setType] = useState("Course");
  let [batch, setBatch] = useState<any>("");
  const [program, setProgram] = useState("");
  const [semester, setSemeter] = useState("1");
  const [creditHour, setCreditHour] = useState("3");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [allProgram, setAllProgram] = useState<any>([]);
  const [allBatch, setAllBatch] = useState<any>([]);

  useEffect(() => {
    setBatch(allBatch[0]?.batch_name);
    setProgram(allProgram[0]?.prog_name);
  }, [allBatch, allProgram]);

  // all program
  useEffect(() => {
    const getData = async () => {
      let data = await getAllBtach();
      data = data.batch;
      setAllBatch(data);
      console.log({ data });
    };
    getData();
  }, []);
  // all courses
  useEffect(() => {
    const getData = async () => {
      let data = await getAllProgram();
      data = data.progam;
      setAllProgram(data);
    };
    getData();
  }, []);

  const onSubmit = async () => {
    if (!coruse_name.length && !course_code.length) {
      setMessage("Filled the Empty Feilds");
      return;
    }
    const object = {
      course_title: coruse_name,
      course_code: course_code,
      credit_hour: creditHour,
      active: true,
      batch: batch,
      semester: semester,
      program: program,
      type: type,
    };
    setLoading(true);
    const data = await addCourse(object);
    console.log({ data });
    if (data.course) {
      setLoading(false);
      setMessage("Course Added Successfully");
    }
    setLoading(false);
  };
  return (
    <>
      <PageContainor role={ADMIN}>
        <div>
          <div className="grid xl:grid-cols-2 xl:gap-6">
            <div className="relative z-0 mb-6 w-full group">
              <input
                value={course_code}
                type="text"
                name="floating_first_name"
                id="floating_first_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={(e) => {
                  setCourseCode(e.target.value);
                  setMessage("");
                }}
              />
              <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Course Code{" "}
              </label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="text"
                value={coruse_name}
                name="floating_last_name"
                id="floating_last_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={(e) => {
                  setCourseName(e.target.value);
                  setMessage("");
                }}
              />
              <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Course Name
              </label>
            </div>
          </div>
          <div className="grid xl:grid-cols-2 xl:gap-6 ">
            <div className="relative z-0 mb-6 w-full group flex flex-col ">
              <label className="mr-8 mt-2">Course Type</label>

              <select
                onChange={(E: any) => {
                  setType(E.target.value);
                }}
                className=" bg-green-500 w-full py-2 rounded text-white"
              >
                {["Lab", "Course"].map((el: any, key: any) => (
                  <option key={key} value={el}>
                    {el}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative z-0 mb-6 w-full group flex flex-col">
              <label className="mr-8 mt-2">Credit Hour</label>
              <select
                onChange={(E: any) => {
                  setType(E.target.value);
                }}
                className=" bg-green-500 w-full py-2 rounded text-white"
              >
                {["1", "2", "3"].map((el: any, key: any) => (
                  <option key={key} value={el}>
                    {el}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid xl:grid-cols-2 xl:gap-6 ">
            <div className="relative z-0 mb-6 w-full group flex flex-col ">
              <label className="mr-8 mt-2">Batch</label>

              <select
                onChange={(E: any) => {
                  setBatch(E.target.value);
                }}
                className=" bg-green-500 w-full py-2 rounded text-white"
              >
                {allBatch.map((el: any, key: any) => (
                  <option key={key} value={el?._id}>
                    {el?.batch_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative z-0 mb-6 w-full group flex flex-col">
              <label className="mr-8 mt-2">Program</label>
              <select
                onChange={(E: any) => {
                  setProgram(E.target.value);
                }}
                className=" bg-green-500 w-full py-2 rounded text-white"
              >
                {allProgram.map((el: any, key: any) => (
                  <option key={key} value={el?._id}>
                    {el?.prog_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid xl:grid-cols-2 xl:gap-6 ">
            <div className="relative z-0 mb-6 w-full group flex flex-col ">
              <label className="mr-8 mt-2"> Semeter</label>

              <select
                onChange={(E: any) => {
                  setSemeter(E.target.value);
                }}
                className=" bg-green-500 w-full py-2 rounded text-white"
              >
                {["1", "2", "3", "4"].map((el: any, key: any) => (
                  <option key={key} value={el}>
                    {el}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {loading ? (
            <Loader></Loader>
          ) : (
            <>
              <div className="bg-red-400 text-white px-4 rounded w-60">
                {message}
              </div>

              <button
                disabled={loading}
                type="submit"
                onClick={onSubmit}
                className={`text-white float-right
            bg-green-700 cursor-pointer
           focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}
              >
                Create Course
              </button>
            </>
          )}
        </div>
      </PageContainor>
    </>
  );
};
