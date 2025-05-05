import type { AlertType } from "../types.d.ts";
import { ALERT_TYPES } from "../constants.ts";

interface AlertProps {
    type: AlertType;
    title: string;
    message: string;
  }

export function Alert({ type, title, message }: AlertProps) {

    let bgColor = "";
    let textColor = "";
    let borderColor = "";

    switch (type) {
        case ALERT_TYPES.SUCCESS:
            bgColor = "bg-green-100";
            textColor = "text-green-800"; 
            borderColor = "border-green-200";
            break;
        case ALERT_TYPES.ERROR:
            bgColor = "bg-red-100";
            textColor = "text-red-800";
            borderColor = "border-red-200";
            break;
        case ALERT_TYPES.WARNING:
            bgColor = "bg-yellow-100";
            textColor = "text-yellow-800";
            borderColor = "border-yellow-200";
            break;
        case ALERT_TYPES.INFO:
            bgColor = "bg-blue-100";
            textColor = "text-blue-800";
            borderColor = "border-blue-200";
            break;
    }

    return (
        <div className={`w-full p-4 rounded-lg border shadow-sm ${bgColor} ${textColor} ${borderColor}`}>
            <h2 className="font-semibold">{title}</h2>
            <p>{message}</p>
        </div>
    )
}
