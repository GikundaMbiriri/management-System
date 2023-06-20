"use client";
import { useSelector } from "react-redux";
import Navbar from "../nav/Navbar";
import { selectCurrentUser } from "../auth/authSlice";
import ProgramPage from "./components/ProgramPage";
function page() {
  const user = useSelector(selectCurrentUser);

  return (
    <>
      {" "}
      <Navbar />
      <ProgramPage />
      <div>{user?.role}</div>
    </>
  );
}

export default page;
