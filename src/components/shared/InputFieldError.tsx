import { getInputFieldError, IInputErrorState } from "@/lib/getInputFieldError";
import { FieldDescription } from "../ui/field";

interface IFieldErrorProps {
  field: string;
  state: IInputErrorState;
}
const InputFieldError = ({ field, state }: IFieldErrorProps) => {
  if (!getInputFieldError(field, state)) return null;
  return (
    <FieldDescription className="text-red-500">
      {getInputFieldError(field, state)}
    </FieldDescription>
  );
};

export default InputFieldError;
