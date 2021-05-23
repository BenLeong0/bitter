import React from "react";
import CoreService from "../core/CoreService";

const Admin: React.FC<{}> = () => {
  const coreService = new CoreService();

  document.title = "Admin / Bitter";

  const onClick = async (e: any) => {
    e.preventDefault();

    coreService
      .getSession()
      .then((resp) => console.log(resp))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div>Admin page</div>
      <button onClick={onClick}>yo</button>
    </>
  );
};

export default Admin;
