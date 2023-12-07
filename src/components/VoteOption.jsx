import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import productApi from "../api/product.api";
import Button from "./Button";
import InputField from "./InputField";
import { updateOjectArray } from "../utils/helpers";
import Icons from "./Icons";
import { rate } from "../validators/product.validate";
import { toast } from "react-toastify";

export const options = [
  {
    id: 5,
    content: "Very good",
  },
  {
    id: 4,
    content: "Good",
  },
  {
    id: 3,
    content: "Common",
  },
  {
    id: 2,
    content: "Bad",
  },
  {
    id: 1,
    content: "Very bad",
  },
];

const VoteOptions = (props) => {
  const { productId, setIsOpen, setCallApi } = props;
  const [voteList, setVoteList] = React.useState(options);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(rate),
  });
  const onSubmit = async (data) => {
    await productApi
      .rate(data, productId)
      .then((res) => {
        setIsOpen(false);
        toast.success("Thank you for rating the product");
        setCallApi((prev) => !prev);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col rounded-md bg-white p-4"
    >
      <div className="flex justify-center">
        <Icons.IconRankingStar className="text-6xl text-orange-500" />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between gap-8"
      >
        <InputField
          control={control}
          type="textarea"
          placeholder="Click to search..."
          className="h-24 p-4"
          fieldId="comment"
          messageOff="true"
        />
        {/* star field */}
        <div className="flex justify-between">
          {voteList.map((el, index) => (
            <div key={index} className=" p-2">
              <div className="flex justify-center">
                <button
                  {...register("star")}
                  type="button"
                  onClick={() => {
                    setVoteList(
                      updateOjectArray(options, el.id, {
                        isSelected: true,
                      }),
                    );
                    setValue("star", el.id);
                  }}
                >
                  <Icons.IconStar
                    className={clsx("text-xl", {
                      "text-orange-500": el.isSelected,
                    })}
                  />
                </button>
              </div>
              <div className="mt-4 text-sm">{el.content}</div>
            </div>
          ))}
        </div>
        {errors?.star && (
          <p className="text-center text-red-600">
            You do not selected any reviews yet!
          </p>
        )}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default VoteOptions;
