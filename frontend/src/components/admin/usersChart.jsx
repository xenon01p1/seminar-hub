import Chart from "../chart";
import { useGetTotalUsers } from "../../hooks/useUsers";
import moment from "moment";

export default function UsersChart() {
    const {
        isLoading, 
        error,       
        data: dataTotalUser
    } = useGetTotalUsers();

    // 1. Handle Loading State
    if (isLoading) {
        return (<div>Loading recent user chart...</div>);
    } 

    // 2. Handle Error State
    if (error) {
        return (<div>Error: { error.message }</div>);
    }

    // Add a final check just in case, though the above checks should suffice
    if (!dataTotalUser || !Array.isArray(dataTotalUser)) {
        return (<div>No user data available.</div>);
    }
    
    const labels = dataTotalUser.map( (data) => moment(data.month).format("MMMM YYYY") );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' ,
            },
            title: {
                display: true,
                text: 'New Users Past Months',
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
            label: 'Total Users Each Month',
            data: dataTotalUser.map( (data) => data.total_users ),
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