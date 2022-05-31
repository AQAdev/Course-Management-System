import { FC } from "react";

export const DownloadButton: FC<any> = (url: any) => {
  const downloadFile = () => {
    window.location.href = url;
  };
  return (
    <button className="bg-red-300 px-2" onClick={downloadFile}>
      Download Time Table
    </button>
  );
};
