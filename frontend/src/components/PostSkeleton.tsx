
export const PostSkeleton = () => {
    return <div role="status" className="animate-pulse">
        <div className="grid grid-cols-6 px-20 w-full max-w-screen-xl py-10 gap-14">
            <div className="col-span-4">
                <div className="h-12 bg-gray-200 rounded-full mb-10"></div>
                <div className="h-5 bg-gray-200 rounded-full my-2"></div>
                <div className="h-5 bg-gray-200 rounded-full my-2"></div>
                <div className="h-5 bg-gray-200 rounded-full my-2"></div>
                <div className="h-5 bg-gray-200 rounded-full my-2"></div>

            </div>
            <div className="col-span-2">
                <div className="text-xl font-semibold pt-2 ">
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                </div>
                <div className="text-md font-thin">
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                </div>
                <div className="text-slate-500 text-sm font-thin pt-4">
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                </div>
            </div>
        </div>
        <span className="sr-only">Loading...</span>
    </div>
}