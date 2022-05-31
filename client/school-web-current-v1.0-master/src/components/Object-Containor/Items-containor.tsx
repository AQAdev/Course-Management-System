import { FC } from "react";

interface IContainor {
  children: React.ReactNode;
}
const ItemsContainor: FC<IContainor> = ({ children }) => {
  return (
    <>
      <div className="sm:px-6 lg:px-8 py-6 w-full max-w-9xl mx-auto bg-[#F0F0F7] h-screen">
        <div className="my-4 p-4 bg-white rounded h-full w-full overflow-auto">
          {children}
        </div>
      </div>
    </>
  );
};

export default ItemsContainor;
