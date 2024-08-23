import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { FaRegCircleUser } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function Navbar() {
  const user = false;

  return (
    <div className="bg-white mt-0">
      <div className="flex items-center justify-between mx-auto max-w-12xl h-16">
        <div>
          <Link to="/">
            <h1 className="text-2xl font-bold">
              Job<span className="text-[#F83002]">Hoga</span>
            </h1>
          </Link>
        </div>
        <div className="flex gap-12">
          <ul className="flex font-medium items-center gap-5">
            <Link to='/'><li>Home</li></Link>
            <Link to='/'><li>Jobs</li></Link>
            <Link to='/'><li>Browse</li></Link>
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to='/login'>
                {" "}
                <button className="px-6 py-2 font-bold bg-none text-white rounded-md relative">
                  <span className="bg-gradient-to-r from-black to-red-500 bg-clip-text text-transparent hover:from-gray-500 hover:to-red-500 hover:text-transparent">
                    Login
                  </span>
                </button>
              </Link>
              <Link to='/signup'>
                {" "}
                <Button className="px-6 py-2 font-semibold text-white rounded-md bg-gradient-to-r from-black to-red-500 hover:from-gray-600 hover:to-red-400 hover:text-black">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="profile image"
                    className="rounded-full w-10 h-10"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 rounded-lg shadow-lg bg-white border border-gray-200">
                <div className="flex space-y-2 gap-4">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="profile image"
                      className="rounded-full w-12 h-12"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Debasish Panda</h4>
                    <p className="text-sm text-muted-foreground">
                      i am a software developer
                    </p>
                  </div>
                </div>
                <Button variant="link">
                  <FaRegCircleUser className="mr-1 text-green-400" />
                  View Profile
                </Button>
                <Button variant="link">
                  <RiLogoutCircleLine className="mr-1 text-[#F83002]" />
                  logout
                </Button>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
