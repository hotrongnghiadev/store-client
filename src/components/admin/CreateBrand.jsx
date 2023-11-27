import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import * as brandReducer from "../../redux/admin/brand.slice";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import * as brandValidator from "../../validators/admin/brand.validate";
import brandApi from "../../api/admin/brand.api";
import React from "react";
import Icons from "../Icons";

const CreateBrand = () => {
  const dispatch = useDispatch();

  // react-hook-form start
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    mode: "onSubmit",
    shouldFocusError: false,
    resolver: yupResolver(brandValidator.create),
  });

  const onSubmit = async (body) => {
    await brandApi
      .create(body)
      .then((res) => {
        dispatch(brandReducer.create(res.data));
        toast.success(`Just added ${res.data?.name} to the brand list`);
        console.log(res);
      })
      .catch((err) => {
        toast.err(err.data?.message);
      });
  };
  // react-hook-form end

  React.useEffect(() => {
    (async () => {
      await brandApi
        .getAll()
        .then((res) => {
          dispatch(brandReducer.set(res.data));
        })
        .catch((err) => console.log(err));
    })();
  }, []);
  return (
    <>
      <div className="w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="gap-4 rounded-md bg-white p-4">
            <div className="">
              <h3 className="text-xl font-bold capitalize">create brand</h3>
            </div>
            <InputField
              control={control}
              label="brand name"
              placeholder="click to type"
              fieldId="name"
              validator={register("name")}
              error={errors.name?.message}
              className="rounded-md focus:border-blue-500"
              required
            />
            <InputField
              control={control}
              label="brand description"
              placeholder="click to type"
              fieldId="desc"
              validator={register("desc")}
              error={errors.desc?.message}
              className="h-32 rounded-md focus:border-blue-500"
              type="textarea"
            />
            <Button type="submit">
              <Icons.IconAdd className="text-2xl text-white" />
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateBrand;
