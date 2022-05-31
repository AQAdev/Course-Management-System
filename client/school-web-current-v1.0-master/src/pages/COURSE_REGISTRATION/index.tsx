import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStatus, updateStatus } from "../../Api/registration-status";
import { Loader } from "../../components/loader";
import PageContainor from "../../components/page-containor";
import { ADMIN } from "../../constants/role";
// 6267d41512078e1a64658225
export const Course: FC = () => {
  const [show, setShow] = useState(false);
  let [object, setObject] = useState<any>("");
  let [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const data = await getStatus();
      setObject(data[0]);
      setShow(data[0]?.registration);
    };
    getData();
  }, [show]);

  const updateStatuss = async () => {
    setLoading(true);
    const data = await updateStatus(object._id, { registration: !show });
    setShow(data.registration);
    setLoading(false);
  };

  return (
    <>
      <PageContainor role={ADMIN}>
        <>
          {loading ? (
            <Loader></Loader>
          ) : (
            <>
              <div className="flex space-x-2">
                <div className="bg-green-500 rounded px-4 py-2 text-white cursor-pointer">
                  <Link to="/admin/addCourse">Add Course</Link>
                </div>
                <div className="bg-green-500 rounded px-4 py-2 text-white cursor-pointer">
                  <Link to="/admin/registerCourse">Register Course</Link>
                </div>
                {show ? (
                  <>
                    <div className="bg-red-500 rounded px-4 py-2 text-white cursor-pointer">
                      <button onClick={updateStatuss}>
                        Disable Registration{" "}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="bg-green-500 rounded px-4 py-2 text-white cursor-pointer">
                    <button onClick={updateStatuss}>
                      Enable Registration{" "}
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      </PageContainor>
    </>
  );
};
