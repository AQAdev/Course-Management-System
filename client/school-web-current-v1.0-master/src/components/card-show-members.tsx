import { FC } from "react";
interface IShowMember {
  title: string;
  members: string;
}
const ShowMembers: FC<IShowMember> = ({ title, members }) => {
  return (
    <>
      <div className="mt-4">
        <h1>{title}</h1>
        <div className="block p-12 mt-2 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 w-max">
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
            {members}
          </h2>
        </div>
      </div>
    </>
  );
};

export default ShowMembers;
