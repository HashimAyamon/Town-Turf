import React from 'react'
import { BASE_URL } from '../../../Url';

class BookSlotsTable extends React.Component {
    constructor(props) {
        super(props);
        this.alertboxcontentfunc=this.alertboxcontentfunc.bind(this);
        this.confirmbooking=this.confirmbooking.bind(this);
        this.state={
        };   
    }

    alertboxcontentfunc(title,body){
        this.props.setalertboxcontent({
            title:title,
            body:body
        });
    }

    async confirmbooking()
    {
        var seltimings=[];
        for(var i=0;i<this.props.tabledtls.length;i++)
        {
            seltimings.push(this.props.tabledtls[i].time);
        }
        var bookingdtls={
            turfid: this.props.tableturfid,
            schdate: this.props.tableschdate,
            selectedtiming:seltimings
        };
        fetch(BASE_URL+'/bookturf/savebooking',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                tokenid:this.props.cred.tokenid,
                bookingdtls:bookingdtls
            })})
         .then((res) => res.json())
         .then( async (data) => {
            if(data.Status==="Success")
            {
                this.alertboxcontentfunc("User - SLOT BOOKING",data.Message);
                document.getElementById("alertboxhit").click();
                await this.props.fetchturfs();
            }
            else
            {
                this.alertboxcontentfunc("User - SLOT BOOKING",data.Message);
                document.getElementById("alertboxhit").click();
            }
         })
         .catch((err) => {
            this.alertboxcontentfunc("User - SLOT BOOKING","Error in processing the data");
            document.getElementById("alertboxhit").click();
         });
    }

    render() {
        return (
            <>
                {/* Hidden Button to Trigger Modal */}
                <button
                    id="slottable"
                    className="d-none"
                    data-toggle="modal"
                    data-target="#myModalST"
                >
                    BookSlot
                </button>
    
                {/* Bootstrap Modal */}
                <div id="myModalST" className="modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content shadow-lg rounded-3">
    
                            {/* Modal Header */}
                            <div className="modal-header bg-info text-white">
                                <h4 className="modal-title w-100 text-center fw-bold">
                                    Confirm Slot Booking
                                </h4>
                                <button type="button" className="btn-close" data-dismiss="modal"></button>
                            </div>
    
                            {/* Modal Body */}
                            <div className="modal-body">
                                <table className="table table-bordered text-center">
                                    <thead className="bg-light">
                                        <tr>
                                            <th className="fw-bold">Time</th>
                                            <th className="fw-bold">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.tabledtls.map((obj, i) => (
                                            <tr key={i}>
                                                <td>{obj.time}</td>
                                                <td>{obj.price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
    
                            {/* Modal Footer */}
                            <div className="modal-footer d-flex justify-content-between">
                                <button 
                                    type="button" 
                                    className="btn btn-success fw-bold px-4"
                                    data-dismiss="modal"
                                    onClick={props.confirmbooking}
                                >
                                    Submit
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-secondary fw-bold px-4"
                                    data-dismiss="modal"
                                >
                                    Close
                                </button>
                            </div>
    
                        </div>
                    </div>
                </div>
            </>
        ); 
    }
  }

export default BookSlotsTable;