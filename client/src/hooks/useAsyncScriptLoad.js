import { insertScript } from "../helpers/utils";
import { useEffect, useState } from "react";


const useAsyncScriptLoad = (url) => {

  const [loaded, setLoaded] = useState(false);

  // Load Scripts
  useEffect(() => {

    const loadAssets = async () => {
      await insertScript(url);
      setLoaded(true);
    }
    
    if (!loaded) loadAssets();

  }, [loaded]);

  return loaded;

}


export default useAsyncScriptLoad;
