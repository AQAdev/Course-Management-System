import { useCallback, useEffect, useState } from "react";
import {
  getSelectedCourse,
  updateSelectedCourseStudents,
} from "../../Api/course";
import { getStatus } from "../../Api/registration-status";
import { Loader } from "../../components/loader";
import PageContainor from "../../components/page-containor";
import { ADMIN, STUDENT } from "../../constants/role";
import { getUser } from "../../utils/localStorageFunctions";
const FIXED_HOURS = 6;
export const StudentRegisterCourses = () => {
  const { user_information } = getUser();
  const [allCourses, setAllCourses] = useState([]);
  let [studentCourses, setStudentCourses] = useState<any>([]);
  // const [studentSelectedCourses, setStudentSelectedCourses] = useState([]);
  const [studentCoursesOrignal, setStudentCoursesOrignal] = useState([]);
  const [selectedCreditHour, setSelectedCreditHour] = useState(0);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [show, setShow] = useState(false);

  const listStudentCourses = () => {
    const data = allCourses.filter((el: any) => el._id === "user id");
    const getIds = data.map((el: any) => el._id);
    setStudentCourses([]);
    return [];
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getStatus();
      setShow(data[0]?.registration);
    };
    getData();
  });
  // get the course offer where semester, batch and program matched
  useEffect(() => {
    setLoading(true);
    const params = `?courseSemester=${user_information?.stdSemester}&batch=${user_information?.stdBatch}&program=${user_information?.stdProgram}`;
    const getData = async () => {
      const data = await getSelectedCourse(params);
      setStudentCoursesOrignal(data.course);
    };
    getData();
  }, [reload]);

  useEffect(() => {
    let duplicate = studentCoursesOrignal.map((el: any) => ({
      ...el,
      selected: false,
    }));

    // find student
    duplicate = duplicate.map((el: any) =>
      el.students.includes(user_information._id)
        ? { ...el, selected: true }
        : el
    );
    if (!!studentCoursesOrignal.length) {
      setLoading(false);
    }
    setStudentCourses(duplicate);
    // get the
  }, [studentCoursesOrignal]);

  useEffect(() => {
    let credithours = studentCourses.filter((El: any) => El.selected === true);
    credithours = credithours.reduce(
      (a: any, b: any) => Number(a) + Number(b?.course_id?.credit_hour),
      0
    );
    setSelectedCreditHour(credithours);
  }, [studentCourses]);

  const registerCourses = async () => {
    setLoading(true);
    const newData = studentCourses.map(async (el: any) => {
      let datas: any = await updateSelectedCourseStudents(`/${el._id}`, {
        students: el.students,
      });
      return { status: datas.data.status, data: datas.data.data.course };
    });
    const check = await Promise.all(newData);
    if (check) {
      setLoading(false);
    }
    const isRequestDone = check.every((el) => el.status === "success");
    if (isRequestDone) {
      setReload(!reload);
    }
  };
  return (
    <>
      <PageContainor role={STUDENT}>
        <>
          {loading === true ? (
            <Loader></Loader>
          ) : (
            <>
              {show ? (
                <>
                  {selectedCreditHour === 0 ? (
                    <></>
                  ) : (
                    <div className=" p-4 float-right rounded mb-2">
                      Credit Hour Selected :: {selectedCreditHour}
                    </div>
                  )}
                  <table id="customers">
                    <tr>
                      <th>😏</th>
                      <th>Course Name</th>
                      <th>Course Code</th>
                      <th>Teacher</th>
                      <th>Credit Hour</th>
                    </tr>
                    {studentCourses.map((el: any, key: any) => (
                      <tr key={key}>
                        <td>
                          <input
                            checked={el.selected}
                            disabled={
                              (el.selected && selectedCreditHour) >= 6
                                ? false
                                : selectedCreditHour < FIXED_HOURS
                                ? false
                                : true
                            }
                            onChange={() => {
                              const duplicate = studentCourses.map(
                                (el_student: any) =>
                                  el_student._id === el._id
                                    ? {
                                        ...el_student,
                                        selected: !el.selected,
                                        students: !el.selected
                                          ? [
                                              ...el_student.students,
                                              user_information._id,
                                            ]
                                          : el_student.students.length === 1
                                          ? []
                                          : el_student.students.splice(
                                              el_student.students.indexOf(
                                                user_information?._id
                                              ),
                                              el_student.students.indexOf(
                                                user_information?._id
                                              ) + 1
                                            ),
                                      }
                                    : {
                                        ...el_student,
                                      }
                              );
                              setStudentCourses(duplicate);
                            }}
                            name={`name-${key}`}
                            type="checkbox"
                          ></input>
                        </td>
                        <td>{el?.course_id?.course_title}</td>
                        <td>{el.course_id?.course_code}</td>
                        <td>{el?.teacher?.tch_name}</td>
                        <td>
                          {el?.course_id?.credit_hour.length > 1
                            ? el?.course_id?.credit_hour[1]
                            : el?.course_id?.credit_hour}
                        </td>
                      </tr>
                    ))}
                  </table>
                  <button
                    onClick={registerCourses}
                    disabled={selectedCreditHour > FIXED_HOURS}
                    className={`rounded ${
                      selectedCreditHour <= FIXED_HOURS
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }  p-2 w-60 flex justify-center items-center text-white float-right mt-4`}
                  >
                    Update Courses
                  </button>
                </>
              ) : (
                <div className="flex justify-center items-center">
                  Registartion disable
                </div>
              )}
            </>
          )}
        </>
      </PageContainor>
    </>
  );
};

// on select check box
// change the status to selected to tract which row is selected
// change the value student array if selected add the id else remove the id
// if only one item exist then on de-select remove the item
