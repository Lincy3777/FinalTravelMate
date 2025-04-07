// // 'use client';

// // import { IconType } from "react-icons";

// // interface ButtonProps {
// //     label : string;
// //     onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
// //     disabled?: boolean;
// //     outline?: boolean;
// //     small?: boolean;
// //     icon?: IconType;
// // }

// // const Button: React.FC<ButtonProps> =({
// //     label,
// //     onClick,
// //     disabled,
// //     outline,
// //     small,
// //     icon : Icon
// // }) => {
// //     return(
        
// //         <button onClick={onClick}
// //             disabled={disabled}
// //             className={` relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-90 transition w-full 
// //             ${outline ? 'bg-white' : 'bg-blue-500'}
// //             ${outline ? 'border-black' : 'border-blue-500'}
// //             ${outline ? 'text-black' : 'text-white'}
// //             ${small ? 'py-1' : 'py-3'}
// //             ${small ? 'text-sm' : 'text-md'}
// //             ${small ? 'font-light' : 'font-semibold'}
// //             ${small ? 'border-[1px]' : 'border-2'}`}>
// //                 {Icon && (
// //                     <Icon size={24} className="absolute left-4 top-3" />
// //                 )}
// //                 {label}
// //         </button>


// //     );
// // }
// // export default Button;


// "use client";

// import { IconType } from "react-icons";

// interface ButtonProps {
//   label: string;
//   onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
//   disabled?: boolean;
//   outline?: boolean;
//   small?: boolean;
//   icon?: IconType;
//   type?: "button" | "submit" | "reset"; // Add type prop for form buttons
//   className?: string; // Accept custom className prop
// }

// const Button: React.FC<ButtonProps> = ({
//   label,
//   onClick,
//   disabled,
//   outline,
//   small,
//   icon: Icon,
//   type = "button", // Default to button if not provided
//   className = "", // Default to an empty string for className
// }) => {
//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       type={type} 
//       className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-90 transition
//             ${outline ? "bg-white" : "bg-blue-500"}
//             ${outline ? "border-black" : "border-blue-500"}
//             ${outline ? "text-black" : "text-white"}
//             ${small ? "py-1" : "py-3"}
//             ${small ? "text-sm" : "text-md"}
//             ${small ? "font-light" : "font-semibold"}
//             ${small ? "border-[1px]" : "border-2"}
//             ${className}`} 
//     >
//       {Icon && <Icon size={24} className="absolute left-4 top-3" />}
//       {label}
//     </button>
//   );
// };

// export default Button;


"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  type?: "button" | "submit" | "reset";
  className?: string;
  size?: "small" | "medium" | "large"; // Added size prop
  shape?: "rounded" | "square" | "circle"; // Added shape prop
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
  type = "button",
  className = "",
  size = "medium",
  shape = "rounded", 
}) => {
  let sizeClasses = "";
  switch (size) {
    case "small":
      sizeClasses = "py-1 text-sm font-light border-[1px]";
      break;
    case "medium":
      sizeClasses = "py-3 text-md font-semibold border-2";
      break;
    case "large":
      sizeClasses = "py-4 text-lg font-semibold border-3 px-6";
      break;
    default:
      sizeClasses = "py-3 text-md font-semibold border-2";
  }

  let shapeClasses = "";
  switch (shape) {
    case "rounded":
      shapeClasses = "rounded-lg";
      break;
    case "square":
      shapeClasses = "rounded-none";
      break;
    case "circle":
      shapeClasses = "rounded-full";
      break;
    default:
      shapeClasses = "rounded-lg";
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-90 transition w-full 
        ${outline ? "bg-white" : "bg-blue-500"}
        ${outline ? "border-black" : "border-blue-500"}
        ${outline ? "text-black" : "text-white"}
        ${sizeClasses}
        ${shapeClasses}
        ${className}`}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};

export default Button;