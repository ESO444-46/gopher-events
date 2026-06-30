import axios from "axios";
import { useState } from "react";

const InputButton = ({setEvents}) => {
    const [input, setInput] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async (event) => {
        event.preventDefault();
        
        setIsSearching(true)
        
        try{
            const result = await axios.get("http://localhost:3000/events",{
                params:{
                    search:input
                }
            })
            console.log(result)
            setEvents(result.data.events)
        }catch(error){  
            console.log("Error fetching results")

        } finally{        
            setIsSearching(false)
        }

        
    };

    return (
        <div className="bg-slate-50/80 border-b border-slate-100 shadow-sm">
            <div className="max-w-6xl mx-auto px-6 py-10 text-center">
            
                <h1 className="text-3xl font-bold text-gray-900">Explore Events</h1>
                <p className="mt-2 text-gray-500 text-sm">Discover what's happening on campus</p>
                
                <div className="mt-6 relative max-w-md mx-auto">
                    <form onSubmit={handleSearch}>
                        
                        <input
                            type="text"
                            value={input}
                            disabled = {isSearching}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Search events..."
                            className="block w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7a0019]/20 focus:border-[#7a0019] transition-all sm:text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        
                        {/* Right icon / submit button */}
                        <button 
                            type="submit"
                            disabled = {isSearching}
                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center cursor-pointer disabled:cursor-not-allowed"
                        >
                            {isSearching ? (
                                <svg className="animate-spin h-5 w-5 text-[#7a0019]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <svg className="h-5 w-5 text-gray-400 hover:text-[#7a0019] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            )}
                        </button>
                    
                    </form> 
                </div>

            </div>
        </div>
    )
}

export default InputButton;