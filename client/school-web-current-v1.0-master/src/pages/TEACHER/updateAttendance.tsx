import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import moment from "moment";
import React, { Dispatch, FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { getAttendanceByTopic } from "../../Api/attendance";
import { getTopicByDate, getTopicByDateAndCourse } from "../../Api/topic";
import CourseDetial from "../../components/course-detials";
import { Loader } from "../../components/loader";
import { MessageLoader } from "../../components/message-loader";
import PageContainor from "../../components/page-containor";
import { ADMIN, TEACHER } from "../../constants/role";
import { getUser } from "../../utils/localStorageFunctions";

interface IRadioSet {
  setCreditHour: Dispatch<React.SetStateAction<string>>;
  setBulkAttendance: Dispatch<React.SetStateAction<any[]>>;
  bulkAttendance: any[];
}
interface ITableRadioSet {
  creditHour: string;
  setBulkAttendance: Dispatch<React.SetStateAction<any[]>>;
  bulkAttentance: any;
  students?: any;
}
const RadioSet: FC<IRadioSet> = ({
  setCreditHour,
  setBulkAttendance,
  bulkAttendance,
}) => {
  return (
    <div
      className="flex justify-center items-center space-x-2"
      onChange={(E: any) => {
        setCreditHour(E.target.value);
        const newData = bulkAttendance.map((items: any) => ({
          ...items,
          creditHour: E.target.value,
        }));
        setBulkAttendance(newData);
      }}
    >
      Credit hours :<label className="ml-4">0</label>
      <input type="radio" id="1" name="1" value="0" />
      <label className="ml-4">1</label>
      <input type="radio" id="1" name="1" value="1" />
      <br />
      <label>2</label>
      <input type="radio" id="1" name="1" value="2" />
      <br />
      <label>3</label>
      <input type="radio" id="1" name="1" value="3" />
      <div className="pr-14"></div>
    </div>
  );
};

interface IUnSelectedRadio {
  isCreditHourSelected: boolean;
  el: any;
  creditHour?: string;
  value: string;
}
const UnSelectedRadio: FC<IUnSelectedRadio> = ({
  isCreditHourSelected,
  el,
  creditHour,
  value,
}) => {
  return (
    <>
      {" "}
      <input
        disabled={isCreditHourSelected}
        type="radio"
        id={el.id}
        name={el.id}
        value={value}
        checked={creditHour === value ? true : false}
      />
      <label className="ml-4">{value}</label>
    </>
  );
};
const SelectedRadio: FC<IUnSelectedRadio> = ({
  isCreditHourSelected,
  el,
  value,
}) => {
  console.log({ el });

  return (
    <>
      {" "}
      <input
        // disabled={isCreditHourSelected}
        type="radio"
        id={el._id}
        name={el._id}
        value={value}
        checked={el.creditHour === value}
      />
      <label className="ml-4">{value}</label>
    </>
  );
};
const Table: FC<ITableRadioSet> = ({
  creditHour,
  setBulkAttendance,
  bulkAttentance,
  students,
}) => {
  const isCreditHourSelected = !!creditHour.length;

  return (
    <table id="customers">
      <tr>
        <th className="w-[400px]">Name</th>
        <th>Credit Hours</th>
      </tr>
      {students.map((el: any, key: any) => (
        <tr key={key}>
          <td>{el.student.stdName}</td>
          <div
            key={key}
            className="flex justify-center items-center space-x-2"
            // onChange={(E: any) => {
            //   const newData = bulkAttentance.map((items: any) =>
            //     items._id === el._id
            //       ? { ...items, creditHour: E.target.value }
            //       : items
            //   );
            //   setBulkAttendance(newData);
            // }}
          >
            Credit hours :<label className="ml-4">0</label>
            {!!creditHour.length ? (
              <>
                {/* <UnSelectedRadio
                  creditHour={creditHour}
                  el={el}
                  value="0"
                  isCreditHourSelected={isCreditHourSelected}
                ></UnSelectedRadio>
                <UnSelectedRadio
                  creditHour={creditHour}
                  el={el}
                  value="1"
                  isCreditHourSelected={isCreditHourSelected}
                ></UnSelectedRadio>
                <UnSelectedRadio
                  creditHour={creditHour}
                  el={el}
                  value="2"
                  isCreditHourSelected={isCreditHourSelected}
                ></UnSelectedRadio>
                <UnSelectedRadio
                  creditHour={creditHour}
                  el={el}
                  value="3"
                  isCreditHourSelected={isCreditHourSelected}
                ></UnSelectedRadio> */}
              </>
            ) : (
              <>
                <SelectedRadio
                  el={el}
                  value="0"
                  isCreditHourSelected={isCreditHourSelected}
                ></SelectedRadio>
                <SelectedRadio
                  el={el}
                  value="1"
                  isCreditHourSelected={isCreditHourSelected}
                ></SelectedRadio>
                <SelectedRadio
                  el={el}
                  value="2"
                  isCreditHourSelected={isCreditHourSelected}
                ></SelectedRadio>
                <SelectedRadio
                  el={el}
                  value="3"
                  isCreditHourSelected={isCreditHourSelected}
                ></SelectedRadio>
              </>
            )}
            <div className="pr-14"></div>
          </div>
        </tr>
      ))}
    </table>
  );
};

const UpdateAttendance: FC = () => {
  const location: any = useLocation();
  //   courseObject ,date, url
  const url: any = location?.state?.url;
  console.log({ url });
  const { user } = getUser();
  const ROLE = user.role === ADMIN ? ADMIN : TEACHER;

  const [topic, setTopic] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [creditHour, setCreditHour] = useState("");
  const [bulkAttentance, setBulkAttendance] = useState<any>(
    url?.courseObject?.students
  );
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTopicExists, setIsTopicExist] = useState(false);

  //   useEffect(() => {
  //     const addCreditHour = bulkAttentance.map((el: any) => ({
  //       ...el,
  //       creditHour: "0",
  //       date: moment().format("L"),
  //     }));
  //     setBulkAttendance(addCreditHour);
  //   }, []);

  //   useEffect to get data for the student for the topic and couese

  // load the data of attendance
  useEffect(() => {
    const getAllAttendance = async () => {
      const data = await getAttendanceByTopic(
        url?.courseObject?.course_id._id,
        url?.topic_id,
        url?.date
      );
      setAttendance(data.attendance);
    };
    getAllAttendance();
  }, []);
  useEffect(() => {
    // make an  api call to the topic and check if topic exist for the current subject on the given date
    const getTopic = async () => {
      const data: any = await getTopicByDateAndCourse(
        url?.date,
        url?.courseObject?.course_id._id
      );
      if (!!data.topic.length) {
        setTopic(data.topic[0].descriptiopn);
      }
    };
    getTopic();
  }, []);

  return (
    <PageContainor role={ROLE}>
      <>
        <div className="space-y-4">Mark-Attendamce</div>
        <CourseDetial
          title={url?.courseObject?.course_id?.course_title}
          teacher={url?.courseObject?.teacher?.tch_name}
          creditHours="3"
        ></CourseDetial>

        <div className="mt-6 pl-4"></div>

        <div className="pl-4">
          <label className="block"> Topic</label>
          <textarea
            id="w3review"
            name="w3review"
            rows={4}
            className="border-gray-300 border-2 w-full"
            onChange={(e) => {
              setTopic(e.target.value);
            }}
            value={topic}
            disabled
          ></textarea>

          {/* date and time picker */}
          <div className="flex justify-between items-center ">
            <div className="w-60 border-gray-300 border-2 p-3">{url?.date}</div>
            {/* if this checked add creidt to the user object */}
            {/* <RadioSet
              setBulkAttendance={setBulkAttendance}
              setCreditHour={setCreditHour}
              bulkAttendance={bulkAttentance}
            ></RadioSet> */}

            {/* read student information and display in a table */}
          </div>
          <div className="mt-4">
            {attendance.length !== 0 ? (
              <>
                <Table
                  creditHour={creditHour}
                  setBulkAttendance={setBulkAttendance}
                  bulkAttentance={bulkAttentance}
                  students={attendance}
                ></Table>
              </>
            ) : (
              <>
                <Loader></Loader>
              </>
            )}

            {/* {loading ? (
              !!message.length ? (
                <>
                  <MessageLoader message={message}></MessageLoader>
                </>
              ) : (
                <></>
              )
            ) : (
              <></>
            )} */}
            {/* <button
              onClick={() => {}}
              disabled={isTopicExists}
              className="w-[200px] mt-4 float-right flex justify-center items-center text-white p-4 px-8 bg-green-500 rounded"
            >
              Update Attendace
            </button> */}
          </div>
        </div>
      </>
    </PageContainor>
  );
};

export default UpdateAttendance;

// const AddAttendance = async (e: any) => {
//     e.preventDefault();
//     //add topic and get the course id
//     setLoading(true);
//     setMessage("Adding Topic to Database");
//     const topicData = await addTopic(topic, url?.courseObject?.course_id._id);
//     // console.log({ topicData });
//     if (topicData?.topic) {
//       setMessage("Adding Student Attendace to Database");
//       const makeAttendanceData = bulkAttentance.map((el: any) => ({
//         date: el.date.toString(),
//         courseSemester: el.stdSemester,
//         creditHour: el.creditHour,
//         course: url?.courseObject?.course_id._id,
//         student: el._id,
//         topic: topicData.topic._id,
//       }));

//       const attendance = await addAttendance(makeAttendanceData);
//       // console.log({ attendance });
//       if (attendance.attendance) {
//         setIsTopicExist(true);
//         setMessage("Attendance Marked");
//       }
//       setLoading(false);
//       return;
//     }
//     // setLoading(false);
//     setMessage("something went wrong");
//     // add attendance api call
//   };
