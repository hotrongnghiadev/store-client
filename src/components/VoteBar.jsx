import React, { useRef } from "react";
import Icons from "./Icons";

const VoteBar = (props) => {
  const { total, starAvg, count, number } = props;
  const percentRef = useRef();
  //
  React.useEffect(() => {
    percentRef.current.style.cssText = `width: ${Math.round(
      (count * 100) / total,
    )}%`;
  }, [total, starAvg]);
  return (
    <div className="my-2 flex items-center gap-2 px-2">
      <div className="flex w-[50px] items-center gap-1 text-sm">
        <span className="font-bold">{number}</span>
        <Icons.IconStar className="text-xl text-orange-600" />
      </div>
      <div className="flex-1">
        {/* percent bar */}
        <div className="relative h-2 rounded-sm bg-slate-200">
          <div
            ref={percentRef}
            className="z-1 absolute h-2  rounded-sm bg-red-600"
          ></div>
        </div>
      </div>
      <div className="w-[100px] text-sm">{count} reviewers</div>
    </div>
  );
};

export default VoteBar;
