import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import * as categoryReducer from "../../redux/admin/category.slice";
import * as categoryValidator from "../../validators/admin/category.validate";
import InputField from "../InputField";
import Button from "../Button";
import Icons from "../Icons";
import { toast } from "react-toastify";
import categoryApi from "../../api/admin/category.api";

const UpdateCategory = (props) => {
  // props start
  const { category, isOpen, setIsOpen, setConfirmClose } = props;
  // props end

  // hook start
  const dispatch = useDispatch();

  const [name, setName] = React.useState("");
  const [desc, setDesc] = React.useState("");
  // hook end

  // react-hook-form start
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isSubmitted },
  } = useForm({
    mode: "onSubmit",
    shouldFocusError: false,
    resolver: yupResolver(categoryValidator.update),
  });
  const onSubmit = async (data) => {
    if (!isDirty) {
      toast.warn("There's nothing to update");
      return;
    }
    console.log(data);
    await categoryApi
      .update(category.id, data)
      .then((res) => {
        toast.success(`You have just successfully updated a category`);
        dispatch(categoryReducer.update(res.data));
        setIsOpen(false);
      })
      .catch((err) => console.log(err));
  };
  // react-hook-form end

  // effect start
  React.useEffect(() => {
    // setValue in form
    // data.name is uncontrolled, must use "or operator" to fix err
    setName(category.name || "");
    setDesc(category.desc || "");
    // setValue in submit form
    setValue("name", category.name);
    setValue("desc", category.desc);
  }, [category.name, category.desc, setValue, isOpen]);

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
            label="category name"
            placeholder="click to type"
            fieldId="name"
            validator={register("name")}
            error={errors.name?.message}
            className="rounded-md focus:border-blue-500"
            required
            value={name}
            setValue={setName}
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
            value={desc}
            setValue={setDesc}
          />
          <Button type="submit">
            <Icons.IconEdit className="text-2xl text-white" />
          </Button>
        </div>
      </form>
    </>
  );
};

export default UpdateCategory;
