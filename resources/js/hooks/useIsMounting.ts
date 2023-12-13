/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: useIsMounting.ts
Created:  2023-12-13T06:01:41.106Z
Modified: 2023-12-13T06:01:41.106Z

Description: description
*/

import { useRef, useEffect } from 'react';

const useIsMounting = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};

export default useIsMounting;
