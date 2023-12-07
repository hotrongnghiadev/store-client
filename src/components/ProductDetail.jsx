import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";

import VoteBar from "./VoteBar";
import Breadcrumbs from "./Breadcrumbs";
import productApi from "../api/product.api";
import { formatNumber, showStar } from "../utils/helpers";
import Button from "./Button";
import VoteOptions from "./VoteOption";
import Modal from "./Modal";
import userApi from "../api/user.api";
import { toast } from "react-toastify";
import * as memberReducer from "../redux/member.slice";

const ProductDetail = () => {
  const member = useSelector((state) => state.member);
  const dispatch = useDispatch();
  const [product, setProduct] = React.useState({});
  const [callApi, setCallApi] = React.useState(false);

  const [isRate, setIsRate] = React.useState(false);
  const { slug, category } = useParams();

  const routes = [
    { path: "/:category", breadcrumb: category },
    { path: "/", breadcrumb: "Home" },
    {
      path: "/:category/:productId/:productName",
      breadcrumb: product.name,
    },
  ];

  const SETTINGS = {
    dots: true,
    infinite: true,
    speed: 200,
    initialSlide: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: function (i) {
      return (
        <a>
          <img src={product?.images[i].path} />
        </a>
      );
    },
    dotsClass: "slick-dots slick-thumb",
  };

  // function start
  const handleAddCart = async (product) => {
    if (member.data) {
      userApi
        .updateCart({ productId: product.id })
        .then((res) => {
          toast.success("The product has been added to cart");
          dispatch(memberReducer.addCart(product));
        })
        .catch((err) => console.log(err));
    } else toast.info("Required signin");
  };
  // function end

  React.useEffect(() => {
    (async function () {
      await productApi
        .getOne(slug)
        .then((res) => {
          setProduct(res.data);
        })
        .catch((err) => console.log(err));
    })();
  }, [callApi]);
  return (
    <>
      <div className="flex flex-col gap-8 bg-white p-4">
        {/* <div className="fixed inset-0 z-999  flex items-center justify-center bg-[rgba(0,0,0,.5)]">
          <VoteOptions productId={product.id} />
        </div> */}
        {isRate && (
          <Modal label="Rating Product" isOpen={isRate} setIsOpen={setIsRate}>
            <VoteOptions
              productId={product.id}
              setIsOpen={setIsRate}
              setProduct={setProduct}
              setCallApi={setCallApi}
            />
          </Modal>
        )}

        <Breadcrumbs routes={routes} />

        <h1 className="mt-4  pb-2 text-2xl font-bold capitalize text-black">
          {product.name}
        </h1>
        <div className="relative h-full  border p-8 pb-[var(--paging-height)]">
          <Slider {...SETTINGS}>
            {product?.images?.map((el, index) => (
              <div key={index}>
                <img src={el.path} />
              </div>
            ))}
          </Slider>
        </div>

        {/* detail info start */}
        <div className="">
          <h3 className="mb-4 text-2xl font-bold">General</h3>
          {/* info */}
          <ul className="">
            <li className="mb-2">
              Name:
              <span className="font-bold capitalize"> {product.name}</span>
            </li>
            <li className="mb-2">
              Brand:
              <span className="font-bold"> {product.brandId?.name}</span>
            </li>
            {product.desc?.map((el, index) => (
              <li key={index} className="mb-2 capitalize">
                {el.name}:<span className="font-bold"> {el.content}</span>
              </li>
            ))}
            <li className="mb-2">
              Sold:
              <span className="font-bold"> {product.sold}</span>
            </li>
          </ul>
          {/*  */}
          <div className="">
            <div>
              <div className="rounded-mdp-2 mb-2  font-bold text-red-600">
                {formatNumber(product.price)} VNĐ
              </div>
              <Button onClick={() => handleAddCart(product)}>
                Add to cart
              </Button>
            </div>
          </div>
        </div>

        {/* rating start */}
        <div className=" border">
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center gap-2 ">
              <div className="text-lg font-bold">{product.starAvg}/5</div>
              <div className="flex">
                {showStar(product.starAvg).map((el, index) => (
                  <el.icon key={index} className="text-xl text-orange-600" />
                ))}
              </div>
              <div className="whitespace-nowrap">
                <span className=" font-bold">{product?.ratings?.length}</span>{" "}
                ratings and comments
              </div>
            </div>
          </div>
          <div className="border-l p-2">
            {Array.from(Array(5).keys())
              .reverse()
              .map((el, index) => {
                const count = product?.ratings?.filter(
                  (elRating) => elRating.star === el + 1,
                ).length;
                return (
                  <VoteBar
                    key={el}
                    number={el + 1}
                    count={count}
                    total={product?.ratings?.length}
                    starAvg={product?.starAvg}
                  />
                );
              })}
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            type="button"
            onClick={(e) => {
              if (member.data) {
                setIsRate(true);
                // prevent modal close because propagation
                e.stopPropagation();
              } else toast.info("Required signin");
            }}
          >
            Review now
          </Button>
        </div>
        {/* rating end */}

        {/* comment start */}
        <div className="mt-12 flex flex-col gap-4">
          {!product?.comments?.length ? (
            <div className="flex justify-center font-bold">
              <div className="text-center">
                <p>Chưa có có comment nào!</p>
                <p>Bạn hãy là người comment đầu tiên!</p>
              </div>
            </div>
          ) : (
            <h3 className="text-2xl font-bold">Comments</h3>
          )}
          {product?.comments?.map((el, index) => {
            return (
              <div key={index} className="mt-2 flex gap-4 ">
                <div>
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-200 p-4 capitalize">
                    {el.userId.userName.charAt(0)}
                  </div>
                </div>
                {/* show star user comment đã đánh giá cho sản phẩm */}
                <div>
                  <div className="mt-1">{el.userId.userName}</div>
                  <div className="flex">
                    {showStar(
                      product?.ratings.find(
                        (elRating) => elRating.userId === el.userId.id,
                      ).star,
                    ).map((el, index) => (
                      <el.icon
                        key={index}
                        className="text-xl text-orange-600"
                      />
                    ))}
                  </div>
                  {/* content comment */}
                  <div className="mt-2">
                    <p className="text-sm">{el.content}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* comment end */}
      </div>
    </>
  );
};

export default ProductDetail;
