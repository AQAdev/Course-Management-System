import { useCallback, useEffect, useState } from "react";
import { getAllSelectedCourse } from "../../Api/course";

import { Loader } from "../../components/loader";
import PageContainor from "../../components/page-containor";
import { STUDENT } from "../../constants/role";
import { getUser } from "../../utils/localStorageFunctions";

export const StudentAllCourses = () => {
  const { user_information } = getUser();
  const [studentCourses, setStudentsCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      let data = await getAllSelectedCourse(
        `?students=${user_information._id}`
      );
      data = data.course;
      // data = data.map((el: any) => ({
      //   ...el,
      //   batch: JSON.parse(JSON.stringify(el.batch)),
      // }));
      setStudentsCourses(data);
      setLoading(false);
      console.log({ data });
    };
    getData();
  }, []);

  return (
    <>
      <PageContainor role={STUDENT}>
        <>
          {loading === true ? (
            <Loader></Loader>
          ) : (
            <>
              {studentCourses &&
                studentCourses.map((el: any, key: any) => (
                  <div key={key}>
                    <div>{el.data[0].batch.batch_name}</div>
                    <table id="customers">
                      <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Teacher</th>
                        <th>Class</th>

                        <th>Credit Hours</th>
                      </tr>
                      {el.data.map((els: any) => (
                        <tr>
                          <td>{els?.course_id?.course_code}</td>
                          <td>{els?.course_id?.course_title}</td>
                          <td>{els?.teacher?.tch_name}</td>
                          <td>
                            {els?.students[0]?.stdSemester}-
                            {els?.section?.sec_name}
                          </td>
                          <td>{Number(els?.course_id?.credit_hour) * 1}</td>
                        </tr>
                      ))}
                    </table>
                  </div>
                ))}
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
