import React, { useContext, useEffect, useState } from "react";
import { setUpCookie } from '../../Utils/Cookie';
import { TOKEN } from '../../Utils/Constant';
import { getContact } from "../../Networking/ContactApiAction";
import { contactUsState } from "../../Context/GetContactContext";
import Loader from '../../Components/Loader';

const VoicesOfEloiacs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const getContext = useContext(contactUsState);

  useEffect(() => {
    setIsLoading(true);
    getContact()
      .then((res) => {
        if (res.data.code === 200) {
          if (res.data.accessToken) setUpCookie(TOKEN, res.data.accessToken);
          getContext.getContact(res.data.data);
          setIsLoading(false);
        } else {
          setErr(res.data.message);
          setIsLoading(false);
        }
      })
      .catch(() => {
        setIsLoading(false);
        setErr("Error fetching contact us data");
      });
  }, []);

  const filteredContacts = getContext.contactData
    .filter((voice) =>
      voice.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="px-10 py-2">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">CONTACT</h1>
          </div>

          <div className="py-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-60 p-2 border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="h-[600px] no-scrollbar overflow-auto">
            <div className="mt-4">
              <div className="flex bg-orange-500 text-white sticky top-0 font-bold p-2">
                <div className="w-1/4">NAME</div>
                <div className="w-1/4">EMAIL</div>
                <div className="w-1/4">MOBILE NUM</div>
                <div className="w-1/4">DESCRIPTION</div>
                <div className="w-1/6">CREATED AT</div>
              </div>

              {filteredContacts.map((voice) => (
                <div key={voice.id}>
                  <div className="flex items-center p-2 border-b border-gray-300">
                    <div className="w-1/4">
                      <a href="#" className="text-blue-500 hover:underline">
                        {voice.name}
                      </a>
                    </div>
                    <div className="w-1/4">{voice.email}</div>
                    <div className="w-1/4">{voice.mobileNumber}</div>
                    <div className="w-1/4">{voice.description}</div>
                    <div className="w-1/6">{voice.createdAt}</div>
                  </div>
                </div>
              ))}
            </div>
            {err && <p className="text-red-500 mt-4">{err}</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default VoicesOfEloiacs;
