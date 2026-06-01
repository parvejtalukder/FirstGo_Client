import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TrackAParcel = () => {
  const { trackingId } = useParams();
  const axios = useAxiosSecure();

  const { data: trackingInfo = [], isLoading } = useQuery({
    queryKey: ["tracking", trackingId],
    queryFn: async () => {
      const res = await axios.get(`/trackings/${trackingId}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (trackingInfo.length === 0) {
    return (
      <div className="max-w-5xl mx-auto py-10">
        <div className="alert alert-warning">
          <span>No tracking information found.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Track Parcel</h1>
        <p className="text-lg mt-2">
          Tracking ID:
          <span className="font-semibold ml-2">{trackingId}</span>
        </p>
      </div>

      <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
        {trackingInfo.map((track, index) => (
          <li key={track._id}>
            {index !== 0 && <hr />}

            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5 text-success"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div
              className={`${
                index % 2 === 0
                  ? "timeline-start mb-10 md:text-end"
                  : "timeline-end md:mb-10"
              }`}
            >
              <time className="font-mono italic">
                {new Date(track.createdAt).toLocaleString()}
              </time>

              <div className="text-lg font-black capitalize">
                {track.status.replaceAll("-", " ")}
              </div>

              <p>{track.details}</p>
            </div>

            {index !== trackingInfo.length - 1 && <hr />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackAParcel;