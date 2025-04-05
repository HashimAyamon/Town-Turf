import React from "react";

class UserHistoryDtls extends React.Component {
    render() {
        return (
            <div className="infodtls container mt-4">
                <div className="text-center mb-4">
                    <h3 className="fw-bold text-primary">User History</h3>
                </div>
                
                <div className="table-responsive">
                    <table className="table table-bordered text-center shadow-sm">
                        <thead className="bg-light">
                            <tr className="text-dark">
                                <th>Turf Name</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>  
                        <tbody>
                            {this.props.userhistorydtls.map((obj, i) => (
                                <tr key={i} className="bg-white">
                                    <td>{obj.turfname}</td>
                                    <td>{obj.schdate}</td>
                                    <td>{obj.time}</td>
                                    <td>{obj.price}</td>
                                    <td>
                                        <span className={`badge ${obj.status === "Confirmed" ? "bg-success" : "bg-danger"}`}>
                                            {obj.status}
                                        </span>
                                    </td>
                                </tr>
                            ))} 
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default UserHistoryDtls;
