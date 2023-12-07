import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import { create } from "../../validators/product.validate";
import productApi from "../../api/product.api";
import * as brandReducer from "../../redux/brand.slice";
import * as categoryReducer from "../../redux/category.slice";
import Breadcrumbs from "../../components/Breadcrumbs";
import InputField from "../../components/InputField";
import Icons from "../../components/Icons";
import SelectField from "../../components/SelectField";
import FileField from "../../components/FileField";
import Button from "../../components/Button";
import brandApi from "../../api/brand.api";
import categoryApi from "../../api/category.api";
import AdditionalField from "../../components/AdditionalField";

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
  // hook start
  const params = useParams();
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.brands);
  const categories = useSelector((state) => state.categories);
  const [invalid, setInvalid] = React.useState(false);
  // hook end

  // function start
  const onSubmit = async (data) => {
    const formData = new FormData();
    // handle upload
    if (data.thumb) formData.append("thumb", data.thumb[0]);
    delete data.thumb;
    if (data.images)
      for (const el of data.images) {
        formData.append("images", el);
      }
    delete data.images;
    // handle array
    if (data.general) formData.append("general", JSON.stringify(data.general));
    delete data.general;
    if (data.detail) formData.append("detail", JSON.stringify(data.detail));
    delete data.detail;
    // handle remaining data
    for (const key in data) {
      if (data[key]) formData.append(key, data[key]);
    }
    // call api
    const id = toast.loading("Please wait...");
    await productApi
      .create(formData)
      .then((res) => {
        reset();
        setInvalid(true);
        toast.update(id, {
          render: "Successfully created product",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setInvalid(true);
        toast.update(id, {
          render: err.data.message,
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      });
  };
  // function end

  // react-hook-form start

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    shouldFocusError: false,
    defaultValues: {},
    resolver: yupResolver(create),
  });

  // use arrayField start
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

  // effect start
  React.useEffect(() => {
    (async () => {
      await brandApi
        .getAll()
        .then((res) => {
          dispatch(brandReducer.set(res.data));
        })
        .catch((err) => console.log(err));
      await categoryApi
        .getAll()
        .then((res) => {
          dispatch(categoryReducer.set(res.data));
        })
        .catch((err) => console.log(err));
    })();
  }, []);
  // effect end

  return (
    <>
      <div>
        <div className="mb-10">
          <h3 className="mb-2 text-2xl font-bold capitalize">create product</h3>
          <Breadcrumbs params={params} routes={routes} />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid w-full grid-cols-12 gap-8"
          // encType="multipart/form-data"
        >
          {/* form-create__general start */}
          <div className="col-span-12 flex flex-col gap-4 rounded-md bg-white p-4 xl:col-span-6">
            <h3 className="text-xl font-bold capitalize">General</h3>
            <InputField
              control={control}
              label="product name"
              placeholder="click to type"
              fieldId="name"
              error={errors.name?.message}
              className="rounded-md focus:border-blue-500"
              required
            />
            <SelectField
              control={control}
              label="prodcut brand"
              placeholder="click to select"
              fieldId="brandId"
              options={brands.map((el) => {
                return {
                  label: el.name,
                  value: el.id,
                };
              })}
              error={errors.brandId?.message}
              required
            />
            <SelectField
              control={control}
              label="Product category"
              placeholder="click to select"
              fieldId="categoryId"
              options={categories.map((el) => {
                return {
                  label: el.name,
                  value: el.id,
                };
              })}
              error={errors.categoryId?.message}
              required
            />
            {/* useFieldArray start */}
            <AdditionalField
              arrayField={generalFields}
              removeField={generalRemove}
              appendField={generalAppend}
              fieldId="general"
              control={control}
              error={errors.general}
            />
            {/* useFieldArray end */}
          </div>
          {/* form-create__general end */}

          {/*form-create__ detail start */}
          <div className="col-span-12 flex flex-col gap-4 rounded-md bg-white p-4 xl:col-span-6">
            <h3 className="text-xl font-bold capitalize">detail</h3>
            <InputField
              control={control}
              label="product price"
              placeholder="click to type"
              fieldId="price"
              error={errors.price?.message}
              className="rounded-md focus:border-blue-500"
              required
            />

            <InputField
              control={control}
              label="product inventory"
              placeholder="click to type"
              fieldId="inventory"
              error={errors.inventory?.message}
              className="rounded-md focus:border-blue-500"
              required
            />
            <InputField
              control={control}
              label="product color"
              placeholder="click to type"
              fieldId="color"
              error={errors.color?.message}
              className="rounded-md focus:border-blue-500"
              required
            />

            <AdditionalField
              arrayField={detailFields}
              removeField={detailRemove}
              appendField={detailAppend}
              fieldId="detail"
              control={control}
            />

            <FileField
              fieldId="thumb"
              control={control}
              error={errors.thumb?.message}
              label="upload thumbnail image"
              invalid={invalid}
              setInvalid={setInvalid}
            />
            <FileField
              fieldId="images"
              control={control}
              error={errors.images?.message}
              label="upload some detail images"
              multiple
              invalid={invalid}
              setInvalid={setInvalid}
            />
          </div>
          {/*form-create__ detail end */}

          <Button type="submit">
            <Icons.IconAdd className="text-2xl" />
          </Button>
        </form>
      </div>
    </>
  );
};

export default CreateProduct;
