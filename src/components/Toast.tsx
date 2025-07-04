import type { Status } from "../enum";

interface TBackground {
  [key: string]: string;
};

const Toast = ({ children, show, flag }: { children: React.ReactNode, show: boolean, flag: Status }) => {
  const bgColour: TBackground = {
    'success': 'bg-green-400',
    'error': 'bg-red-400',
  };

  return (
    <>
      {show ? (
        <div className={`fixed ${bgColour[flag]} bottom-10 text-sm left-0 right-0 text-white rounded-md p-2 w-fit mx-auto z-10`}>
          {children}
        </div>
      ) : null}
    </>
  )
};

export default Toast;