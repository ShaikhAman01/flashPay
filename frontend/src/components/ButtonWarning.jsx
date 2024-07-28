import { Link } from "react-router-dom";

export function ButtonWarning({ label, buttonText, to }) {
  return (
    <div className="flex justify-center py-2 text-sm ">
      <div>{label}</div>
      <Link to={to} className="pointer pl-1 cursor-pointer underline px-2">{buttonText}</Link>
    </div>
  );
}
