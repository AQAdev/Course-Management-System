import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { FC, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { studentAttendanceCourse } from "../../Api/attendance";
import CustomDropDown from "../../components/custom-dropdown";
import { Loader } from "../../components/loader";
import PageContainor from "../../components/page-containor";
import ProgressBar from "../../components/progress-bar";
import { ADMIN, STUDENT, TEACHER } from "../../constants/role";
import { URL } from "../../constants/url";
import { getUser } from "../../utils/localStorageFunctions";

interface ICourseTile {
  title: string;
  session: string;
  stdClass: string;
  section: string;
}
const filterUrl = (
  title: string,
  session: string,
  stdClass: string,
  section: string
) => {
  return "url";
};
export const ButtonDropDown: FC<ICourseTile> = ({
  title,
  session,
  stdClass,
  section,
}) => {
  const [showLink, setShowLink] = useState(false);
  const link = URL + filterUrl(title, session, stdClass, section);
  console.log(link);
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
            <div className="p-2 hover:bg-green-400 cursor-pointer">
              View Attendace
            </div>
            <div className="p-2 hover:bg-green-400 cursor-pointer">
              Mark Attendace
            </div>
            <div className="p-2 hover:bg-green-400 cursor-pointer">
              View Summery
            </div>
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
  attendace: Number;
  course_id: string;
  hours: string;
}

export const CourseTile: FC<ICourseTile> = ({
  title,
  attendace,
  course_id,
  hours,
}) => {
  const { user_information } = getUser();
  return (
    <div className="w-full p-2 flex justify-between items-cente border-b-2 mt-3">
      <div className="text-xl">{title}</div>
      <div className="text-xl w-2/4 flex justify-center items-center">
        <ProgressBar attendance={attendace}></ProgressBar>
      </div>
      <div className="text-xl">
        <div className="bg-green-700  hover:cursor-pointer  py-2 px-8 text-white rounded flex flex-col justify-center items-center">
          <Link
            to="/student/individualcourseattendance"
            state={{
              courseObject: user_information,
              url: "",
              course_id: course_id,
              hours: hours,
            }}
          >
            <>View</>
          </Link>
        </div>
      </div>
    </div>
  );
};

const StudentCoursesAttendance: FC = () => {
  const { user_information } = getUser();
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const qs = `?section=${user_information.stdSection}&batch=${user_information.stdBatch}&program=${user_information.stdProgram}&courseSemester=${user_information.stdSemester}&students=${user_information._id}`;

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const data = await studentAttendanceCourse(qs);
      console.log({ data });

      if (!!data?.student_attendance) {
        setCourses(data.student_attendance);
        setLoading(false);
      }
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <PageContainor role={STUDENT}>
      <>
        <h2 className="mb-8 text-gray-500">Attendance</h2>

        {loading || !courses.length ? (
          <>
            <Loader></Loader>
          </>
        ) : (
          <>
            {courses.map((el: any) => (
              <CourseTile
                title={el?.course_name}
                course_id={el?.course}
                hours={el.hours + ""}
                session="SP18-BSE"
                stdClass="2"
                section="C"
                attendace={Number(el?.attendance * 100)}
              ></CourseTile>
            ))}
          </>
        )}
      </>
    </PageContainor>
  );
};

export default StudentCoursesAttendance;
