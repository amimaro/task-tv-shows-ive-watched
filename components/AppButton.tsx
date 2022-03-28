export const AppButton: React.FC<{
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: (e: any) => void;
  isSubmitting?: boolean;
  children: any;
  className?: string;
}> = ({
  type = "button",
  onClick = () => {},
  isSubmitting = false,
  children,
  className,
}) => {
  return (
    <button
      type={type}
      disabled={isSubmitting}
      className={`px-4 py-2 min-w-max text-white font-semibold tracking-wider rounded-md shadow-md shadow-teal-900 active:bg-teal-800 active:shadow-none ${className} ${
        isSubmitting ? "bg-teal-900 cursor-wait" : "bg-teal-700 cursor-pointer"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
