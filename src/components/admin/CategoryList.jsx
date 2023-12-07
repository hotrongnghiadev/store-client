import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import * as categoryReducer from "../../redux/category.slice";
import categoryApi from "../../api/category.api";
import { useSelector, useDispatch } from "react-redux";
import Button from "../Button";
import Icons from "../Icons";
import clsx from "clsx";
import Modal from "../Modal";
import UpdateCategory from "./UpdateCategory";

const CategoryList = () => {
  // hook start
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  const [isCheckAll, setIsCheckAll] = React.useState(false);
  const [check, setCheck] = React.useState([]);
  const [isUpdateCategory, setIsUpdateCategory] = React.useState(false);
  const [updateCategoryData, setUpdateCategoryData] = React.useState({});

  const formRef = React.useRef();
  // hook end

  // function start
  const handleCheckAll = (e) => {
    setIsCheckAll(e.target.checked);
    setCheck(categories.map((el) => el.id));
    setValue(
      "ids",
      categories.map((el) => el.id),
    );
    if (isCheckAll) {
      setCheck([]);
      setValue("ids", []);
    }
  };
  const handleCheck = (e) => {
    const { value, checked } = e.target;
    setCheck((prev) => [...prev, value]);
    if (!checked) setCheck(check.filter((el) => el !== value));
  };

  const handleDelMany = async (data) => {
    await categoryApi
      .delMany(data)
      .then((res) => {
        toast.success(
          `You have successfully deleted the ${res.data.deletedCount} checked items`,
        );
        dispatch(categoryReducer.delMany(check));
        // reset check after delete``
        setIsCheckAll(false);
        setCheck([]);
      })
      .catch((err) => console.log(err));
  };
  const handleDelOne = async (id) => {
    await categoryApi
      .delMany({ ids: id })
      .then((res) => {
        toast.success(
          `You have successfully deleted the ${res.data.deletedCount} checked items`,
        );
        dispatch(categoryReducer.delMany(id));
      })
      .catch((err) => console.log(err));
  };
  // function end

  // react-hook-form start
  const { handleSubmit, register, setValue } = useForm({
    shouldFocusError: false,
    defaultValues: {
      ids: [],
    },
  });

  const onSubmit = async (data) => {
    if (
      window.confirm(
        `Are you sure you want to delete the ${check.length} checked category?`,
      )
    ) {
      handleDelMany(data);
    }
  };
  // react-hook-form end

  // useEffect start
  React.useEffect(() => {
    (async () => {
      await categoryApi
        .getAll()
        .then((res) => {
          dispatch(categoryReducer.set(res.data));
        })
        .catch((err) => console.log(err));
    })();
  }, []);

  React.useEffect(() => {
    if (categories.length > 0) {
      if (categories.length === check.length) setIsCheckAll(true);
      else setIsCheckAll(false);
    } else setIsCheckAll(false);
  }, [check]);
  // useEffect end

  return (
    <>
      {isUpdateCategory && (
        <Modal
          label="update category"
          isOpen={isUpdateCategory}
          setIsOpen={setIsUpdateCategory}
        >
          <UpdateCategory
            category={updateCategoryData}
            isOpen={isUpdateCategory}
            setIsOpen={setIsUpdateCategory}
          />
        </Modal>
      )}
      <div className="h-full  gap-4 rounded-md bg-white p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold capitalize">category list</h3>
          {/* submit to delete all category already check */}
          <Button
            type="submit"
            className={clsx("bg-red-500 transition-opacity", {
              "opacity-0": check.length < 1 || categories.length < 1,
            })}
            onClick={() => formRef.current.requestSubmit()}
          >
            <Icons.IconDeleteAlertOutline className="text-2xl" />
          </Button>
        </div>
        {/* table */}
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <table className="w-full table-auto">
            <thead>
              <tr
                role="row"
                className="bg-bgtabletitle border-y border-gray-100"
              >
                <th className="p-4 text-start">
                  <div className="">
                    <input
                      type="checkbox"
                      className="accent-blue-500"
                      name="selectAll"
                      checked={isCheckAll}
                      onChange={(e) => handleCheckAll(e)}
                    />
                  </div>
                </th>
                <th className="p-4 text-start capitalize text-slate-500">
                  name
                </th>
                <th className="p-4 text-start capitalize text-slate-500">
                  description
                </th>
                <th className="p-4 text-start capitalize text-slate-500">
                  action
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((el, index) => (
                <tr role="row" key={index} className="border-b">
                  <td className="p-4">
                    <div>
                      <input
                        {...register("ids")}
                        type="checkbox"
                        value={el.id}
                        className=" accent-blue-500"
                        onChange={(e) => {
                          handleCheck(e);
                        }}
                        checked={check.includes(el.id)}
                      />
                    </div>
                  </td>
                  <td className="p-4">{el.name}</td>
                  <td className="p-4">
                    <div className="line-clamp-2 break-all">{el.desc}</div>
                  </td>
                  <td className="p-4">
                    <div className="whitespace-nowrap text-gray-400">
                      <button
                        className="mr-2"
                        type="button"
                        // if forget pass function in callback, it create render infinity
                        onClick={(e) => {
                          setIsUpdateCategory(true);
                          setUpdateCategoryData(el);
                          e.stopPropagation();
                        }}
                      >
                        <Icons.IconEdit className="text-2xl text-blue-500" />
                      </button>
                      <button
                        className="mr-2"
                        type="button"
                        onClick={() => {
                          if (
                            window.confirm(
                              `Are you sure you want to delete ${el.name} ?`,
                            )
                          ) {
                            handleDelOne(el.id);
                          }
                        }}
                      >
                        <Icons.IconDelete className="text-2xl text-red-500 " />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
        {categories.length < 1 && (
          <div className="py-4 text-center text-orange-500 first-letter:uppercase">
            category list is empty
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryList;
