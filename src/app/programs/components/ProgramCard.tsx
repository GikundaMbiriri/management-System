import { useSelector } from "react-redux";
import { selectProgramById } from "../programSlice";
import { RootState } from "@/store";

function ProgramCard({ programId }: { programId: number | string }) {
  const program = useSelector((state: RootState) =>
    selectProgramById(state, programId)
  );

  return (
    <div>
      <h3>{program?.title}</h3>
    </div>
  );
}

export default ProgramCard;
