import React from "react";
import Image from "next/image";

const EmptyCard = () => {
  return (
    <section className="flex flex-col justify-start lg:justify-center items-center h-full">
      <Image
        src="/illustration-empty.svg"
        alt="calculator icon"
        width={192}
        height={192}
      />
      <h1 className="text-White text-3xl my-4">Results shown here</h1>
      <p className="text-center text text-Slate500">
        Complete the form and click &apos;calculate repayments&apos; to see what
        your monthly repayments would be.
      </p>
    </section>
  );
};

export default EmptyCard;
