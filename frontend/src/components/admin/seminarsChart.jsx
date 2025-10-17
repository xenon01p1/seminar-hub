import Chart from "../chart";
import { useGetTotalSeminars } from "../../hooks/useSeminars";
import moment from "moment";

export default function SeminarsChart() {
    const {
        isLoading, 
        error,       
        data: dataTotalSeminars
    } = useGetTotalSeminars();

    // 1. Handle Loading State
    if (isLoading) {
        return (<div>Loading recent seminars chart...</div>);
    } 

    // 2. Handle Error State
    if (error) {
        return (<div>Error: { error.message }</div>);
    }

    // Add a final check just in case, though the above checks should suffice
    if (!dataTotalSeminars || !Array.isArray(dataTotalSeminars)) {
        return (<div>No seminar data available.</div>);
    }
    
    const labels = dataTotalSeminars.map( (data) => moment(data.month).format("MMMM YYYY") );
    console.log(labels);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' ,
            },
            title: {
                display: true,
                text: 'Total Seminars Past Months',
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
            label: 'Seminars Each Month',
            data: dataTotalSeminars.map( (data) => data.total_seminars ),
            borderColor: 'rgba(115, 185, 243, 1)',
            backgroundColor: 'rgba(115, 185, 243, 1)',
            },
        ],
    };
    
    return (
        <div style={{ margin: '0 auto' }}> 
            <Chart 
                chartType="Bar"
                options={options}
                data={data}
            />
        </div>
    );
}