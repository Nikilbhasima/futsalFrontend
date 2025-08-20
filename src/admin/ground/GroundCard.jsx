import { FaRegEdit } from "react-icons/fa";

function GroundCard() {
  return (
    <div className="bg-tertary rounded-[10px] overflow-hidden max-w-[400px] ">
      <div>
        <img
          src="/images/messi.png"
          alt="ground image"
          className="max-h-[200px] w-[100%] object-cover object-center"
        />
      </div>
      <div className="p-[20px] mt-[10px]">
        <h2 className="text-primary text-[20px] font-semibold">
          Ground Detail
        </h2>
        <div className="grid gap-[10px]">
          <div>
            <label className="font-semibold">Ground Type:</label>
            <span className="font-light">7A</span>
          </div>
          <div>
            <label className="font-semibold">Per match Price:</label>
            <span className="font-light">Rs1000</span>
          </div>
        </div>
      </div>
      <div className="px-[20px] pb-[20px]">
        <button className="bg-primary py-[12px] px-[32px] rounded-[10px] hover:-translate-y-[3px] transition-all duration-300 ease-in flex gap-[10px] justify-start items-center">
          Edit <FaRegEdit className="text-[20px]" />
        </button>
      </div>
    </div>
  );
}

export default GroundCard;
