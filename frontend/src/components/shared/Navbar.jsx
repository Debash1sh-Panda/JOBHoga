import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { FaRegCircleUser } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL_API_USER } from "../../utils/baseUrl";
import { setUser } from "../../redux/authSlice";
import { toast } from "sonner";
import Button from "./Button";

function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${BASE_URL_API_USER}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-white mt-0 sticky top-0 z-50 shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-12xl h-16">
        <div>
          <Link to="/">
            <h1 className="text-2xl font-bold">
              Job<span className="text-red-600">Hoga</span>
            </h1>
          </Link>
        </div>
        <div className="flex gap-12">
          {user && user?.role == "recruiter" ? (
            <>
              <ul className="flex font-medium items-center gap-5">
                <Link to="/">
                  <li className="text-black hover:bg-gradient-to-r hover:from-black hover:to-red-500 hover:bg-clip-text hover:text-transparent">
                    Companies
                  </li>
                </Link>
                <Link to="/jobs">
                  <li className="text-black hover:bg-gradient-to-r hover:from-black hover:to-red-500 hover:bg-clip-text hover:text-transparent">
                    Jobs
                  </li>
                </Link>
              </ul>
            </>
          ) : (
            <>
              <ul className="flex font-medium items-center gap-5">
                <Link to="/">
                  <li className="text-black hover:bg-gradient-to-r hover:from-black hover:to-red-500 hover:bg-clip-text hover:text-transparent">
                    Home
                  </li>
                </Link>
                <Link to="/jobs">
                  <li className="text-black hover:bg-gradient-to-r hover:from-black hover:to-red-500 hover:bg-clip-text hover:text-transparent">
                    Jobs
                  </li>
                </Link>
                <Link to="/browse">
                  <li className="text-black hover:bg-gradient-to-r hover:from-black hover:to-red-500 hover:bg-clip-text hover:text-transparent">
                    Browse
                  </li>
                </Link>
              </ul>
            </>
          )}

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <button className="px-6 py-2 font-bold bg-none border border-red-600 text-white rounded-md relative">
                  <span className="bg-gradient-to-r from-black to-red-500 bg-clip-text text-transparent hover:from-gray-500 hover:to-red-500 hover:text-transparent">
                    Login
                  </span>
                </button>
              </Link>
              <Link to="/signup">
                <Button name="Signup"/>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://github.com/shadcn.png"
                    }
                    alt="profile image"
                    className="rounded-full w-10 h-10"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 rounded-lg shadow-lg bg-white border border-gray-200">
                <div className="flex space-y-2 gap-4">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={
                        user?.profile?.profilePhoto ||
                        "https://github.com/shadcn.png"
                      }
                      alt="profile image"
                      className="rounded-full w-12 h-12"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                {user && user?.role == "student" && (
                  <>
                    <Link to="/profile">
                      <button variant="link" className="flex mt-4">
                        <FaRegCircleUser className="mr-1 mt-1 text-green-400" />
                        View Profile
                      </button>
                    </Link>
                  </>
                )}
                <button variant="link" onClick={logoutHandler} className="flex mt-2">
                  <RiLogoutCircleLine className="mr-1 mt-1 text-[#F83002]" />
                  Logout
                </button>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
