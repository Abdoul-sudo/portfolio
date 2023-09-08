import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';

function ScaleImage({ src_data, setImage }) {
  return (
    <div className="w-full h-full bg-black/80   backdrop-blur-sm fixed z-[999] inset-0 flex flex-col items-center  justify-start  ">
      <div
        onClick={() => setImage('')}
        className=" absolute  top-[20px] left-[20px]"
      >
        <div className="interactable2 flex flex-row items-center justify-start text-slate-200 hover:text-sky-500 cursor-pointer ">
          <BsArrowLeft className="h-10 w-6  mr-[5px] " />
          <span className=" text-[17px]">Back</span>
        </div>
      </div>
      <div
        className="w-full h-full flex flex-row items-center justify-center"
        onClick={() => setImage('')}
      >
        {/* {src_data.isMobile ? (
          <div className="w-[480px] h-auto border-[2px] px-[8px] py-[12px] border-[#343434] relative group overflow-hidden  bg-black rounded-[35px]  ">
            <Image
              alt=""
              src={src_data.data}
              width={1920}
              height={1080}
              className="w-full h-auto  rounded-[25px]"
            />
          </div>
        ) : ( */}
        <div
          className="w-[1300px] h-[720px] border-[2px]  border-[#343434] relative group overflow-hidden  bg-black  rounded-[15px]"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            alt=""
            src={src_data}
            className="w-full h-auto object-cover rounded-[10px]"
          />
        </div>
        {/* )} */}
      </div>
    </div>
  );
}

export default ScaleImage;
