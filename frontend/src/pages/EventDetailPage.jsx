import EventHero from "../components/eventDetail/EventHero";
import EventDescription from "../components/eventDetail/EventDesciption";
import WhenWhere from "../components/eventDetail/WhenWhere";
import EventCreator from "../components/eventDetail/EventCreator";
import EventActions from "../components/eventDetail/EventActions";
import EventDetailLoader from "../components/eventDetail/EventDetailLoader";
import axios from "axios";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const EventDetailPage = () => {
  const {publicId } = useParams()
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
      async function fetchEvent(){
        try{

          const result = await axios.get(`http://localhost:3000/events/${publicId}`)
          console.log(result)
          setDetails(result.data.event)

        }catch(error){
          setError(true)

        }finally{
          setLoading(false)        
        }
      }  
      fetchEvent()
  },[])

  if (error) return <div>
    Something went wrong
  </div>

  if (loading) return <EventDetailLoader></EventDetailLoader>

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero with background image + back/share buttons */}
      <EventHero 
      title = {details.title}
      />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-10">

            <EventDescription
             description = {details.description}
            />
            
            {/* Divider */}
            <div className="border-t border-gray-100" />
            
            <WhenWhere 
              startsAt = {details.startsAt}
              endsAt = {details.endsAt}
              venue = {details.venue}
            />
            
            {/* Divider */}
            <div className="border-t border-gray-100" />
            
            <EventCreator
             firstName={details.creator.firstName}
             lastName={details.creator.lastName}
            />
          </div>

          {/* Right Column — Sticky Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <EventActions
              publicId={publicId}
              eventId={details.id}
              />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default EventDetailPage;