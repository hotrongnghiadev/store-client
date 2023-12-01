import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import { update } from "../../validators/admin/product.validate";
import productApi from "../../api/admin/product.api";
import * as brandReducer from "../../redux/admin/brand.slice";
import * as categoryReducer from "../../redux/admin/category.slice";
import Breadcrumbs from "../../components/Breadcrumbs";
import InputField from "../../components/InputField";
import Icons from "../../components/Icons";
import SelectField from "../../components/SelectField";
import FileField from "../../components/FileField";
import Button from "../../components/Button";
import brandApi from "../../api/admin/brand.api";
import categoryApi from "../../api/admin/category.api";
import AdditionalField from "../../components/AdditionalField";
import SwitchField from "../SwitchField";

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
    path: "/admin/product/update",
    breadcrumb: "update product",
  },
];

const UpdateProduct = () => {
  // hook start
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const brands = useSelector((state) => state.brands);
  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products);
  const [invalid, setInvalid] = React.useState(false);
  const [product, setProduct] = React.useState({});
  // hook end

  // function start
  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    // handle upload
    if (data.thumb instanceof FileList) formData.append("thumb", data.thumb[0]);
    delete data.thumb;
    if (data.images instanceof FileList)
      for (const el of data.images) {
        formData.append("images", el);
      }
    delete data.images;
    // // handle array
    if (data.general) formData.append("general", JSON.stringify(data.general));
    delete data.general;
    if (data.detail) formData.append("detail", JSON.stringify(data.detail));
    delete data.detail;
    // handle remaining data
    for (const key in data) {
      if (typeof data[key] !== "undefined") formData.append(key, data[key]);
    }
    // call api
    const id = toast.loading("Please wait...");
    await productApi
      .update(formData, params.id)
      .then((res) => {
        console.log(res);
        toast.update(id, {
          render: "Successfully update product",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
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

  const handleDelOne = async (id) => {
    if (window.confirm(`Are you sure you want to delete ${product.name} ?`)) {
      await productApi
        .delMany({ ids: id })
        .then((res) => {
          toast.success(
            `You have successfully deleted the ${res.data.deletedCount} checked items`,
          );
          navigate("/admin/product/list");
        })
        .catch((err) => console.log(err));
    }
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
    // has been set in the reset(defaulValue) method
    defaultValues: {},
    resolver: yupResolver(update),
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
      if (products.length === 0) {
        await productApi
          .getOne(params.id)
          .then((res) => {
            reset(res.data);
            setProduct(res.data);
          })
          .catch((err) => console.log(err));
      } else {
        const product = products.filter((el) => el.id === params.id)[0];
        setProduct(product);
        reset(product);
      }
    })();
  }, [params.id]);
  // effect end

  return (
    <>
      <div>
        <div className="mb-10">
          <h3 className="mb-2 text-2xl font-bold capitalize">update product</h3>
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
            <SwitchField
              control={control}
              label="state product"
              fieldId="status"
            />
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
              defaultValue={product.thumb}
            />
            <FileField
              fieldId="images"
              control={control}
              error={errors.images?.message}
              label="upload some detail images"
              multiple
              invalid={invalid}
              setInvalid={setInvalid}
              defaultValue={product.images}
            />
          </div>
          {/*form-create__ detail end */}

          <div className="flex gap-4">
            <Button type="submit">
              <Icons.IconEdit className="text-2xl" />
            </Button>
            <Button
              type="button"
              className="bg-red-500"
              onClick={() => handleDelOne(product.id)}
            >
              <Icons.IconDelete className=" text-2xl" />
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;
