"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mortgageSchema, TMortgageSchema } from "../lib/types";
import { useEffect } from "react";
import { getCurrencySymbol } from "../lib/utils";

type InputProps = {
  children?: React.ReactNode;
  className?: string;
  onSubmit: (data: TMortgageSchema) => void;
  resetState: boolean;
  setResetState: React.Dispatch<React.SetStateAction<boolean>>;
};

const Input = ({
  children,
  className,
  onSubmit,
  resetState,
  setResetState,
}: InputProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TMortgageSchema>({
    resolver: zodResolver(mortgageSchema),
  });

  useEffect(() => {
    if (resetState) {
      reset();
      setResetState(false);
    }
  }, [resetState]);

  const currencySymbol = getCurrencySymbol();

  return (
    <section className="h-full w-full ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${className} lg:min-h-[400px] `}
      >
        <div
          className={`max-w-full flex flex-col ${
            errors.type?.message ? "lg:gap-2" : "lg:gap-6"
          }  gap-4`}
        >
          <div>
            <label htmlFor="amount" className="text-Slate700">
              Mortgage Amount
            </label>
            <div className="flex justify-start group mt-2">
              <p
                className={`absolute flex justify-center items-center bg-Slate100 text-Slate900 ${
                  errors.amount
                    ? "bg-Red text-White"
                    : "  group-focus-within:bg-Lime"
                } w-12 h-12 rounded-l-lg`}
              >
                {currencySymbol}
              </p>
              <input
                type="text"
                {...register("amount")}
                id="amount"
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9.]/g, "");
                  const numberValue = parseInt(value);
                  if (!isNaN(numberValue)) {
                    e.target.value = new Intl.NumberFormat("en-UK").format(
                      numberValue
                    );
                  }
                }}
                className={` w-full h-12 cursor-pointer pl-16 py-2 rounded-lg ring-1 ring-Slate900 focus:outline-none ${
                  errors.amount
                    ? "ring-Red"
                    : "  group-active:ring-Lime group-focus-within:ring-Lime"
                } `}
              />
            </div>
            {errors.amount && (
              <p className="text-Red text-sm mt-2">{`${errors.amount.message}`}</p>
            )}
          </div>
          <div className="flex lg:flex-row flex-col gap-4 justify-between items-top ">
            <div className="flex flex-col gap-2">
              <label htmlFor="term" className="text-Slate700">
                Mortgage Term{" "}
              </label>
              <div className="flex justify-end group">
                <p
                  className={`absolute flex justify-center items-center bg-Slate100 text-Slate900 ${
                    errors.term
                      ? "bg-Red text-White"
                      : "  group-focus-within:bg-Lime"
                  } w-16 h-12 rounded-r-lg`}
                >
                  years
                </p>
                <input
                  type="text"
                  {...register("term", { valueAsNumber: true })}
                  id="term"
                  className={` w-full h-12 cursor-pointer pr-16 pl-4 py-2 rounded-lg ring-1 ring-Slate900 focus:outline-none ${
                    errors.term
                      ? "ring-Red"
                      : " group-active:ring-Lime group-focus-within:ring-Lime"
                  } `}
                />
              </div>
              {errors.term && (
                <p className="text-Red text-sm">{`${errors.term.message}`}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="interest" className="text-Slate700">
                Interest Rate
              </label>
              <div className="flex justify-end group">
                <p
                  className={`absolute flex justify-center items-center bg-Slate100 text-Slate900 ${
                    errors.interest
                      ? "bg-Red text-White"
                      : "  group-focus-within:bg-Lime"
                  } w-12 h-12 rounded-r-lg`}
                >
                  %
                </p>
                <input
                  type="text"
                  {...register("interest", { valueAsNumber: true })}
                  id="interest"
                  className={` w-full h-12 cursor-pointer pr-16 pl-4 py-2 rounded-lg ring-1 ring-Slate900 focus:outline-none ${
                    errors.interest
                      ? "ring-Red"
                      : " group-active:ring-Lime group-focus-within:ring-Lime"
                  } `}
                />
              </div>
              {errors.interest && (
                <p className="text-Red text-sm">{`${errors.interest.message}`}</p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="type" className="text-Slate700">
              Mortgage Type{" "}
            </label>
            <div className="flex flex-col gap-3 mt-2">
              <label
                tabIndex={0}
                htmlFor="repayment"
                className="flex justify-start items-center gap-4 ring-1 ring-Slate900 has-[:checked]:bg-Lime/20 has-[:checked]:ring-Lime 
              hover:ring-Lime active:ring-Lime 
              rounded-lg px-4  cursor-pointer"
              >
                <input
                  {...register("type")}
                  type="radio"
                  value="Repayment"
                  id="repayment"
                  className={`h-12 checked:accent-Lime/50 `}
                />
                <p className={`w-full`}>Repayment</p>
              </label>
              <label
                tabIndex={0}
                htmlFor="interestOnly"
                className="flex justify-start items-center gap-4 ring-1 ring-Slate900 has-[:checked]:bg-Lime/20 has-[:checked]:ring-Lime 
            hover:ring-Lime active:ring-Lime 
            rounded-lg px-4  cursor-pointer w-full"
              >
                <input
                  {...register("type")}
                  type="radio"
                  value="Interest Only"
                  id="interestOnly"
                  className={`h-12  checked:accent-Lime/50 `}
                />
                <p className={`w-full`}>Interest Only</p>
              </label>
            </div>
            {errors.type && (
              <p className="mt-2 text-Red text-sm">{`${errors.type.message}`}</p>
            )}
          </div>
          <div className="flex justify-center lg:justify-start">{children}</div>
        </div>
      </form>
    </section>
  );
};

export default Input;
