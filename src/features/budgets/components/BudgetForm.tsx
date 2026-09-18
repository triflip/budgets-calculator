import React, { useEffect, useState } from "react";
import { Checkbox } from "../../../shared/ui/Checkbox1";
import { WebOptions } from "../../webOptions/WebOptions";
import { useNavigate, useLocation } from "react-router-dom";
import { BudgetInputs } from "../components/BudgetInputs";
import { BudgetList } from "../components/BudgetList";
import { CopyUrlButton } from "../../../shared/ui/CopyUrlButton";

export const BudgetForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [seoSelected, setSeoSelected] = useState(false);
  const [adsSelected, setAdsSelected] = useState(false);
  const [webSelected, setWebSelected] = useState(false);
  const [totalBudget, setTotalBudget] = useState(0);

  const [pages, setPages] = useState(0);
  const [languages, setLanguages] = useState(0);

  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  const [annualDiscount, setAnnualDiscount] = useState(false);

  const [budgets, setBudgets] = useState<
    {
      id: number;
      client: string;
      services: string[];
      phone: string;
      email: string;
      total: number;
      date: string;
    }[]
  >([]);

  useEffect(() => {
    let total = 0;
    if (seoSelected) total += 300;
    if (adsSelected) total += 400;
    if (webSelected) total += 500 + (pages + languages) * 30;
    if (annualDiscount) total = total * 0.8;
    setTotalBudget(total);
  }, [seoSelected, adsSelected, webSelected, pages, languages]);

  
  useEffect(() => {
    const params = new URLSearchParams();
    if (seoSelected) params.set("CampaingSeo", "true");
    if (adsSelected) params.set("Ads", "true");
    if (webSelected) params.set("WebPage", "true");
    params.set("pages", pages.toString());
    params.set("lang", languages.toString());
    if (annualDiscount) params.set("discount", "true");

    navigate(`?${params.toString()}`, { replace: true });
  }, [seoSelected, adsSelected, webSelected, pages, languages, annualDiscount]);

  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSeoSelected(params.get("CampaingSeo") === "true");
    setAdsSelected(params.get("Ads") === "true");
    setWebSelected(params.get("WebPage") === "true");
    setPages(Number(params.get("pages")) || 0);
    setLanguages(Number(params.get("lang")) || 0);
    setAnnualDiscount(params.get("discount") === "true");
  }, [location.search]);

  const handleAddBudget = () => {
    if (!clientName || !clientPhone || !clientEmail) {
      alert("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clientEmail)) {
      alert("Invalid email");
      return;
    }

    const phoneRegex = /^[0-9]{9}$/;
    if (!phoneRegex.test(clientPhone)) {
      alert("Invalid phone");
      return;
    }

    const selectedServices: string[] = [];
    if (seoSelected) selectedServices.push("SEO");
    if (adsSelected) selectedServices.push("Ads");
    if (webSelected) selectedServices.push("Web");

    const finalTotal = annualDiscount ? totalBudget * 0.8 : totalBudget;

    setBudgets([
      ...budgets,
      {
        id: Date.now(),
        client: clientName,
        services: selectedServices,
        total: finalTotal,
        phone: clientPhone,
        email: clientEmail,
        date: new Date().toLocaleDateString(),
      },
    ]);

    setClientName("");
    setClientPhone("");
    setClientEmail("");

    setSeoSelected(false);
    setAdsSelected(false);
    setWebSelected(false);

    setPages(0);
    setLanguages(0);
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
    <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-10 rounded-xl shadow-lg bg-gray-900/80 backdrop-blur grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      
   
      <div className="space-y-6 text-base sm:text-lg md:text-xl text-gray-200">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-fuchsia-500 to-pink-500 text-center md:text-left">
          ~ Budget Calculator ~
        </h2>

        <div className="p-3 sm:p-4 tracking-wider bg-gray-800 rounded-md shadow-sm flex justify-between items-center">
          <Checkbox label="SEO Campaign (300€)" checked={seoSelected} onChange={setSeoSelected} />
        </div>

        <div className="p-3 sm:p-4 tracking-wider bg-gray-800 rounded-md shadow-sm flex justify-between items-center">
          <Checkbox label="Advertising Campaign (400€)" checked={adsSelected} onChange={setAdsSelected} />
        </div>

        <div className="p-3 sm:p-4 tracking-wider bg-gray-800 rounded-md shadow-sm">
          <Checkbox label="Website (500€)" checked={webSelected} onChange={setWebSelected} />
          {webSelected && (
            <WebOptions pages={pages} setPages={setPages} languages={languages} setLanguages={setLanguages} />
          )}
        </div>

        <div className="text-xl sm:text-2xl md:text-3xl tracking-wider p-3 sm:p-4 bg-gray-800 rounded-md text-white font-semibold shadow-md text-center md:text-left">
          Total: {annualDiscount ? totalBudget * 0.8 : totalBudget} €
        </div>

        <div className="mt-4 flex justify-center md:justify-start">
          <button
            onClick={() => setAnnualDiscount(!annualDiscount)}
            className={`px-4 py-2 rounded text-white ${
              annualDiscount ? "bg-green-600 hover:bg-green-700" : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            {annualDiscount ? "Annual Discount Applied (-20%)" : "Apply Annual Discount"}
          </button>
        </div>

        <div className="flex justify-center md:justify-start">
          <CopyUrlButton label="Copy URL 🔗" />
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-5 mx-auto md:ml-52 px-6 py-3 rounded-3xl bg-gradient-to-r from-blue-500 to-fuchsia-600 text-white text-base sm:text-lg font-semibold shadow-lg hover:scale-105 transform transition"
        >
          ⬅ Back home
        </button>
      </div>

      <div className="space-y-6 sm:space-y-8 p-3 sm:p-4 bg-gray-800 rounded-md">
        <BudgetInputs
          clientName={clientName}
          setClientName={setClientName}
          clientPhone={clientPhone}
          setClientPhone={setClientPhone}
          clientEmail={clientEmail}
          setClientEmail={setClientEmail}
          onAdd={handleAddBudget}
        />
        <BudgetList budgets={budgets} />
      </div>
    </div>
  </div>
);

};
