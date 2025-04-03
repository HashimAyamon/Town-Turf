import React from 'react'
import {useState } from "react";
import Alert from '../Alert_Component/Alert';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../Url';


function CredPage(props) {
    const [alertmsg,setalertmsg]=useState();
    const [alertshow,setalertshow]=useState(false);
    const [type,settype]=useState();
    
    let reglogchange=async (obj)=>
    {
        if(obj!==props.cred.logintype)
        {
            await props.setcred({
                type:props.cred.type,
                userid:"",
                password:"",
                logintype:obj,
                tokenid:""
            });
        } 
    }

    let passwordchange = async(event) => {
        await props.setcred(previousState => {
            return { ...previousState,password:event.target.value}
        });
    };

    let useridchange = async(event) => {
        await props.setcred(previousState => {
            return { ...previousState,userid:event.target.value}
        });
    };

    let successalert = async (msg) => {
        setalertshow(true);
        setalertmsg(msg);
        settype("success");
        setTimeout(() => {
            setalertshow(false);
        }, 2000);
    }

    let erroralert = (msg) => {
        setalertshow(true);
        setalertmsg(msg);
        settype("error");
        setTimeout(() => {
            setalertshow(false);
        }, 2000);
    }

    let register = () => {
        if(props.cred.userid===null || props.cred.userid==="" || props.cred.password===null || props.cred.password==="")
        {
            erroralert("Please Enter Full Details");
            return;
        }
        setalertshow(false);
        var url;
        if(props.cred.type==="Admin")
        {
            url=BASE_URL+"/adminlogin/register";
        }
        else
        {
            url=BASE_URL+"/userlogin/register";
        }
        fetch(url,{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "credentials":{"userid":props.cred.userid,
                            "password":props.cred.password}
            })})
         .then((res) => res.json())
         .then((data) => {    
            if(data.Status==="Success")
            {
                successalert(data.Message);
            }
            else
            {
                erroralert(data.Message);
            }
         })
         .catch((err) => {
            erroralert("Error in processing the data");
         });
    };


    let login = async () => {
        if(props.cred.userid===null || props.cred.userid==="" || props.cred.password===null || props.cred.password==="")
        {
            erroralert("Please Enter Full Details");
            return;
        }
        setalertshow(false);
        var url;
        if(props.cred.type==="Admin")
        {
            url=BASE_URL+"/adminlogin/login";
        }
        else
        {
            url=BASE_URL+"/userlogin/login";
        }
        try
        {
            const response=await fetch(url,{
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    "credentials":{"userid":props.cred.userid,
                                "password":props.cred.password}
            })});
            const data = await response.json();
            if(data.Status==="Success")
            {
                successalert(data.Message);
                document.getElementById("clickbutton").click();
                if(props.cred.type==="Admin")
                {
                    await props.setcred(previousState => {
                        return {...previousState,password:"",tokenid:data.tokenid}
                    });
                    await props.setcontents(["INFORMATION","SCHEDULE","HISTORY"]);
                    await props.setview("Homepage"); 
                    document.getElementById("adminscreen").click();
                }
                else
                {
                    await props.setcred(previousState => {
                        return {...previousState,password:"",tokenid:data.tokenid}
                    });
                    await props.setcontents(["PROFILE","BOOK SLOT","USER HISTORY"]);
                    await props.setview("Homepage");
                    document.getElementById("userscreen").click();
                }
            }
            else
            {
                erroralert(data.Message);
            }
        }
        catch(err)
        {
            erroralert("Error in processing the data");
        }
    };

    return (
        <>
            {/* Hidden Navigation Buttons */}
            <Link to="/admin">
                <button id="adminscreen" className="d-none">Cred</button>
            </Link>
            <Link to="/user">
                <button id="userscreen" className="d-none">Cred</button>
            </Link>
            <button
                id="clickbutton"
                className="d-none"
                data-toggle="modal"
                data-target="#myModal"
            >
                Cred
            </button>

            {/* Bootstrap Modal */}
            <div id="myModal" className="modal fade" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content shadow-lg rounded-3">
                        
                        {/* Modal Header */}
                        <div className="modal-header bg-info text-white">
                            <h4 className="modal-title w-100 text-center fw-bold">{props.cred.type}</h4>
                            <button type="button" className="btn-close" data-dismiss="modal"></button>
                        </div>

                        {/* Modal Body */}
                        <div className="modal-body text-center p-4">
                            {alertshow && <Alert alertmsg={alertmsg} type={type} />}

                            {/* Register & Login Buttons */}
                            <div className="d-flex justify-content-center gap-3 mb-4">
                                <button
                                    className="btn btn-outline-primary fw-bold px-4"
                                    onClick={() => reglogchange("Register")}
                                >
                                    Register
                                </button>
                                <button
                                    className="btn btn-outline-success fw-bold px-4"
                                    onClick={() => reglogchange("Login")}
                                >
                                    Login
                                </button>
                            </div>

                            {/* User ID Field */}
                            <div className="mb-3">
                                <label className="fw-semibold">User ID</label>
                                <input
                                    type="text"
                                    className="form-control shadow-sm"
                                    value={props.cred.userid}
                                    onChange={useridchange}
                                    placeholder="Enter User ID"
                                />
                            </div>

                            {/* Password Field */}
                            <div className="mb-3">
                                <label className="fw-semibold">Password</label>
                                <input
                                    type="password"
                                    className="form-control shadow-sm"
                                    value={props.cred.password}
                                    onChange={passwordchange}
                                    placeholder="Enter Password"
                                />
                            </div>

                            {/* Register & Login Action Buttons */}
                            {props.cred.logintype === "Register" && (
                                <button className="btn btn-primary w-100 fw-bold" onClick={register}>
                                    Register
                                </button>
                            )}
                            {props.cred.logintype === "Login" && (
                                <button className="btn btn-success w-100 fw-bold" onClick={login}>
                                    Login
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default CredPage;