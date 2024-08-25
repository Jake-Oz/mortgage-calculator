"use client";

import Container from "./components/container";
import Button from "./components/Button";
import Image from "next/image";
import Header from "./components/Header";
import ResultsHeader from "./components/ResultsHeader";
import { TMortgageSchema } from "./lib/types";
import { determineRepayments } from "./lib/utils";
import SolutionCard from "./components/SolutionCard";
import { useState } from "react";
import EmptyCard from "./components/EmptyCard";
import dynamic from "next/dynamic";

const Input = dynamic(() => import("./components/input-form"), { ssr: false });

export default function Home() {
  const [monthlyRepayment, setMonthlyRepayment] = useState<string>("");
  const [totalRepayment, setTotalRepayment] = useState<string>("");
  const [resetState, setResetState] = useState<boolean>(false);

  const handleClick = () => {
    setMonthlyRepayment("");
    setTotalRepayment("");
    setResetState(true);
  };

  const onSubmit = (data: TMortgageSchema) => {
    const { monthlyRepayment, totalRepayment } = determineRepayments(
      data.amount,
      data.term,
      data.interest,
      data.type
    );
    setMonthlyRepayment(monthlyRepayment);
    setTotalRepayment(totalRepayment);
  };

  return (
    <main className="bg-Slate100 flex lg:h-screen h-full justify-center lg:items-center">
      <Container className="lg:bg-White lg:max-w-[1000px] max-w-[500px] lg:max-h-[600px] flex lg:flex-row flex-col ">
        <Container className="flex flex-col justify-center items-center gap-6 bg-White lg:min-w-[500px] min-w-[375px] min-h-[600px] px-6 py-10 lg:p-10">
          <Header handleClick={handleClick} />
          <Input
            className="place-content-center"
            onSubmit={onSubmit}
            resetState={resetState}
            setResetState={setResetState}
          >
            <Button
              type="submit"
              tabIndex={0}
              className="h-14 rounded-full w-full lg:w-3/4 mt-4 flex justify-center items-center px-4 "
            >
              <div className="flex justify-center items-center gap-4">
                <Image
                  src="/icon-calculator.svg"
                  alt="calculator icon"
                  width={24}
                  height={24}
                />
                <p>Calculate Repayments</p>
              </div>
            </Button>
          </Input>
        </Container>
        <Container className="bg-Slate900/95 lg:min-w-[500px] min-w-[375px] h-[600px] lg:rounded-bl-[5rem] px-6 py-10 lg:p-10 lg:rounded-tl-none">
          {monthlyRepayment && totalRepayment ? (
            <>
              <ResultsHeader />
              <SolutionCard
                monthlyRepayment={monthlyRepayment}
                totalRepayment={totalRepayment}
                className="mt-6 lg:mt-8 p-6 lg:p-8"
              />
            </>
          ) : (
            <EmptyCard />
          )}
        </Container>
      </Container>
    </main>
  );
}
