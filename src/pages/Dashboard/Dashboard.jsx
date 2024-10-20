import { toast } from "react-toastify";
import { get } from "../../helper/httpRequest";

function Dashboard() {
  const handleTestRoute = async () => {
    const res = await get("/users");
    const dataRes = await res.json();

    if (res.ok) {
      toast.success(dataRes.message);
    } else {
      toast.error(dataRes.message);
    }
  };

  return (
    <>
      <h1>Dashboard page</h1>
      {/* This route use to test permission of user */}
      {/* http://localhost:3000/dashboard */}
      <button onClick={handleTestRoute}>Test route</button>
    </>
  );
}

export default Dashboard;
