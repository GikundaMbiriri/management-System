import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectProgramIds, useGetProgramsQuery } from "../programSlice";
import ProgramCard from "./ProgramCard";

function ProgramPage() {

    const { isLoading, isSuccess, isError, error } = useGetProgramsQuery(
        "/programme/programmes?pageNum=1&pageSize=10"
      );


  const orderedProgramIds = useSelector(selectProgramIds);

  let content;
  if (isLoading) {
    content = <p>Loading</p>;
  } else if (isSuccess) {
    content = orderedProgramIds.map((programId) => (
      <ProgramCard key={programId} programId={programId} />
    ));
  } else if (isError) {
    content = <p>{`${error}`}</p>;
  }
  return <div>{content}</div>;
}

export default ProgramPage;
