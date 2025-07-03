import { useNavigate } from "react-router";

const useNavigation = () => {
  const navigate = useNavigate();

  const redirectToPage = (path: string) => {
    navigate(path);
  };

  return { redirectToPage };
};

export default useNavigation;