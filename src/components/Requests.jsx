import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect ,useState } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState("");

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        dispatch(removeRequest(_id));
        setSuccessMessage(
          `Request ${
            status === "accepted" ? "accepted" : "rejected"
          } successfully!`
        );

        // Clear the message after 3 seconds
        setTimeout(() => {
          setSuccessMessage(""); // Reset message after 3 seconds
        }, 3000);
      }
    } catch (err) {
      console.error("Error reviewing request:", err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recived", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return;

  if (requests.length === 0) return <h1> No Request Found</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="text-blod text-white text-3xl mb-6">
        Connections Requests
      </h1>
      {successMessage && (
        <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6">
          {successMessage}
        </div>
      )}

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className=" flex justify-between items-center m-2 p-2 rounded-lg bg-base-300 w-1/2 mx-auto shadow-lg"
          >
            <div>
              <img
                alt="User Avatar"
                className="w-20 h-20 rounded-full object-cover"
                src={photoUrl}
              />
            </div>
            <div className="text-left m-4 flex-grow">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {/* {age && gender && <h2>{age + ", " + gender}</h2>} */}
              {age && gender && (
                <h3 className="text-sm text-gray-500">{`${age}, ${gender}`}</h3>
              )}
              {/* <p>{about}</p> */}
              <p className="text-sm text-gray-400">{about}</p>
            </div>
            <div className="flex space-x-4">
              <button
                className="btn btn-outline btn-error mx-4"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-outline btn-success mx-4"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
