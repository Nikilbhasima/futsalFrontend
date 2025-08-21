import { FaRegEdit } from "react-icons/fa";

function GroundCard({ data }) {
  return (
    <div className="bg-tertary rounded-[10px] overflow-hidden max-w-[400px] w-[350px] ">
      <div>
        <img
          src="/images/messi.png"
          alt="ground image"
          className="max-h-[200px] w-[100%] object-cover object-center"
        />
      </div>
      <div className="py-[10px] px-[10px] mt-[10px]">
        <h2 className="text-primary text-[20px] font-semibold">
          Ground Detail
        </h2>
        <div className="grid ">
          <div className="grid grid-cols-2">
            <label className="font-normal text-[14px] opacity-65">
              Ground Type:
            </label>
            <span className="font-light text-[14px]">{data?.groundType}</span>
          </div>
          <div className="grid grid-cols-2">
            <label className="font-normal text-[14px] opacity-65">
              Per Match Price:
            </label>
            <span className="font-light text-[14px]">
              Rs{data?.pricePerHour}
            </span>
          </div>
        </div>
      </div>
      <div className="px-[10px] pb-[20px]">
        <button className="bg-primary py-[12px] px-[32px] rounded-[10px] hover:-translate-y-[3px] transition-all duration-300 ease-in flex gap-[10px] justify-start items-center">
          Edit <FaRegEdit className="text-[20px]" />
        </button>
      </div>
    </div>
  );
}

export default GroundCard;
