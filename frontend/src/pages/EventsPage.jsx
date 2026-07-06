import { useEffect, useState } from "react";
import EventCard from "../components/events/EventCard";
import InputButton from "../components/events/InputButton";
import NavBar from "../components/events/NavBar";
import api from "../api/axios";
import { Link } from "react-router-dom";
import { useToast } from "../context/ToastContext";

const EventsPage = () => {
    const [events, setEvents] = useState([])
    const { showToast } = useToast()

    useEffect(() =>{
        async function fetchData (){
            try{
                const result = await api.get("/events/")
                const events = result.data.events
                setEvents(events)

            }catch(error){
                const errorMessage = error.response?.data?.message ?? "Failed to load events"
                showToast("error", errorMessage)
            }
        }
        fetchData()
    },[])

    return (
    <div className="min-h-screen bg-cream">

      {/* Top Nav Bar */}
      <NavBar></NavBar>


      {/* Hero Header Container — subtle split-screen divider shadow */}
      <InputButton
        setEvents = {setEvents}
      ></InputButton>

      {/* Event Grid Container */}
      <div className="bg-cream">
        
        <div className="max-w-6xl mx-auto p-6">
          
          {events.length > 0 && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
             {events.map((event) => {
                /*{ title, venue, startsAt, endsAt, imageUrl } */
                return (
                  <Link className="no-underline text-inherit" key={event.publicId} to= {`/events/${event.publicId}` }>
                        <EventCard
                        title={event.title}
                        venue={event.venue}
                        startsAt={event.startsAt}
                        endsAt={event.endsAt}
                        imageUrl={event.thumbnailUrl}
                        ></EventCard>    
                  </Link>
                )
             })}
          </div>}
          

        {events.length === 0 &&<div className="py-20 text-center">
            <div className="mx-auto h-16 w-16 bg-line/40 rounded-2xl flex items-center justify-center mb-4">
              <svg className="h-8 w-8 text-ink-soft" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-sans text-ink font-semibold">No events yet</h3>
            <p className="mt-1 text-ink-soft text-sm">Check back later for upcoming events!</p>
          </div>}
          
        </div>
      </div>
      
    </div>
  );
};

export default EventsPage;
