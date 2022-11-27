import { useState } from "react";
import { useDebounce } from "react-use";
export const PageLoadingIndicator = () => {
  const [isShow, setIsShow] = useState(false);
  useDebounce(
    () => {
      setIsShow(true);
    },
    1000,
    []
  );

  if (!isShow) {
    return null;
  }

  return <div>Loading page...</div>;
};

export default PageLoadingIndicator;
