import { createContext, useState } from "react";

const VoicesState = createContext();

const VoicesContext = (props) => {

    const [voicesList, setVoicesList] = useState([]);

    const updateVoices = (update) => {
        setVoicesList(update);
    };

    return <VoicesState.Provider value={{ voicesList, updateVoices }}>
        {props.children}
    </VoicesState.Provider>
};

export  { VoicesState, VoicesContext };