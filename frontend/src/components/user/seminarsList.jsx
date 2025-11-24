import { useGetSeminarsLimit, useGetSeminarsJoined } from "../../hooks/useSeminars";
import { useJoinSeminar } from "../../hooks/useSeminarsJoined.js";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import moment from "moment";
import { useContext, useMemo } from "react";
import { AuthContext } from "../../context/authContext.jsx";

const MySwal = withReactContent(Swal);

export default function SeminarsList({ primary_color, primary_dark }) {
    const { currentUser, isAuthChecked } = useContext(AuthContext);
    const CalendarIcon = (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
    );

    const isUser = currentUser && currentUser.role === 'users';
    const isAdmin = currentUser && currentUser.role === 'admins';

    const { 
        data: limitData = [], 
        isLoading: isLoadingLimit, 
        error: errorLimit 
    } = useGetSeminarsLimit(
        3, 
        { enabled: isAuthChecked && (!currentUser || isAdmin) }
    );

    const { 
        data: joinedData = [],
        isLoading: isLoadingJoined, 
        error: errorJoined 
    } = useGetSeminarsJoined(
        currentUser?.id, 
        isUser,
        { enabled: isAuthChecked && isUser } 
    );

    const {
        mutate: joinSeminarMutate,
        isLoading: joinSeminarLoading,
        isError: joinSeminarError,
        isSuccess: joinSeminarSuccess,
        error: joinSeminarErrorObject
    } = useJoinSeminar();
    
    console.log('dumbass role: ', currentUser);

    const { data, isLoading, error } = useMemo(() => {
        // These variables will only re-calculate when isUser, joinedData, or limitData changes.
        const finalData = isUser ? joinedData : limitData;
        const finalIsLoading = isUser ? isLoadingJoined : isLoadingLimit;
        const finalError = isUser ? errorJoined : errorLimit;
        
        // Log the FINAL decision to be 100% sure what the component is using
        console.log(`Final Data Source Used: ${isUser ? 'JOINED' : 'LIMITED'}`);

        return {
            data: finalData,
            isLoading: finalIsLoading,
            error: finalError,
        };
    }, [isUser, joinedData, limitData, isLoadingJoined, isLoadingLimit, errorJoined, errorLimit]);

    console.log(data);

    const handleJoinSeminar = (id) => {
        joinSeminarMutate(
            { id },
            {
                onSuccess: async () => {
                    await MySwal.fire({
                        title: "Success!",
                        text: "Successfully joined a seminar.",
                        icon: "success",
                    });

                },
                onError: (error) => {
                    MySwal.fire({
                        title: "Oops!",
                        text: error.response?.data?.message || "Something went wrong.",
                        icon: "error",
                    });

                console.log(error);
                },
            }
        );
    }

    if (!isAuthChecked) return <div>Checking authentication...</div>;
    if (isLoading) return <div>Loading data...</div>
    if (error) return <div>Error: {error.message}</div>;
    // if (!data || !Array.isArray(data)) return <div className="text-center mx-auto">No seminars available.</div>;
    if (data.length === 0) return <div className="text-center mx-auto">No seminars available.</div>;

    return (
        <div id="seminars" className={`py-24 bg-${ primary_color }/5`}>
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-16">
                    Full Seminar Schedule
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {data.map((seminar) => (
                        <div 
                            key={seminar.id} 
                            className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-300 transform hover:scale-[1.02] border border-gray-100 flex flex-col"
                        >
                            {/* Image */}
                            <div className="h-48 overflow-hidden">
                                <img 
                                    src={seminar.img} 
                                    alt={seminar.title} 
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                />
                            </div>
                            
                            <div className="p-6 flex-grow flex flex-col"> 
                                {/* Category Tag */}
                                <div>
                                    <span className={`inline-flex text-xs font-semibold uppercase tracking-wider text-white bg-${primary_color} px-3 py-1 rounded-full mb-3`}>
                                        {seminar.category}
                                    </span>
                                </div>
                                
                                {/* Title */}
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {seminar.title}
                                </h3>
                                
                                {/* Description */}
                                <p className="text-gray-600 text-sm mb-4 grow"> 
                                    {seminar.description}
                                </p>

                                <div className="flex items-center text-sm text-gray-500 font-medium mb-6">
                                    <CalendarIcon className={`w-4 h-4 text-${ primary_dark } mr-2`} />
                                    <span>Starts: {moment(seminar.start_at).format('MMMM Do YYYY')}</span>
                                </div>

                                {
                                    currentUser && seminar.is_registered ? 
                                    (
                                        <button 
                                            disabled
                                            id={seminar.id}
                                            key={seminar.id}
                                            className={`w-full py-3 px-4 text-white font-semibold rounded-lg transition duration-300 
                                                    bg-gray-300
                                                    focus:outline-none focus:ring-4 focus:ring-gray-200/50`}
                                        
                                        >
                                            Already joined
                                        </button>
                                    ) :
                                    (
                                        <button 
                                            id={seminar.id}
                                            key={seminar.id}
                                            onClick={() => handleJoinSeminar(seminar.id)}
                                            className={`w-full py-3 px-4 text-white font-semibold rounded-lg transition duration-300 
                                                    bg-${primary_color} hover:bg-blue-600 
                                                    focus:outline-none focus:ring-4 focus:ring-${primary_color}/50 cursor-pointer`}
                                        >
                                            Join Seminar
                                        </button>
                                    )
                                }
                                

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}