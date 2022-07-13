import { useState } from "react";

const useInput = () => {
  const [value, setValue] = useState(null);
 
  const onPress= (e) => {
    setValue(e?.target.title)
  };
  return { value, onPress };
};

export default useInput;