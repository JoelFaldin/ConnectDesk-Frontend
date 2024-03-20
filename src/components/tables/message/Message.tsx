import { BiErrorCircle } from "react-icons/bi";

// Rendering a warning depending if the search had results or not (generalTable.tsx, 604):
export const Message = () => {
    return (
        <div className="flex flex-col bg-amber-100 w-fit py-4 px-4 rounded-lg items-center border-2 border-orange-300 my-4">
            <div className="flex gap-2 font-bold">
                <BiErrorCircle size={24} />
                <h1>No data was found!</h1>
            </div>
            <div className="mt-2 text-left">
                <p className="">Try searching someting else...</p>
            </div>
        </div>
    )
}