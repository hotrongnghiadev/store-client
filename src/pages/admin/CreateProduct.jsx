import { useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import Breadcrumbs from "../../components/Breadcrumbs";
import InputField from "../../components/InputField";
import Icons from "../../components/Icons";
import EditorField from "../../components/EditorField";
import SelectField from "../../components/SelectField";
import clsx from "clsx";
import FileField from "../../components/FileField";
import React from "react";

// config routes for breadcrumb
const routes = [
  {
    path: "/admin",
    breadcrumb: "home",
  },
  {
    path: "/admin/product",
    breadcrumb: "products",
  },
  {
    path: "/admin/product/create",
    breadcrumb: "create product",
  },
];

const CreateProduct = () => {
  const params = useParams();

  // react-hook-form start
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({ shouldFocusError: false });

  const {
    fields: generalFields,
    append: generalAppend,
    remove: generalRemove,
  } = useFieldArray({
    name: "general",
    control,
  });
  const {
    fields: detailFields,
    append: detailAppend,
    remove: detailRemove,
  } = useFieldArray({
    name: "detail",
    control,
  });
  // react-hook-form end
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="max-w-5xl">
        <div className="mb-10">
          <h3 className="mb-2 text-2xl font-bold capitalize">create product</h3>
          <Breadcrumbs params={params} routes={routes} />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-12 gap-8  "
        >
          {/* form-create__general start */}
          <div className="col-span-12 gap-4 rounded-md bg-white p-4">
            <h3 className="text-xl font-bold capitalize">General</h3>
            <InputField
              control={control}
              label="product name"
              placeholder="click to type"
              fieldId="productName"
              validator={register("productName")}
              error={errors.userName?.message}
              className="rounded-md focus:border-blue-500"
              required
            />
            <SelectField
              control={control}
              label="Product brand"
              placeholder="click to select"
              fieldId="brandId"
              validator={register("brandId")}
              defaultValue={null}
              options={[
                { value: "chocolate", label: "Chocolate" },
                { value: "strawberry", label: "Strawberry" },
                { value: "vanilla", label: "Vanilla" },
              ]}
              error={errors.brand?.message}
              required
            />
            <SelectField
              control={control}
              label="Product category"
              placeholder="click to select"
              fieldId="categoryId"
              validator={register("categoryId")}
              defaultValue={null}
              options={[
                { value: "chocolate", label: "Chocolate" },
                { value: "strawberry", label: "Strawberry" },
                { value: "vanilla", label: "Vanilla" },
              ]}
              error={errors.category?.message}
              required
            />
            {/* useFieldArray start */}
            <p className="mt-4">Additional fields</p>
            {generalFields.map((field, index) => {
              return (
                <section key={index} className="mt-4">
                  <input
                    className="block w-full border-none font-bold italic outline-none"
                    placeholder="new field name"
                    {...register(`general.${index}.name`)}
                  />
                  <div className="flex items-center gap-2">
                    <input
                      className="peer w-full appearance-none rounded-md border border-slate-200 px-4 py-2 font-bold italic placeholder-slate-400  transition-colors focus:outline-none focus:ring-1 focus:ring-transparent"
                      placeholder="new field content"
                      {...register(`general.${index}.content`)}
                    />
                    <button
                      type="submit"
                      onClick={() => generalRemove(index)}
                      className="flex appearance-none justify-center rounded-sm px-2.5 py-2.5 placeholder-gray-300 focus-within:ring-1 focus:outline-none"
                    >
                      <Icons.IconRemove className="text-xl text-red-500" />
                    </button>
                  </div>
                </section>
              );
            })}

            <div className="mt-4 flex w-fit  flex-col justify-center whitespace-nowrap text-sm">
              <button
                type="button"
                onClick={() => generalAppend({ name: "", content: "" })}
                className="ring-focusborder flex appearance-none justify-center rounded-sm  px-2.5 py-2.5 placeholder-gray-300 focus-within:ring-1 focus:outline-none"
              >
                <Icons.IconAdd className="text-xl text-blue-500" />
              </button>
              <p className={clsx("h-4")}></p>
            </div>
            {/* useFieldArray end */}
          </div>
          {/* form-create__general end */}

          {/*form-create__ detail start */}
          <div className="col-span-12 rounded-md bg-white p-4">
            <h3 className="text-xl font-bold capitalize">
              first variable product
            </h3>
            <InputField
              control={control}
              label="product price"
              placeholder="click to type"
              fieldId="price"
              validator={register("price")}
              error={errors.price?.message}
              className="rounded-md focus:border-blue-500"
              required
            />

            <InputField
              control={control}
              label="product inventory"
              placeholder="click to type"
              fieldId="inventory"
              validator={register("inventory")}
              error={errors.inventory?.message}
              className="rounded-md focus:border-blue-500"
              required
            />
            <InputField
              control={control}
              label="product color"
              placeholder="click to type"
              fieldId="color"
              validator={register("color")}
              error={errors.color?.message}
              className="rounded-md focus:border-blue-500"
              required
            />

            {/* useFieldArray start */}
            <p className="mt-4">Additional fields</p>
            {detailFields.map((field, index) => {
              return (
                <section key={index} className="mt-4">
                  <input
                    className="block w-full border-none font-bold italic outline-none"
                    placeholder="new field name"
                    {...register(`detail.${index}.name`)}
                  />
                  <div className="flex items-center gap-2">
                    <input
                      className="peer w-full appearance-none rounded-md border border-slate-200 px-4 py-2 font-bold italic placeholder-slate-400  transition-colors focus:outline-none focus:ring-1 focus:ring-transparent"
                      placeholder="new field content"
                      {...register(`detail.${index}.content`)}
                    />
                    <button
                      type="submit"
                      onClick={() => detailRemove(index)}
                      className="flex appearance-none justify-center rounded-sm px-2.5 py-2.5 placeholder-gray-300 focus-within:ring-1 focus:outline-none"
                    >
                      <Icons.IconRemove className="text-xl text-red-500" />
                    </button>
                  </div>
                </section>
              );
            })}

            <div className="mt-4 flex w-fit  flex-col justify-center whitespace-nowrap text-sm">
              <button
                type="button"
                onClick={() => detailAppend({ name: "", content: "" })}
                className="ring-focusborder flex appearance-none justify-center rounded-sm  px-2.5 py-2.5 placeholder-gray-300 focus-within:ring-1 focus:outline-none"
              >
                <Icons.IconAdd className="text-xl text-blue-500" />
              </button>
              <p className={clsx("h-4")}></p>
            </div>
            {/* useFieldArray */}

            <FileField
              fieldId="thumb"
              control={control}
              validator={register("thumb")}
              error={errors.thumb?.message}
              label="upload thumbnail image"
              multiple
            />
            <FileField
              fieldId="images"
              control={control}
              validator={register("images")}
              error={errors.images?.message}
              label="upload some detail images"
              multiple
            />
          </div>
          {/*form-create__ detail end */}

          <button
            type="submit"
            className="flex w-fit flex-col rounded-md bg-blue-500 px-4 py-2 capitalize text-white"
          >
            submit
          </button>
        </form>
        {/*form-create__detail end */}
      </div>
    </>
  );
};

export default CreateProduct;
