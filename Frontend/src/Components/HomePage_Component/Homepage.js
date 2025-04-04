import React, { useState } from "react";
import Header1 from "../Header_Component/Header1";
import ViewAlias from "../Signup_Component/ViewAlias";
import Description1 from "./Description1";
import CredPage from "../Signup_Component/CredPage";

function HomePage({ cred, setcred, setcontents, setview }) {
    const [admindtls] = useState({
        title: "Admin",
        desc: "Only for Admin",
        button: "Manage",
    });

    const [userdtls] = useState({
        title: "User",
        desc: "Start With Town Turf",
        button: "Book",
    });

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Header */}
            <Header1 cred={cred} />

            {/* Description Section */}
            <section className="flex flex-col items-center justify-center py-10">
                <Description1 />
            </section>

            {/* Admin & User Sections */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 md:px-20 ">
                <ViewAlias dtls={admindtls} setcred={setcred} />
                <ViewAlias dtls={userdtls} setcred={setcred} />
            </section>

            {/* Credential Page */}
            <section className="flex justify-center py-8">
                <CredPage
                    cred={cred}
                    setcred={setcred}
                    setcontents={setcontents}
                    setview={setview}
                />
            </section>

            {/* Footer Spacer */}
            <div className="h-20" />
        </div>
    );
}

export default HomePage;
