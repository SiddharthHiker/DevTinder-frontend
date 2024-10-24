import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.Connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
        
      });
      console.log("API Response: ", res.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1>No Connection Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-blod text-white text-3xl">Connections</h1>

      {connections.map((connection) => {
        const {_id, firstName, lastName, photoUrl, age, gender, about } =
          connection;
        return (
          <div key={_id || Math.random()} className=" flex m-4 p-4  rounded-lg bg-base-300 w-1/2 mx-auto">
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={photoUrl}
              />
            </div>
            <div className="text-left m-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <h2>{age + ", " + gender}</h2>}
              <p>{about}</p>
            </div>
 
          </div>
        );
      })}
    </div>
  );
};

export default Connections;