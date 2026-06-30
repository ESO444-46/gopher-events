import { useState } from "react";
import Spinner from "./Spinner";
import axios from "axios";

const EventActions = ({ eventId, publicId }) => {
  const [loading, setLoading] = useState(false);
  const [rsvp, setRsvp] = useState(false);

  async function handleRsvp() {
    setLoading(true);
    localStorage.setItem("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIxLCJlbWFpbCI6InZhamluMDAxQHVtbi5lZHUiLCJpYXQiOjE3ODIzOTk0OTksImV4cCI6MTc4MjQwMDM5OX0.M3wH5Uz7wZPEKrxCLaHwfWAE6ayDQSZDX5hgkNXqWlY")
    const token = localStorage.getItem("token");
    try {
      const result = await axios.post(
        `http://localhost:3000/events/${publicId}/rsvp`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data.success) {
        setRsvp(true);
      }
    } catch (error) {
      console.log("Error occurred", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="h-1.5 bg-gradient-to-r from-[#7a0019] to-[#ffcc33]" />

      <div className="p-6 space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">Free</span>
          <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold border border-amber-100">
            Registration Required
          </span>
        </div>

        <button
          onClick={handleRsvp}
          disabled={loading || rsvp}
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0
            ${rsvp
              ? "bg-green-600 hover:bg-green-700 focus:ring-green-600"
              : "bg-[#7a0019] hover:bg-[#5a0012] hover:shadow-lg hover:-translate-y-0.5 focus:ring-[#7a0019]"
            }`}
        >
          {loading ? (
            <>
              <Spinner />
              Reserving...
            </>
          ) : rsvp ? (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              You're Going!
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
              Reserve your spot
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default EventActions;