import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import * as categoryReducer from "../../redux/admin/category.slice";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import * as categoryValidator from "../../validators/admin/category.validate";
import categoryApi from "../../api/admin/category.api";
import React from "react";
import Icons from "../Icons";
import SelectField from "../SelectField";

const CreateCategory = () => {
  // hook start
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  // hook end

  // react-hook-form start
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    mode: "onSubmit",
    shouldFocusError: false,
    resolver: yupResolver(categoryValidator.create),
  });

  const onSubmit = async (data) => {
    await categoryApi
      .create(data)
      .then((res) => {
        dispatch(categoryReducer.create(res.data));
        toast.success(`Just added ${res.data?.name} to the category list`);
        console.log(res);
      })
      .catch((err) => {
        toast.error(err.data?.message);
      });
  };
  // react-hook-form end
  return (
    <>
      <div className="w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="gap-4 rounded-md bg-white p-4">
            <div className="">
              <h3 className="text-xl font-bold capitalize">create category</h3>
            </div>
            <InputField
              control={control}
              label="category name"
              placeholder="click to type"
              fieldId="name"
              validator={register("name")}
              error={errors.name?.message}
              className="rounded-md focus:border-blue-500"
              required
            />
            <InputField
              control={control}
              label="category description"
              placeholder="click to type"
              fieldId="desc"
              validator={register("desc")}
              error={errors.desc?.message}
              className="h-32 rounded-md focus:border-blue-500"
              type="textarea"
            />
            <SelectField
              control={control}
              label="Parent"
              placeholder="click to select"
              fieldId="categoryId"
              validator={register("categoryId")}
              defaultValue={null}
              options={categories.map((el) => {
                return {
                  value: el.id,
                  label: el.name,
                };
              })}
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

export default CreateCategory;
