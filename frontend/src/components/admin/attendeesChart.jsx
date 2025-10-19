import Chart from "../chart";
import { useGetTotalAttendees } from "../../hooks/useAttendees";
import moment from "moment";

export default function AttendeesChart() {
    const {
        isLoading, 
        error,       
        data: dataTotalAttendees
    } = useGetTotalAttendees();

    // 1. Handle Loading State
    if (isLoading) {
        return (<div>Loading total attendees chart...</div>);
    } 

    // 2. Handle Error State
    if (error) {
        return (<div>Error: { error.message }</div>);
    }

    // Add a final check just in case, though the above checks should suffice
    if (!dataTotalAttendees || !Array.isArray(dataTotalAttendees)) {
        return (<div>No attendees data available.</div>);
    }
    
    const labels = dataTotalAttendees.map( (data) => moment(data.month).format("MMMM YYYY") );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' ,
            },
            title: {
                display: true,
                text: 'Total Attendees Past Months',
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
            label: 'Attendees Each Month',
            data: dataTotalAttendees.map( (data) => data.total_attendees ),
            borderColor: 'rgba(115, 185, 243, 1)',
            backgroundColor: 'rgba(115, 185, 243, 1)',
            },
        ],
    };
    
    return (
        <div style={{ maxWidth: '800px', height: '500px', margin: '0 auto' }}> 
            <Chart 
                chartType="Line"
                options={options}
                data={data}
            />
        </div>
    );
}