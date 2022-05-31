import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageContainor from "../../../components/page-containor";
import { ADMIN, STUDENT, TEACHER } from "../../../constants/role";
import { getUser } from "../../../utils/localStorageFunctions";
import { deleteNewAnnouncement, getAllAnnouncement } from "./announcment";
import NewAnnounment from "./new-announcement";

const AllAnnouncment: FC = () => {
  const [viewAllAnnouncment, setViewAllAnnouncment] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = getUser();
  const [reload, setReload] = useState(false);
  let [singleAnn, setSingleAnn] = useState({
    title: "",
    url: "",
    description: "",
  });
  const [allAnn, setAllAnn] = useState([]);

  // search the anncoume
  const filterAnn = (id: string) => {
    const sA = allAnn.filter((el: any) => el._id === id);
    console.log(sA);
    setSingleAnn(sA[0]);
  };
  const deleteAnn = async (id: any) => {
    //
    const deleteA = await deleteNewAnnouncement(id);
    if (deleteA === "success") {
      setReload(!reload);
    }
  };
  // call the the annouc
  useEffect(() => {
    const getAllAnn = async () => {
      const _ann = await getAllAnnouncement();
      if (_ann) {
        setLoading(false);
        setAllAnn(_ann);
      } else {
        setLoading(true);
      }
    };
    getAllAnn();
  }, [reload]);
  const ROLE =
    user.role === ADMIN ? ADMIN : user.role === TEACHER ? TEACHER : STUDENT;
  return (
    <>
      <PageContainor role={ROLE}>
        <div className="">
          {loading ? (
            <>lOading data....</>
          ) : viewAllAnnouncment ? (
            <NewAnnounment
              setViewAllAnnouncment={setViewAllAnnouncment}
              announcemnt={singleAnn}
            ></NewAnnounment>
          ) : (
            allAnn &&
            allAnn.map((el: any, key) => (
              <div key={key}>
                <div className="w-full py-2 border-2 border-gray-300 rounded flex justify-between items-center px-4">
                  <div className="text-gray-600">{el.title}</div>
                  <div className="space-x-2">
                    <button
                      onClick={() => {
                        setViewAllAnnouncment(true);
                        filterAnn(el._id);
                      }}
                      className="bg-green-600 text-white w-max rounded px-12 py-4"
                    >
                      Detail
                    </button>

                    {user.role === ADMIN ? (
                      <>
                        <Link
                          to="/admin/addannouncment"
                          state={{
                            operation: "UPDATE",
                            object: el,
                          }}
                        >
                          <button className="bg-yellow-400 text-white w-max rounded px-12 py-4">
                            Update
                          </button>
                        </Link>
                        <button
                          onClick={async () => {
                            // setViewAllAnnouncment(true);
                            // filterAnn(el._id);
                            await deleteAnn(el._id);
                          }}
                          className="bg-red-500 text-white w-max rounded px-12 py-4"
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <></>
                    )}
                    {}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </PageContainor>
    </>
  );
};

export default AllAnnouncment;
