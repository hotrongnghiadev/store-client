import React from "react";
import { Tilt } from "react-tilt";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

import Icons from "../../components/Icons";
import * as memberReducers from "../../redux/member.slice";
import * as userValidator from "../../validators/user.validate";
import userApi from "../../api/user.api";
import InputField from "../../components/InputField";
import bgLogin from "../../assets/images/img-01.png";

const reactTiltOptions = {
  reverse: false, // reverse the tilt direction
  max: 30, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.2, // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
};

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { invalid } = useParams();
  const member = useSelector((state) => state.member);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userValidator.signin),
    shouldFocusError: false,
  });

  const onSubmit = async (body) => {
    await userApi
      .signin(body)
      .then((res) => {
        if (res.data.role !== "member")
          toast.error("Please signin with memeber account");
        else {
          dispatch(memberReducers.signin(res.data));
          navigate("/");
          toast.success("Signin in successfully");
        }
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
  };

  React.useEffect(() => {
    if (member.data?.role === "user") {
      navigate("/");
      toast.warn("Logged in with user account");
    }
    if (invalid === "invalid") toast.error("Please signin with user account");
  }, []);

  return (
    <>
      <div className=" flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 p-4">
        <div className="flex w-full items-center justify-between rounded-xl bg-white px-8 py-24 drop-shadow-2xl sm:px-20 lg:w-[50rem]">
          <div className="hidden w-3/5 md:block">
            <Link to="/">
              <Tilt options={reactTiltOptions}>
                <img src={bgLogin} alt="bgLogin" />
              </Tilt>
            </Link>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full md:pl-24 lg:w-[40rem]"
          >
            <h3 className="text-center text-2xl font-bold capitalize">
              member login
            </h3>
            <InputField
              control={control}
              label="username"
              placeholder="click to type"
              fieldId="userName"
              validator={register("userName")}
              error={errors.userName?.message}
              icon={<Icons.IconBxsUser />}
              className="rounded-full focus:animate-my-burn"
            />
            <InputField
              control={control}
              label="password"
              placeholder="click to type"
              fieldId="password"
              validator={register("password")}
              error={errors.password?.message}
              type="password"
              icon={<Icons.IconPassword />}
              className="rounded-full focus:animate-my-burn"
            />

            <div
              id="button"
              className="relative z-10 my-5 flex flex-col overflow-hidden rounded-full "
            >
              <button
                type="submit"
                className="peer bg-transparent p-2.5 font-bold uppercase text-white focus-visible:outline-none"
              >
                submit
              </button>
              <div className=" absolute left-[-100%] top-0 -z-10 h-full w-[200%] rounded-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-200 peer-hover:left-0 peer-active:scale-y-90"></div>
            </div>
            <Link
              to="/signup"
              className="block text-center text-green-500 underline"
            >
              Signup new account
            </Link>
            <Link to="/" className="block text-center text-green-500 underline">
              <Icons.IconHome className="text-4xl" />
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
