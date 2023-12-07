import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import * as brandReducer from "../../redux/brand.slice";
import * as brandValidator from "../../validators/brand.validate";
import InputField from "../InputField";
import Button from "../Button";
import Icons from "../Icons";
import { toast } from "react-toastify";
import brandApi from "../../api/brand.api";

const UpdateBrand = (props) => {
  // props start
  const { brand, setIsOpen, setConfirmClose } = props;
  // props end

  // hook start
  const dispatch = useDispatch();

  // hook end

  // react-hook-form start
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: { ...brand },
    mode: "onSubmit",
    shouldFocusError: false,
    resolver: yupResolver(brandValidator.update),
  });
  const onSubmit = async (data) => {
    if (!isDirty) {
      toast.warn("There's nothing to update");
      return;
    }
    await brandApi
      .update(brand.id, data)
      .then((res) => {
        toast.success(`You have just successfully updated a brand`);
        dispatch(brandReducer.update(res.data));
        setIsOpen(false);
      })
      .catch((err) => console.log(err));
  };
  // react-hook-form end

  React.useEffect(() => {
    if (isDirty)
      setConfirmClose(() => {
        return (setIsOpen) => {
          if (
            !window.confirm(
              "You haven't saved your changes yet, are you sure you want to exit?",
            )
          )
            return;
          setIsOpen(false);
        };
      });
  }, [isDirty]);
  // effect end
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-12 gap-8  "
      >
        <div className="col-span-12 gap-4 rounded-md bg-white p-4">
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
            <Icons.IconEdit className="text-2xl text-white" />
          </Button>
        </div>
      </form>
    </>
  );
};

export default UpdateBrand;
