import React, { useState } from "react";
import Header1 from "../Header_Component/Header1";
import ViewAlias from "../Signup_Component/ViewAlias";
import Description1 from "./Description1";
import CredPage from "../Signup_Component/CredPage";

function HomePage(props) {
    const [admindtls] = useState({
        title: "Admin",
        desc: "Manage turf at admin level",
        button: "Manage",
    });

    const [userdtls] = useState({
        title: "User",
        desc: "Manage turf at user level",
        button: "Book",
    });

    return (
        <>
            <div className="bg-gray-100 min-h-screen">
                {/* Header */}
                <Header1 cred={props.cred} />

                {/* Description Section */}
                <div className="flex flex-col items-center justify-center py-10">
                    <Description1 />
                </div>

                {/* Admin & User Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 md:px-20">
                    <ViewAlias dtls={admindtls} setcred={props.setcred} />
                    <ViewAlias dtls={userdtls} setcred={props.setcred} />
                </div>

                {/* Credential Page */}
                <div className="flex justify-center py-8">
                    <CredPage
                        cred={props.cred}
                        setcred={props.setcred}
                        setcontents={props.setcontents}
                        setview={props.setview}
                    />
                </div>

                {/* Spacing for Footer */}
                <div className="h-10"></div>
            </div>
        </>
    );
}

export default HomePage;
