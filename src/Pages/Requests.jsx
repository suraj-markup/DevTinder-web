import { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import axios from "axios";

const Requests = () => {
  const dispatch = useDispatch();
  const request = useSelector((store) => store.request);

  const fetchRequests = async () => {
    const res = await axios.get(BASE_URL + "/user/requests/received", {
      withCredentials: true,
    });
    // console.log(res.data.data||"No requests found");
    dispatch(addRequest(res.data.data));
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  const handleRequest = async (id, status) => {
    const res = await axios.post(
      BASE_URL + `/request/review/${status}/${id}`,
      {},
      { withCredentials: true }
    );
    alert(res.data.message);
    // console.log(res);
    dispatch(removeRequest(id));
  };

//   console.log(request || "No requests found");
  if (!request) {
    return (
      <div className="text-2xl font-bold text-center">
        <p>No requests found!!!!</p>
      </div>
    );
  }

  return (
    <div className="p-10 ">
      <h1 className="text-2xl font-bold text-center">Your Requests</h1>
      <div className="flex flex-wrap gap-4">
        {request &&
          request.map((request) => {
            const {
              _id,
              firstName,
              lastName,
              age,
              gender,
              skills,
              photoUrl,
              about,
            } = request.fromUserId;
            return (
              <div
                key={_id}
                className="border-2 border-cyan-400 flex flex-row gap-2 rounded-lg p-2 "
              >
                <div className="flex justify-center items-center w-1/4">
                  <img
                    src={
                      photoUrl ||
                      "https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2526512481.jpg"
                    }
                    alt={firstName}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-bold">
                    {firstName} {lastName}
                  </h2>
                  <div className="flex justify-start gap-2">
                    <p>{age}</p>
                    <p>{gender}</p>
                  </div>
                  <p>{about}</p>

                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <div
                        key={skill}
                        className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-row m-2 gap-2">
                    <button
                      className="btn btn-primary w-20"
                      onClick={() => handleRequest(request._id, "accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-secondary w-20"
                      onClick={() => handleRequest(request._id, "rejected")}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Requests;
