import { Link } from "react-router";

export default function BottomWarning({label,buttonText, to}){
    return <div className="py-2 text-sm flex justify-center">
        <div>
            {label}
        </div>
        <Link className="pointer cursor-pointer pl-1 underline " to={to}>{buttonText}</Link>
    </div>
}