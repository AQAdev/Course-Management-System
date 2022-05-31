import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { FC, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { getAllBtach } from "../../Api/batch";
import { teacherCourse } from "../../Api/teacher";

import CustomDropDown from "../../components/custom-dropdown";
import { Loader } from "../../components/loader";
import PageContainor from "../../components/page-containor";
import { ADMIN, TEACHER } from "../../constants/role";
import { URL } from "../../constants/url";
import { getUser } from "./../../utils/localStorageFunctions";

interface ICourseTile {
  title: string;
  session: string;
  stdClass: string;
  section: string;
}

export const ButtonDropDown: FC<any> = (url: string, courseObject: any) => {
  const [showLink, setShowLink] = useState(false);
  const { user } = getUser();
  return (
    <div
      className="bg-green-700  hover:cursor-pointer  py-2 px-4 text-white rounded flex flex-col justify-center items-center"
      onClick={() => {
        setShowLink(!showLink);
      }}
    >
      View
      {showLink ? (
        <div className="bg-gray relative">
          <div className="absolute w-36 -left-28 top-3 bg-green-700">
            {user.role === ADMIN ? (
              <>
                <Link
                  to="/admin/individualstudentattendance"
                  state={{ url: url, courseObject: courseObject }}
                >
                  <div className="p-2 hover:bg-green-400 cursor-pointer">
                    View Attendace
                  </div>
                </Link>
              </>
            ) : (
              <>
                {" "}
                <Link
                  to="/teacher/individualcourseattendance"
                  state={{ url: url, courseObject: courseObject }}
                >
                  <div className="p-2 hover:bg-green-400 cursor-pointer">
                    View Attendace
                  </div>
                </Link>
                <Link
                  to="/teacher/markattendance"
                  state={{ url: url, courseObject: courseObject }}
                >
                  <div className="p-2 hover:bg-green-400 cursor-pointer">
                    Mark Attendace
                  </div>
                </Link>
                <Link
                  to="/teacher/attendanceSummery"
                  state={{ url: url, courseObject: courseObject }}
                >
                  <div className="p-2 hover:bg-green-400 cursor-pointer">
                    View Summery
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

interface ICourseTile {
  title: string;
  session: string;
  stdClass: string;
  section: string;
  url: string;
  courseObject: any;
}

export const CourseTile: FC<ICourseTile> = ({
  title,
  session,
  stdClass,
  section,
  url,
  courseObject,
}) => {
  return (
    <div className="w-full p-2 flex justify-between items-cente border-b-2 mt-3">
      <div className="text-xl">{title}</div>
      <div className="text-xl">
        {session}-{stdClass}-{section}
      </div>
      <ButtonDropDown url={url} courseObject={courseObject}></ButtonDropDown>
    </div>
  );
};

const Attendance: FC = () => {
  const [batchObject, setBatchObject] = useState([]);
  const [batch, setBatch] = useState([]);
  const [dropDownValue, setDropDownValue] = useState("");
  const [teacherCourses, setTeacherCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, user_information } = getUser();
  const ROLE = user.role === ADMIN ? ADMIN : TEACHER;

  // teacher id and session get the subject
  useEffect(() => {
    const getBatch = async () => {
      const data = await getAllBtach();
      setBatchObject(data.batch);
      const batches = data.batch.map((el: any) => el.batch_name);
      setBatch(batches);
    };
    getBatch();
  }, []);
  // console.log("batch name")
  // console.log(batchObject)
  // console.log(dropDownValue);`

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      // get batch_name
      const dropDownValueID: any = batchObject.find(
        (el: any) => el.batch_name === dropDownValue
      );
      // console.log("skdsdsdsd");
      console.log(dropDownValueID?._id);
      let qureyString = "";
      if (user.role === TEACHER) {
        console.log("teacher")
        qureyString = `?teacher=${user_information._id}&batch=${dropDownValueID?._id}`;
      }
      if (user.role === ADMIN) {
        console.log("admin")
        qureyString = `?batch=${dropDownValueID?._id}`;
      }
      const data = await teacherCourse(qureyString);
      setTeacherCourses(data.course);
      console.log(data.course);
      setLoading(false);
    };
    getData();
  }, [dropDownValue]);
  return (
    <PageContainor role={ROLE}>
      <>
        {!!batch.length ? (
          <>
            <CustomDropDown
              dropDownValue={dropDownValue}
              setDropDownValue={setDropDownValue}
              placeHolder="Select Session"
              lable="Select Session"
              w="20%"
              items={!!batch && batch}
            ></CustomDropDown>
          </>
        ) : (
          <></>
        )}
        {!loading ? (
          !!teacherCourses.length ? (
            teacherCourses.map((el: any, key: any) => (
              
              <CourseTile
                key={key}
                title={el.course_id.course_title}
                session={el.batch.batch_name + "-" + el.program.prog_name}
                stdClass={el.courseSemester}
                section={el.section.sec_name}
                url={`?teacher=${el?.teacher?._id}&course_id=${el?.course_id?._id}&section=${el?.section?._id}&courseSemester=${el?.courseSemester}&batch=${el?.batch?._id}`}
                courseObject={el}
              ></CourseTile>
            ))
          ) : (
            <div className="flex justify-center items-center">
              No Course Found for this Session
            </div>
          )
        ) : (
          <Loader></Loader>
        )}
      </>
    </PageContainor>
  );
};

export default Attendance;
