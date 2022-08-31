import React from "react";
import "./styles.scss";
export default function NotFound() {
  return (
    <>
      <div className="container404">
        <h1 className="h1404">404</h1>
        <p className="p404">Oops! Something is wrong.</p>
        <a className="button404" href="/">
          <i class="icon-home"></i> Quay lại trang chủ.
        </a>
      </div>
    </>
  );
}
