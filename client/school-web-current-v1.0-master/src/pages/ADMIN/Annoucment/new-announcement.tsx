import { Dispatch, FC, SetStateAction } from "react";

interface INewAnnouncment {
  announcemnt: { url: string; title: string; description: string };
  setViewAllAnnouncment: Dispatch<SetStateAction<boolean>>;
}

const NewAnnounment: FC<INewAnnouncment> = ({
  announcemnt,
  setViewAllAnnouncment,
}) => {
  return (
    <div className="h-full">
      <div className="flex justify-between items-center">
        <div className="my-2">{announcemnt.title}</div>
        <button
          onClick={() => {
            setViewAllAnnouncment(false);
          }}
          className="my-2 border-2 border-gray-300 px-4 rounded"
        >
          View All
        </button>
      </div>
      <img
        className="max-h-[450px] w-full  rounded"
        alt="announcemnt"
        src={announcemnt.url}
      />
      <p className="mt-4 text-bold">{announcemnt.description}</p>
    </div>
  );
};

export default NewAnnounment;
