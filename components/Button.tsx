import { cva, VariantProps } from "class-variance-authority";
import { FC } from "react";

const buttonClasses = cva(
  [
    "rounded-3xl",
    "font-bold",
    "hover:scale-110",
    "active:scale-100",
    "transition",
    "duration-200",
    "ease-in-out",
  ],
  {
    variants: {
      intent: {
        primary: [
          "bg-white",
          "text-blue-800",
          "border-transparent",
          "hover:bg-yellow-200",
        ],

        secondary: [
          "bg-blue-800",
          "text-white",
          "border-gray-400",
          "hover:bg-yellow-200",
          "hover:text-blue-800",
          "hover:border-blue-800",
          "border-solid",
          "border-2",
          "border-yellow-400",
        ],
        text: ["bg-transparent", "text-black"],
      },
      size: {
        small: ["text-md", "py-1", "px-2"],
        medium: ["text-lg", "px-6", "py-2"],
        large: ["text-xlg", "px-8", "py-4"],
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "medium",
    },
  }
);

export interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonClasses> {
  type?;
  onClick?;
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  intent,
  size,
  ...props
}) => {
  return (
    <button className={buttonClasses({ intent, size, className })} {...props}>
      {children}
    </button>
  );
};

export default Button;
