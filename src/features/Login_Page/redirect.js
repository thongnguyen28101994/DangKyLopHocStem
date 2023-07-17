import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { CommonApi } from "../../apis/CommonApi";

const Direction = () => {
  let location = useLocation();
  let history = useHistory();
  sessionStorage.setItem(
    "token",
    decodeURIComponent(location.search.substring(7))
  );

  useEffect(() => {
    CommonApi.getSession().then(async (res) => {
      if (res.statusCode === 200) {
        localStorage.setItem("Data", JSON.stringify(res.result));       
      }
    });
  }, [history]);
  return <></>;
};

export default Direction;
