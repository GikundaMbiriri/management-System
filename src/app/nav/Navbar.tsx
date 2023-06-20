import React from "react";
import { useEffect } from "react";
import { useRefreshTokenQuery } from "../auth/authApiSlice";
import { useDispatch,useSelector } from "react-redux";
import { setCredentials } from "../auth/authSlice";
import { selectSearch } from "./searchSlice";
function Navbar() {
  const { data, isLoading, isSuccess, isError, error } =
    useRefreshTokenQuery("");
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(data);
    if (data) {
      dispatch(setCredentials(data));
    }
  }, [isLoading]);

  return (
    <div>
      <div> Hello guys,{data?.role}</div>
      <input
        type="text"
        name="search"
        id="search"

        placeholder="Search here..."
      />
    </div>
  );
}

export default Navbar;
