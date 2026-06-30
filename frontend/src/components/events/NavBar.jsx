const NavBar = ()=>{
    return (
    <>
        <header className="border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-[#7a0019] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
                </div>
                <span className="font-bold text-gray-900">Gopher Events</span>
            </div>
            
            <div className="h-8 w-8 rounded-full bg-gray-200" />
            </div>
        </header>
    </>
    )
}


export default NavBar