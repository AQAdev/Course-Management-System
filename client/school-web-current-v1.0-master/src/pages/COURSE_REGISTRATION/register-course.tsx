import { FC, useEffect, useState } from "react";
import { getAllBtach, getAllProgram } from "../../Api/batch";
import {
  addSelectedCourse,
  getCourse,
  getCourseByCourseCode,
} from "../../Api/course";
import { getAllTeacher, teacherCourse } from "../../Api/teacher";
import { Loader } from "../../components/loader";
import PageContainor from "../../components/page-containor";
import { ADMIN } from "../../constants/role";

export const RegisterCourses: FC = () => {
  const [course_code, setCourseCode] = useState("");
  const [loading, setLoading] = useState(false);
  let [course, setCourse] = useState<any>();
  const [message, setMessage] = useState("");
  const [teacher, setTeacher] = useState("");
  const [preReq, setPreReq] = useState("");

  const [allCourses, setAllCourses] = useState([]);

  const [allTeacher, setAllTeacher] = useState([]);
  // all program

  // all courses

  useEffect(() => {
    const getData = async () => {
      const data = await getAllTeacher();
      console.log({ data });
      setAllTeacher(data.teacher);
    };
    getData();
  }, []);
  useEffect(() => {
    const getData = async () => {
      const courses = await getCourse();
      console.log({ courses });
      setAllCourses(courses.course);
    };
    getData();
  }, []);
  // get data by id
  useEffect(() => {
    const getData = async () => {
      const courses = await getCourseByCourseCode(course_code);
      console.log({ courses });
      setCourse(courses?.course);
      // setAllCourses(courses.course);
    };
    getData();
  }, [course_code]);
  const onSubmit = async () => {
    const object = {
      course_id: course?._id,
      courseSemester: course?.semester,
      section: "6249396a49fd2c276b409211",
      batch: course?.batch?._id,
      program: course?.program?._id,
      teacher: teacher,
      active: true,
      students: [],
    };
    console.log({ object });
    const courses1 = await addSelectedCourse(object);
    console.log({ courses1 });

    // setLoading(true);
  };
  return (
    <>
      <PageContainor role={ADMIN}>
        <div>
          <div className="grid xl:grid-cols-2 xl:gap-6">
            <div className="relative z-0 mb-6 w-full group flex flex-col ">
              <label className="mr-8 mt-2">Course Code</label>

              <select
                onChange={(E: any) => {
                  setCourseCode(E.target.value);
                }}
                className=" bg-green-500 w-full py-2 rounded text-white"
              >
                {allCourses.map((el: any, key: any) => (
                  <option key={key} value={el?._id}>
                    {el?.course_code}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid xl:grid-cols-2 xl:gap-6 ">
            <div className="relative z-0 mb-6 w-full group flex flex-col ">
              <input
                type="text"
                name=""
                id=""
                value={course?.course_title}
                className="w-full border-2 p-2"
                disabled
              />
            </div>
            <div className="relative z-0 mb-6 w-full group flex flex-col">
              <input
                type="text"
                name=""
                id=""
                value={course?.type}
                className="w-full border-2 p-2"
                disabled
              />
            </div>
          </div>

          <div className="grid xl:grid-cols-2 xl:gap-6 ">
            <div className="relative z-0 mb-6 w-full group flex flex-col ">
              <label className="mr-8 mt-2">Pre-Req</label>

              <select
                onChange={(E: any) => {
                  setPreReq(E.target.value);
                }}
                className=" bg-green-500 w-full py-2 rounded text-white"
              >
                {allCourses.map((el: any, key: any) => (
                  <option key={key} value={el?._id}>
                    {el?.course_code}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative z-0 mb-6 w-full group flex flex-col">
              <label className="mr-8 mt-2">Teacher</label>
              <select
                onChange={(E: any) => {
                  setTeacher(E.target.value);
                }}
                className=" bg-green-500 w-full py-2 rounded text-white"
              >
                {allTeacher.map((el: any, key: any) => (
                  <option key={key} value={el?._id}>
                    {el?.tch_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid xl:grid-cols-2 xl:gap-6 ">
            <div className="relative z-0 mb-6 w-full group flex flex-col ">
              <input
                type="text"
                name=""
                id=""
                value={course?.batch?.batch_name}
                className="w-full border-2 p-2"
                disabled
              />
            </div>
            <div className="relative z-0 mb-6 w-full group flex flex-col">
              <input
                type="text"
                name=""
                id=""
                value={course?.program?.prog_name}
                className="w-full border-2 p-2"
                disabled
              />
            </div>
          </div>
          <div className="grid xl:grid-cols-2 xl:gap-6 ">
            <div className="relative z-0 mb-6 w-full group flex flex-col ">
              <input
                type="text"
                name=""
                id=""
                value={"Credit Hours - " + course?.credit_hour}
                className="w-full border-2 p-2"
                disabled
              />
            </div>
            <div className="relative z-0 mb-6 w-full group flex flex-col">
              <input
                type="text"
                name=""
                id=""
                value={"Semeter  - " + course?.semester}
                className="w-full border-2 p-2"
                disabled
              />
            </div>
          </div>

          {loading ? (
            <Loader></Loader>
          ) : (
            <button
              disabled={loading}
              type="submit"
              onClick={onSubmit}
              className={`text-white float-right
              bg-green-700 cursor-pointer
             focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}
            >
              Activate Course
            </button>
          )}
        </div>
      </PageContainor>
    </>
  );
};
