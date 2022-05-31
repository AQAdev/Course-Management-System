import { FC, useEffect, useState } from "react";
import Progressbar from "../../components/progress-bar";
import CourseDetial from "../../components/course-detials";
import PageContainor from "../../components/page-containor";
import { TEACHER } from "../../constants/role";
import { useLocation } from "react-router-dom";
import { Loader } from "../../components/loader";
import { teacherGetAttendanceSummery } from "../../Api/attendance";
import { ErrorPage } from "../../components/error";

interface ITable {
  data: any;
}

const Table: FC<ITable> = ({ data }) => {
  return (
    <table id="customers">
      <tr>
        <th className="w-[400px]">Name</th>
        <th>Credit Hours</th>
      </tr>
      {data.map((el: any, key: any) => (
        <tr key={key}>
          <td>{el.name}</td>
          <div
            key={key}
            className="flex justify-center items-center space-x-2 my-3"
          >
            <Progressbar attendance={el.attendance * 100}></Progressbar>
          </div>
        </tr>
      ))}
    </table>
  );
};
const AttendanceSummery = () => {
  const location: any = useLocation();
  //   courseObject ,date, url
  const url: any = location?.state?.url;
  const [loading, setLoading] = useState(false);
  const [summery, setSummery] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await teacherGetAttendanceSummery(
        url?.courseObject?.course_id._id
      );
      console.log({ data });
      if (data) {
        setSummery(data.attendance);
        setLoading(false);
      }
    };
    getData();
  }, []);
  if (!location.state) {
    return <ErrorPage message="Please Select Batch Thank you"></ErrorPage>;
  }
  return (
    <>
      <PageContainor role={TEACHER}>
        <>
          <div className="space-y-4">View Attendance-Attendance</div>

          <CourseDetial
            title={"Computer Programming"}
            teacher="Numrash"
            creditHours="3"
          ></CourseDetial>

          {loading || !summery.length ? (
            <Loader />
          ) : (
            <>
              <Table data={summery}></Table>
            </>
          )}
        </>
      </PageContainor>
    </>
  );
};

export default AttendanceSummery;
