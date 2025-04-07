import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const usePreventBackNavigation = (redirectPath = "/") => {
  const navigate = useNavigate();

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      navigate(redirectPath); // Redirect to the specified page
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate, redirectPath]);
};

export default usePreventBackNavigation;
