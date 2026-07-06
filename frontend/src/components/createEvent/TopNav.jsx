import { Link } from "react-router-dom";

const TopNav = () => {
    return(

        <>
        <header className="bg-white border-b border-gray-100">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-[#7a0019] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <span className="font-bold text-gray-900">Gopher Events</span>
              </div>
            </div>
        </header>
        </>


    )
}


export default TopNav