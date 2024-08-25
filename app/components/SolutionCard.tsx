import React from "react";
import { numberFormat } from "../lib/utils";

type SolutionCardProps = {
  monthlyRepayment: string;
  totalRepayment: string;
  className?: string;
};

const SolutionCard = ({
  monthlyRepayment,
  totalRepayment,
  className,
}: SolutionCardProps) => {
  const monthlyRepaymentFormatted = numberFormat(monthlyRepayment);
  const totalRepaymentFormatted = numberFormat(totalRepayment);
  console.log(monthlyRepaymentFormatted);

  return (
    <div
      className={`flex flex-col gap-2 bg-Slate900 border-4 border-t-Lime border-l-0 border-r-0 border-b-0 h-[290px] lg:w-[420px] rounded-xl ${className}`}
    >
      <div className="flex flex-col justify-between gap-4 mb-4">
        <p className="text-Slate300">Your monthly repayments</p>
        <p className="text-5xl lg:text-[3.5rem] font-bold text-Lime">
          {monthlyRepaymentFormatted}
        </p>
      </div>
      <div className="border border-Slate700"></div>
      <div className="flex flex-col justify-between gap-2 mt-4">
        <p className="text-Slate300">Total you&apos;ll repay over the term</p>
        <p className="text-White text-2xl">{totalRepaymentFormatted}</p>
      </div>
    </div>
  );
};

export default SolutionCard;
