const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className=" cursor-pointer bg-amber-300 text-sm text-black px-4 py-2 rounded-full flex gap-2 my-auto"
      {...props}
    >
      {children}
    </button>
  )
};

export default Button;