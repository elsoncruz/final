import { createContext, useState } from "react";

const contactUsState = createContext();

const ContactUsProvider = (props) => {
    const [contactData, setContactData] = useState([]);

    const getContact = (data) => {
        setContactData(data);
    };

    return (
        <contactUsState.Provider value={{ contactData, getContact }}>
            {props.children}
        </contactUsState.Provider>
    );
};

export { contactUsState, ContactUsProvider };
