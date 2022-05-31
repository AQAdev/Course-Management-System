import { useState } from "react";
import { addBatch } from "../../Api/batch";
import { addProgram } from "../../Api/program";
import { addSection } from "../../Api/section";
import PageContainor from "../../components/page-containor";
import { ADMIN } from "../../constants/role";

export const AddBatchSection = () => {
  const [section, setSection] = useState("");
  const [batch, setBatch] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [program, setProgram] = useState("");

  const addBatchs = () => {
    setLoading(true);
    const addData = async () => {
      const data = await addBatch({ batch_name: batch });
      if (data.batch != null) {
        setMessage("Batch Added Successfully");
      }
      setLoading(false);
    };
    addData();
  };
  const addSections = () => {
    setLoading(true);
    const addData = async () => {
      const data = await addSection({ sec_name: section });

      if (data.section != null) {
        setMessage("Section Added Successfully");
      }
      setLoading(false);
    };
    addData();
  };

  const addPrograms = () => {
    setLoading(true);
    const addData = async () => {
      const data = await addProgram({ prog_name: program });

      if (data.progam != null) {
        setMessage("Program Added Successfully");
      }
      setLoading(false);
    };
    addData();
  };
  return (
    <>
      <PageContainor role={ADMIN}>
        {loading ? (
          <></>
        ) : (
          <>
            <div className="space-y-2">
              <div className="space-x-2">
                <input
                  className="w-1/2  p-2 border-2 rounded "
                  placeholder="Enter Section"
                  onChange={(e) => {
                    setSection(e.target.value);
                    setMessage("");
                  }}
                />
                <button
                  onClick={addSections}
                  className="p-2  w-32 bg-green-500 rounded text-white"
                >
                  Add Section
                </button>
              </div>
              <div className="space-x-2">
                <input
                  className="w-1/2 p-2 border-2"
                  placeholder="Enter Batch"
                  onChange={(e) => {
                    setBatch(e.target.value);
                    setMessage("");
                  }}
                />
                <button
                  onClick={addBatchs}
                  className="p-2 w-32 bg-green-500 rounded text-white"
                >
                  Add Batch
                </button>
              </div>

              <div className="space-x-2">
                <input
                  className="w-1/2 p-2 border-2"
                  placeholder="Enter Batch"
                  onChange={(e) => {
                    setProgram(e.target.value);
                    setMessage("");
                  }}
                />
                <button
                  onClick={addPrograms}
                  className="p-2 w-32 bg-green-500 rounded text-white"
                >
                  Add Program
                </button>
              </div>

              {!!message.length ? (
                <div className="bg-green-500 rounded text-white h-12 px-12 flex justify-center items-center max-w-fit">
                  {message}
                </div>
              ) : (
                <></>
              )}
            </div>
          </>
        )}
      </PageContainor>
    </>
  );
};
