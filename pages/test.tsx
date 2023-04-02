import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface AnswerTypes {
  department: "sales" | "marketing" | "accounting" | "customService";
  why: "money" | "love" | "learn" | "dontKnow";
  salary: "$50" | "$100" | "$150" | "$200" ;
  introduce: string;
  dreams: string;
  email: string;
}

export default () => {
  const [answer, setAnswer] = useState<string>();
  const { register, handleSubmit, formState: {errors} } = useForm<AnswerTypes>();
  const onValid = (data: AnswerTypes) => {
    if (!data) return;
    const redata = JSON.stringify(data);
    setAnswer(redata as any);
  } 
  return (
    <div className="bg-teal-50 w-full h-[120vh] flex justify-center items-center">
      <div className="bg-red-100 border-2  border-black rounded-2xl border-b-4 border-r-4 p-8 ">
        <h1 className="text-center text-xl font-bold mb-8">Job Application Form</h1>
        <form onSubmit={handleSubmit(onValid)}>
          <div className="space-y-4">
          <div>
            <span className="text-m font-semibold mb-2" >What department do you want to work for?</span>
            <span className="text-red-500">{" "} {errors?.department?.message}</span>
            <div>
              <label htmlFor="sales">
                <input type="radio" value="sales" {...register("department", {required: "*required"})} />{" "}
                Sales
              </label>
            </div>
            <div>
              <label htmlFor="marketing">
                <input type="radio" value="marketing" {...register("department", {required: "*required"})} />{" "}
                Marketing
              </label>
            </div>
            <div>
              <label htmlFor="accounting">
                <input type="radio" value="accounting" {...register("department", {required: "*required"})} />{" "}
                Accounting
              </label>
            </div>
            <div>
              <label htmlFor="customService">
                <input type="radio" value="customService" {...register("department", {required: "*required"})} />{" "}
                Custom Service
              </label>
            </div>
          </div>
          <div>
            <span className="text-m font-semibold mb-2">Why do you want to join this company?</span>
            <span className="text-red-500">{" "} {errors?.why?.message}</span>
            <div>
              <label htmlFor="money">
                <input type="radio" value="money" {...register("why", {required:"*required"})}/>{" "}
                I want money!
              </label>
            </div>
            <div>
              <label htmlFor="love">
                <input type="radio" value="love" {...register("why", {required:"*required"})}/>{" "}
                I love this company
              </label>
            </div>
            <div>
              <label htmlFor="learn">
                <input type="radio" value="learn" {...register("why", {required:"*required"})}/>{" "}
                I want to learn
              </label>
            </div>
            <div>
              <label htmlFor="dontKnow">
                <input type="radio" value="dontKnow" {...register("why", {required:"*required"})}/>{" "}
                I don't know why
              </label>
            </div>
          </div>
          <div>
            <h2 className="text-m font-semibold mb-1">Salary</h2>
            <select className="w-[450px] h-8 border-2 border-black rounded-lg p-1 px-2 outline-none" {...register("salary")}>
              <option>$50</option>
              <option>$100</option>
              <option>$150</option>
              <option>$200</option>
            </select>
          </div>
          <div>
            <h2 className="text-m font-semibold mb-1">Introduce yourself</h2>
            <input className="w-[450px] h-8 border-2 border-black rounded-lg p-1 px-2 outline-none"  type="text" {...register("introduce", {required: "Please write down your introduction."})}/>
            <p className="text-red-500">{errors?.introduce?.message}</p>
          </div>
          <div>
            <h2 className="text-m font-semibold mb-1">Tell us what your dreams are</h2>
            <textarea 
              className="w-[450px] h-20 border-2 border-black rounded-lg p-1 px-2 outline-none"
              {...register("dreams", {
                required: "Please tell us what your dreams are.",
                minLength: {
                  value: 10,
                  message: "Please write more than 10 characters."
                }
              })}
            />
            <p className="text-red-500">{errors?.dreams?.message}</p>
          </div>
          <div>
            <h2 className="text-m font-semibold mb-1">Email</h2>
            <input 
              className="w-[450px] h-8 border-2 border-black rounded-lg p-1 px-2 outline-none"
              type="email"
              {...register("email", {
              required: "Please write down your email.",
              validate: {
                naver: (text) => text.includes("@naver.com")
              }
              })}/>
            <p className="text-red-500">
              {errors?.email?.message}
              {errors?.email?.type === "naver"
            ? "Only @naver emails allowed"
            : null}
            </p>
          </div>
          </div>
          <button className="text-center w-[450px] bg-amber-400 border-2 border-black rounded-lg text-m font-semibold py-4 border-b-4 border-r-4 mt-10">Give me this job</button>
        </form>
        <div className="mt-8 break-all">{answer}</div>
      </div>
    </div>
  );
};
