"use client";

import { useEffect, useRef } from "react";

type BookingTab = "flight" | "hotel" | "holiday" | "visa";

/**
 * The four booking tabs (Flight / Hotel / Holiday / Visa) recovered from
 * the homepage hero widget in the original static export. The four
 * standalone /book/* routes in the original build were client-only
 * components (their static export only shipped a "Loading..." placeholder,
 * so their exact markup could not be recovered) -- this shared widget is
 * reused there too, pre-selecting the relevant tab via the `initialTab` prop.
 */
export default function BookingWidget({
  initialTab = "flight",
}: {
  initialTab?: BookingTab;
}) {
  const widgetRef = useRef<HTMLDivElement>(null);

  const selectTab = (tab: BookingTab) => {
    const root = widgetRef.current;
    if (!root) return;
    root.querySelectorAll<HTMLButtonElement>(".tab-btn").forEach((btn) => {
      const isActive = btn.dataset.panel === `panel-${tab}`;
      btn.classList.toggle("active", isActive);
    });
    root.querySelectorAll<HTMLDivElement>(".tab-panel").forEach((panel) => {
      panel.style.display = panel.id === `panel-${tab}` ? "block" : "none";
    });
  };

  useEffect(() => {
    const root = widgetRef.current;
    if (!root) return;

    const handleClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest<HTMLButtonElement>(".tab-btn");
      if (!btn || !btn.dataset.panel) return;
      const tab = btn.dataset.panel.replace("panel-", "") as BookingTab;
      selectTab(tab);
    };

    root.addEventListener("click", handleClick);
    if (initialTab !== "flight") selectTab(initialTab);

    return () => root.removeEventListener("click", handleClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTab]);

  return (
      <div className="booking-widget glass-panel hero-widget-entrance" ref={widgetRef}>
        <div className="booking-tabs">
          <button className="tab-btn active" data-panel="panel-flight" id="tab-btn-flight" type="button">
            <i className="fa-solid fa-plane"></i>
            Flight
          </button>
          <button className="tab-btn" data-panel="panel-hotel" id="tab-btn-hotel" type="button">
            <i className="fa-solid fa-hotel"></i>
            Hotel Reservation
          </button>
          <button className="tab-btn" data-panel="panel-holiday" id="tab-btn-holiday" type="button">
            <i className="fa-solid fa-umbrella-beach"></i>
            Holiday Package
          </button>
          <button className="tab-btn" data-panel="panel-visa" id="tab-btn-visa" type="button">
            <i className="fa-solid fa-passport"></i>
            Visa Support
          </button>
        </div>
        <div className="tab-panel" id="panel-flight" style={{ display: 'block' }}>
          <form action="/book/flight.html" className="booking-form" id="form-flight">
            <div className="input-group">
              <label htmlFor="from-input">
                From
              </label>
              <div style={{ position: 'relative' }}>
                <style>{`
select option, select optgroup { background-color: #0d1522; color: #ffffff; padding: 6px 10px; }
select optgroup { font-weight: 700; color: #ff5263; background-color: #070c14; }
`}</style>
                <select className="input-field" id="from-input" style={{ appearance: 'none', WebkitAppearance: 'none' }}>
                  <option value="">
                    Select departure
                  </option>
                  <optgroup label="Popular & International Hubs">
                    <option value="DSS">
                      Dakar (DSS) - Senegal
                    </option>
                    <option value="LFW">
                      Lomé (LFW) - Togo
                    </option>
                    <option value="DLA">
                      Douala (DLA) - Cameroon
                    </option>
                    <option value="HRE">
                      Harare (HRE) - Zimbabwe
                    </option>
                    <option value="ADD">
                      Addis Ababa (ADD) - Ethiopia
                    </option>
                    <option value="NBO">
                      Nairobi (NBO) - Kenya
                    </option>
                    <option value="JNB">
                      Johannesburg (JNB) - South Africa
                    </option>
                    <option value="CPT">
                      Cape Town (CPT) - South Africa
                    </option>
                    <option value="CAI">
                      Cairo (CAI) - Egypt
                    </option>
                    <option value="CMN">
                      Casablanca (CMN) - Morocco
                    </option>
                  </optgroup>
                  <optgroup label="West Africa">
                    <option value="COO">
                      Cotonou - Cadjehoun (COO) - Benin
                    </option>
                    <option value="PKO">
                      Parakou Airport - Benin
                    </option>
                    <option value="OUA">
                      Ouagadougou (OUA) - Burkina Faso
                    </option>
                    <option value="BOY">
                      Bobo Dioulasso Airport - Burkina Faso
                    </option>
                    <option value="SID">
                      Sal - Amílcar Cabral Int'l (SID) - Cabo Verde
                    </option>
                    <option value="RAI">
                      Praia - Nelson Mandela Int'l (RAI) - Cabo Verde
                    </option>
                    <option value="ABJ">
                      Abidjan - Félix Houphouët Boigny (ABJ) - Côte d'Ivoire
                    </option>
                    <option value="ASK">
                      Yamoussoukro Airport - Côte d'Ivoire
                    </option>
                    <option value="BYK">
                      Bouaké Airport - Côte d'Ivoire
                    </option>
                    <option value="SPY">
                      San Pédro Airport - Côte d'Ivoire
                    </option>
                    <option value="BJL">
                      Banjul Int'l (BJL) - Gambia
                    </option>
                    <option value="ACC">
                      Accra - Kotoka Int'l (ACC) - Ghana
                    </option>
                    <option value="KMS">
                      Kumasi Airport - Ghana
                    </option>
                    <option value="TML">
                      Tamale Airport - Ghana
                    </option>
                    <option value="TKD">
                      Takoradi Airport - Ghana
                    </option>
                    <option value="CKY">
                      Conakry - Ahmed Sékou Touré (CKY) - Guinea
                    </option>
                    <option value="KNN">
                      Kankan Airport - Guinea
                    </option>
                    <option value="NZE">
                      N'Zérékoré Airport - Guinea
                    </option>
                    <option value="OXB">
                      Bissau - Osvaldo Vieira Int'l (OXB) - Guinea-Bissau
                    </option>
                    <option value="ROB">
                      Monrovia - Roberts Int'l (ROB) - Liberia
                    </option>
                    <option value="MLW">
                      Monrovia - Spriggs Payne Airport - Liberia
                    </option>
                    <option value="BKO">
                      Bamako - Modibo Keita Int'l (BKO) - Mali
                    </option>
                    <option value="MOPT">
                      Mopti Airport - Mali
                    </option>
                    <option value="TMB">
                      Timbuktu Airport - Mali
                    </option>
                    <option value="GAQ">
                      Gao Airport - Mali
                    </option>
                    <option value="NKC">
                      Nouakchott Oumtounsy (NKC) - Mauritania
                    </option>
                    <option value="NDB">
                      Nouadhibou Airport - Mauritania
                    </option>
                    <option value="NIM">
                      Niamey - Diori Hamani Int'l (NIM) - Niger
                    </option>
                    <option value="AJY">
                      Agadez Airport - Niger
                    </option>
                    <option value="ZND">
                      Zinder Airport - Niger
                    </option>
                    <option value="LOS">
                      Lagos - Murtala Muhammed (LOS) - Nigeria
                    </option>
                    <option value="ABV">
                      Abuja - Nnamdi Azikiwe (ABV) - Nigeria
                    </option>
                    <option value="PHC">
                      Port Harcourt Int'l (PHC) - Nigeria
                    </option>
                    <option value="KAN">
                      Kano - Mallam Aminu Kano (KAN) - Nigeria
                    </option>
                    <option value="ENU">
                      Enugu - Akanu Ibiam (ENU) - Nigeria
                    </option>
                    <option value="KAD">
                      Kaduna Airport (KAD) - Nigeria
                    </option>
                    <option value="ILR">
                      Ilorin Airport (ILR) - Nigeria
                    </option>
                    <option value="QRW">
                      Warri Airport (QRW) - Nigeria
                    </option>
                    <option value="BNI">
                      Benin City Airport (BNI) - Nigeria
                    </option>
                    <option value="CBQ">
                      Calabar Airport (CBQ) - Nigeria
                    </option>
                    <option value="QOW">
                      Owerri Airport (QOW) - Nigeria
                    </option>
                    <option value="DSS">
                      Dakar - Blaise Diagne Int'l (DSS) - Senegal
                    </option>
                    <option value="CSK">
                      Cap Skirring Airport - Senegal
                    </option>
                    <option value="XLS">
                      Saint-Louis Airport - Senegal
                    </option>
                    <option value="FNA">
                      Freetown Int'l / Lungi (FNA) - Sierra Leone
                    </option>
                    <option value="LFW">
                      Lomé Tokoin (LFW) - Togo
                    </option>
                  </optgroup>
                  <optgroup label="East Africa">
                    <option value="BJM">
                      Bujumbura - Melchior Ndadaye Int'l (BJM) - Burundi
                    </option>
                    <option value="HAH">
                      Moroni - Prince Said Ibrahim Int'l (HAH) - Comoros
                    </option>
                    <option value="NWA">
                      Mohéli Airport - Comoros
                    </option>
                    <option value="AJN">
                      Anjouan Airport - Comoros
                    </option>
                    <option value="JIB">
                      Djibouti Ambouli Int'l (JIB) - Djibouti
                    </option>
                    <option value="ASM">
                      Asmara Int'l (ASM) - Eritrea
                    </option>
                    <option value="MSW">
                      Massawa Airport - Eritrea
                    </option>
                    <option value="ADD">
                      Addis Ababa Bole Int'l (ADD) - Ethiopia
                    </option>
                    <option value="DIR">
                      Dire Dawa Airport - Ethiopia
                    </option>
                    <option value="BJR">
                      Bahir Dar Airport - Ethiopia
                    </option>
                    <option value="GDQ">
                      Gondar Airport - Ethiopia
                    </option>
                    <option value="MQX">
                      Mekelle Airport - Ethiopia
                    </option>
                    <option value="LLI">
                      Lalibela Airport - Ethiopia
                    </option>
                    <option value="NBO">
                      Nairobi - Jomo Kenyatta Int'l (NBO) - Kenya
                    </option>
                    <option value="WIL">
                      Nairobi - Wilson Airport (WIL) - Kenya
                    </option>
                    <option value="MBA">
                      Mombasa - Moi Int'l (MBA) - Kenya
                    </option>
                    <option value="EDL">
                      Eldoret Airport (EDL) - Kenya
                    </option>
                    <option value="KIS">
                      Kisumu Airport (KIS) - Kenya
                    </option>
                    <option value="MYD">
                      Malindi Airport (MYD) - Kenya
                    </option>
                    <option value="LAU">
                      Lamu / Manda Airport (LAU) - Kenya
                    </option>
                    <option value="UKA">
                      Diani / Ukunda Airport (UKA) - Kenya
                    </option>
                    <option value="TNR">
                      Antananarivo - Ivato Int'l (TNR) - Madagascar
                    </option>
                    <option value="NOS">
                      Nosy Be Airport - Madagascar
                    </option>
                    <option value="TMM">
                      Toamasina Airport - Madagascar
                    </option>
                    <option value="TLE">
                      Toliara Airport - Madagascar
                    </option>
                    <option value="MRU">
                      Mauritius - Sir Seewoosagur Ramgoolam (MRU) - Mauritius
                    </option>
                    <option value="RRG">
                      Rodrigues Island Airport - Mauritius
                    </option>
                    <option value="KGL">
                      Kigali Int'l (KGL) - Rwanda
                    </option>
                    <option value="KME">
                      Kamembe Int'l (KME) - Rwanda
                    </option>
                    <option value="GYI">
                      Gisenyi Airport (GYI) - Rwanda
                    </option>
                    <option value="BGD">
                      Bugesera Int'l - Rwanda
                    </option>
                    <option value="SEZ">
                      Mahé - Seychelles Int'l (SEZ) - Seychelles
                    </option>
                    <option value="PRI">
                      Praslin Island Airport - Seychelles
                    </option>
                    <option value="MGQ">
                      Mogadishu - Aden Adde Int'l (MGQ) - Somalia
                    </option>
                    <option value="HGA">
                      Hargeisa Egal Int'l (HGA) - Somalia
                    </option>
                    <option value="JUB">
                      Juba Int'l (JUB) - South Sudan
                    </option>
                    <option value="MAK">
                      Malakal Airport - South Sudan
                    </option>
                    <option value="WUU">
                      Wau Airport - South Sudan
                    </option>
                    <option value="DAR">
                      Dar es Salaam - Julius Nyerere (DAR) - Tanzania
                    </option>
                    <option value="JRO">
                      Kilimanjaro Int'l (JRO) - Tanzania
                    </option>
                    <option value="ZNZ">
                      Zanzibar - Abeid Amani Karume (ZNZ) - Tanzania
                    </option>
                    <option value="MWZ">
                      Mwanza Airport - Tanzania
                    </option>
                    <option value="ARK">
                      Arusha Airport - Tanzania
                    </option>
                    <option value="EBB">
                      Entebbe Int'l (EBB) - Uganda
                    </option>
                    <option value="KJJ">
                      Kajjansi Airfield - Uganda
                    </option>
                    <option value="GUL">
                      Gulu Airport - Uganda
                    </option>
                    <option value="RUA">
                      Arua Airport - Uganda
                    </option>
                    <option value="KSE">
                      Kasese Airport - Uganda
                    </option>
                    <option value="JIN">
                      Jinja Airfield - Uganda
                    </option>
                    <option value="TRY">
                      Tororo Airstrip - Uganda
                    </option>
                  </optgroup>
                  <optgroup label="Central Africa">
                    <option value="LAD">
                      Luanda - Quatro de Fevereiro (LAD) - Angola
                    </option>
                    <option value="SDD">
                      Lubango Airport - Angola
                    </option>
                    <option value="BUG">
                      Benguela Airport - Angola
                    </option>
                    <option value="CAB">
                      Cabinda Airport - Angola
                    </option>
                    <option value="DLA">
                      Douala Int'l (DLA) - Cameroon
                    </option>
                    <option value="NSI">
                      Yaoundé Nsimalen Int'l (NSI) - Cameroon
                    </option>
                    <option value="GRO">
                      Garoua Int'l Airport - Cameroon
                    </option>
                    <option value="BGF">
                      Bangui M'Poko Int'l (BGF) - CAR
                    </option>
                    <option value="NDJ">
                      N'Djamena Int'l (NDJ) - Chad
                    </option>
                    <option value="AEH">
                      Abéché Airport - Chad
                    </option>
                    <option value="MVO">
                      Moundou Airport - Chad
                    </option>
                    <option value="FIH">
                      Kinshasa - N'djili Int'l (FIH) - DR Congo
                    </option>
                    <option value="FBM">
                      Lubumbashi Int'l (FBM) - DR Congo
                    </option>
                    <option value="KWZ">
                      Kolwezi (KWZ) - DR Congo
                    </option>
                    <option value="GOM">
                      Goma Int'l (GOM) - DR Congo
                    </option>
                    <option value="FKI">
                      Kisangani / Bangoka (FKI) - DR Congo
                    </option>
                    <option value="MJM">
                      Mbuji-Mayi (MJM) - DR Congo
                    </option>
                    <option value="KGA">
                      Kananga (KGA) - DR Congo
                    </option>
                    <option value="BKY">
                      Bukavu / Kavumu (BKY) - DR Congo
                    </option>
                    <option value="NLO">
                      Ndolo Airport (NLO) - DR Congo
                    </option>
                    <option value="FMI">
                      Kalemie (FMI) - DR Congo
                    </option>
                    <option value="BUX">
                      Bunia (BUX) - DR Congo
                    </option>
                    <option value="SSG">
                      Malabo Int'l (SSG) - Equatorial Guinea
                    </option>
                    <option value="BSG">
                      Bata Airport - Equatorial Guinea
                    </option>
                    <option value="LBV">
                      Libreville Léon Mba Int'l (LBV) - Gabon
                    </option>
                    <option value="POG">
                      Port-Gentil Airport - Gabon
                    </option>
                    <option value="MVB">
                      Franceville Airport - Gabon
                    </option>
                    <option value="BZV">
                      Brazzaville - Maya-Maya (BZV) - Congo Republic
                    </option>
                    <option value="PNR">
                      Pointe-Noire Airport (PNR) - Congo Republic
                    </option>
                    <option value="TMS">
                      São Tomé Int'l (TMS) - São Tomé & Príncipe
                    </option>
                  </optgroup>
                  <optgroup label="North Africa">
                    <option value="ALG">
                      Algiers - Houari Boumediene (ALG) - Algeria
                    </option>
                    <option value="ORN">
                      Oran - Ahmed Ben Bella (ORN) - Algeria
                    </option>
                    <option value="CZL">
                      Constantine Airport - Algeria
                    </option>
                    <option value="AAE">
                      Annaba Airport - Algeria
                    </option>
                    <option value="CAI">
                      Cairo Int'l (CAI) - Egypt
                    </option>
                    <option value="HRG">
                      Hurghada Int'l (HRG) - Egypt
                    </option>
                    <option value="SSH">
                      Sharm El Sheikh Int'l (SSH) - Egypt
                    </option>
                    <option value="LXR">
                      Luxor Airport - Egypt
                    </option>
                    <option value="ASW">
                      Aswan Airport - Egypt
                    </option>
                    <option value="HBE">
                      Alexandria Borg El Arab - Egypt
                    </option>
                    <option value="MJI">
                      Tripoli - Mitiga Int'l (MJI) - Libya
                    </option>
                    <option value="BEN">
                      Benghazi - Benina Int'l (BEN) - Libya
                    </option>
                    <option value="MRA">
                      Misrata Airport - Libya
                    </option>
                    <option value="CMN">
                      Casablanca - Mohammed V Int'l (CMN) - Morocco
                    </option>
                    <option value="RAK">
                      Marrakech Menara (RAK) - Morocco
                    </option>
                    <option value="AGA">
                      Agadir Al Massira (AGA) - Morocco
                    </option>
                    <option value="RBA">
                      Rabat-Salé Airport - Morocco
                    </option>
                    <option value="FEZ">
                      Fès–Saïs Airport - Morocco
                    </option>
                    <option value="TNG">
                      Tangier Ibn Batouta - Morocco
                    </option>
                    <option value="PZU">
                      Port Sudan New Int'l (PZU) - Sudan
                    </option>
                    <option value="KRT">
                      Khartoum Int'l - Sudan
                    </option>
                    <option value="TUN">
                      Tunis Carthage Int'l (TUN) - Tunisia
                    </option>
                    <option value="MIR">
                      Monastir Habib Bourguiba (MIR) - Tunisia
                    </option>
                    <option value="DJE">
                      Djerba Zarzis Int'l (DJE) - Tunisia
                    </option>
                    <option value="SFA">
                      Sfax Airport - Tunisia
                    </option>
                  </optgroup>
                  <optgroup label="Southern Africa">
                    <option value="GBE">
                      Gaborone - Sir Seretse Khama Int'l (GBE) - Botswana
                    </option>
                    <option value="MUB">
                      Maun Airport - Botswana
                    </option>
                    <option value="BBK">
                      Kasane Airport - Botswana
                    </option>
                    <option value="SHO">
                      King Mswati III Int'l (SHO) - Eswatini
                    </option>
                    <option value="MSU">
                      Moshoeshoe I Int'l (MSU) - Lesotho
                    </option>
                    <option value="LLW">
                      Lilongwe - Kamuzu Int'l (LLW) - Malawi
                    </option>
                    <option value="BLZ">
                      Blantyre - Chileka Int'l (BLZ) - Malawi
                    </option>
                    <option value="MPM">
                      Maputo Int'l (MPM) - Mozambique
                    </option>
                    <option value="BEW">
                      Beira Airport - Mozambique
                    </option>
                    <option value="APL">
                      Nampula Airport - Mozambique
                    </option>
                    <option value="POL">
                      Pemba Airport - Mozambique
                    </option>
                    <option value="WDH">
                      Windhoek - Hosea Kutako Int'l (WDH) - Namibia
                    </option>
                    <option value="WVB">
                      Walvis Bay Airport - Namibia
                    </option>
                    <option value="ERS">
                      Windhoek - Eros Airport - Namibia
                    </option>
                    <option value="JNB">
                      Johannesburg - O.R. Tambo Int'l (JNB) - South Africa
                    </option>
                    <option value="CPT">
                      Cape Town Int'l (CPT) - South Africa
                    </option>
                    <option value="DUR">
                      Durban - King Shaka Int'l (DUR) - South Africa
                    </option>
                    <option value="HLA">
                      Johannesburg - Lanseria (HLA) - South Africa
                    </option>
                    <option value="PLZ">
                      Port Elizabeth (Gqeberha) (PLZ) - South Africa
                    </option>
                    <option value="GRJ">
                      George Airport (GRJ) - South Africa
                    </option>
                    <option value="LUN">
                      Lusaka - Kenneth Kaunda Int'l (LUN) - Zambia
                    </option>
                    <option value="LVI">
                      Livingstone - Harry Mwaanga Nkumbula (LVI) - Zambia
                    </option>
                    <option value="NLA">
                      Ndola Airport - Zambia
                    </option>
                    <option value="MFU">
                      Mfuwe Airport - Zambia
                    </option>
                    <option value="HRE">
                      Harare - Robert Gabriel Mugabe Int'l (HRE) - Zimbabwe
                    </option>
                    <option value="VFA">
                      Victoria Falls Airport (VFA) - Zimbabwe
                    </option>
                    <option value="BUQ">
                      Bulawayo - Joshua Mqabuko Nkomo (BUQ) - Zimbabwe
                    </option>
                  </optgroup>
                </select>
                <i className="fa-solid fa-plane-departure" style={{ position: 'absolute', right: '12px', top: '15px', color: 'var(--text-muted)', pointerEvents: 'none' }}></i>
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="to-input">
                To
              </label>
              <div style={{ position: 'relative' }}>
                <select className="input-field" id="to-input" style={{ appearance: 'none', WebkitAppearance: 'none' }}>
                  <option value="">
                    Select destination
                  </option>
                  <optgroup label="Popular & International Hubs">
                    <option value="DSS">
                      Dakar (DSS) - Senegal
                    </option>
                    <option value="LFW">
                      Lomé (LFW) - Togo
                    </option>
                    <option value="DLA">
                      Douala (DLA) - Cameroon
                    </option>
                    <option value="HRE">
                      Harare (HRE) - Zimbabwe
                    </option>
                    <option value="ADD">
                      Addis Ababa (ADD) - Ethiopia
                    </option>
                    <option value="NBO">
                      Nairobi (NBO) - Kenya
                    </option>
                    <option value="JNB">
                      Johannesburg (JNB) - South Africa
                    </option>
                    <option value="CPT">
                      Cape Town (CPT) - South Africa
                    </option>
                    <option value="CAI">
                      Cairo (CAI) - Egypt
                    </option>
                    <option value="CMN">
                      Casablanca (CMN) - Morocco
                    </option>
                  </optgroup>
                  <optgroup label="West Africa">
                    <option value="COO">
                      Cotonou - Cadjehoun (COO) - Benin
                    </option>
                    <option value="PKO">
                      Parakou Airport - Benin
                    </option>
                    <option value="OUA">
                      Ouagadougou (OUA) - Burkina Faso
                    </option>
                    <option value="BOY">
                      Bobo Dioulasso Airport - Burkina Faso
                    </option>
                    <option value="SID">
                      Sal - Amílcar Cabral Int'l (SID) - Cabo Verde
                    </option>
                    <option value="RAI">
                      Praia - Nelson Mandela Int'l (RAI) - Cabo Verde
                    </option>
                    <option value="ABJ">
                      Abidjan - Félix Houphouët Boigny (ABJ) - Côte d'Ivoire
                    </option>
                    <option value="ASK">
                      Yamoussoukro Airport - Côte d'Ivoire
                    </option>
                    <option value="BYK">
                      Bouaké Airport - Côte d'Ivoire
                    </option>
                    <option value="SPY">
                      San Pédro Airport - Côte d'Ivoire
                    </option>
                    <option value="BJL">
                      Banjul Int'l (BJL) - Gambia
                    </option>
                    <option value="ACC">
                      Accra - Kotoka Int'l (ACC) - Ghana
                    </option>
                    <option value="KMS">
                      Kumasi Airport - Ghana
                    </option>
                    <option value="TML">
                      Tamale Airport - Ghana
                    </option>
                    <option value="TKD">
                      Takoradi Airport - Ghana
                    </option>
                    <option value="CKY">
                      Conakry - Ahmed Sékou Touré (CKY) - Guinea
                    </option>
                    <option value="KNN">
                      Kankan Airport - Guinea
                    </option>
                    <option value="NZE">
                      N'Zérékoré Airport - Guinea
                    </option>
                    <option value="OXB">
                      Bissau - Osvaldo Vieira Int'l (OXB) - Guinea-Bissau
                    </option>
                    <option value="ROB">
                      Monrovia - Roberts Int'l (ROB) - Liberia
                    </option>
                    <option value="MLW">
                      Monrovia - Spriggs Payne Airport - Liberia
                    </option>
                    <option value="BKO">
                      Bamako - Modibo Keita Int'l (BKO) - Mali
                    </option>
                    <option value="MOPT">
                      Mopti Airport - Mali
                    </option>
                    <option value="TMB">
                      Timbuktu Airport - Mali
                    </option>
                    <option value="GAQ">
                      Gao Airport - Mali
                    </option>
                    <option value="NKC">
                      Nouakchott Oumtounsy (NKC) - Mauritania
                    </option>
                    <option value="NDB">
                      Nouadhibou Airport - Mauritania
                    </option>
                    <option value="NIM">
                      Niamey - Diori Hamani Int'l (NIM) - Niger
                    </option>
                    <option value="AJY">
                      Agadez Airport - Niger
                    </option>
                    <option value="ZND">
                      Zinder Airport - Niger
                    </option>
                    <option value="LOS">
                      Lagos - Murtala Muhammed (LOS) - Nigeria
                    </option>
                    <option value="ABV">
                      Abuja - Nnamdi Azikiwe (ABV) - Nigeria
                    </option>
                    <option value="PHC">
                      Port Harcourt Int'l (PHC) - Nigeria
                    </option>
                    <option value="KAN">
                      Kano - Mallam Aminu Kano (KAN) - Nigeria
                    </option>
                    <option value="ENU">
                      Enugu - Akanu Ibiam (ENU) - Nigeria
                    </option>
                    <option value="KAD">
                      Kaduna Airport (KAD) - Nigeria
                    </option>
                    <option value="ILR">
                      Ilorin Airport (ILR) - Nigeria
                    </option>
                    <option value="QRW">
                      Warri Airport (QRW) - Nigeria
                    </option>
                    <option value="BNI">
                      Benin City Airport (BNI) - Nigeria
                    </option>
                    <option value="CBQ">
                      Calabar Airport (CBQ) - Nigeria
                    </option>
                    <option value="QOW">
                      Owerri Airport (QOW) - Nigeria
                    </option>
                    <option value="DSS">
                      Dakar - Blaise Diagne Int'l (DSS) - Senegal
                    </option>
                    <option value="CSK">
                      Cap Skirring Airport - Senegal
                    </option>
                    <option value="XLS">
                      Saint-Louis Airport - Senegal
                    </option>
                    <option value="FNA">
                      Freetown Int'l / Lungi (FNA) - Sierra Leone
                    </option>
                    <option value="LFW">
                      Lomé Tokoin (LFW) - Togo
                    </option>
                  </optgroup>
                  <optgroup label="East Africa">
                    <option value="BJM">
                      Bujumbura - Melchior Ndadaye Int'l (BJM) - Burundi
                    </option>
                    <option value="HAH">
                      Moroni - Prince Said Ibrahim Int'l (HAH) - Comoros
                    </option>
                    <option value="NWA">
                      Mohéli Airport - Comoros
                    </option>
                    <option value="AJN">
                      Anjouan Airport - Comoros
                    </option>
                    <option value="JIB">
                      Djibouti Ambouli Int'l (JIB) - Djibouti
                    </option>
                    <option value="ASM">
                      Asmara Int'l (ASM) - Eritrea
                    </option>
                    <option value="MSW">
                      Massawa Airport - Eritrea
                    </option>
                    <option value="ADD">
                      Addis Ababa Bole Int'l (ADD) - Ethiopia
                    </option>
                    <option value="DIR">
                      Dire Dawa Airport - Ethiopia
                    </option>
                    <option value="BJR">
                      Bahir Dar Airport - Ethiopia
                    </option>
                    <option value="GDQ">
                      Gondar Airport - Ethiopia
                    </option>
                    <option value="MQX">
                      Mekelle Airport - Ethiopia
                    </option>
                    <option value="LLI">
                      Lalibela Airport - Ethiopia
                    </option>
                    <option value="NBO">
                      Nairobi - Jomo Kenyatta Int'l (NBO) - Kenya
                    </option>
                    <option value="WIL">
                      Nairobi - Wilson Airport (WIL) - Kenya
                    </option>
                    <option value="MBA">
                      Mombasa - Moi Int'l (MBA) - Kenya
                    </option>
                    <option value="EDL">
                      Eldoret Airport (EDL) - Kenya
                    </option>
                    <option value="KIS">
                      Kisumu Airport (KIS) - Kenya
                    </option>
                    <option value="MYD">
                      Malindi Airport (MYD) - Kenya
                    </option>
                    <option value="LAU">
                      Lamu / Manda Airport (LAU) - Kenya
                    </option>
                    <option value="UKA">
                      Diani / Ukunda Airport (UKA) - Kenya
                    </option>
                    <option value="TNR">
                      Antananarivo - Ivato Int'l (TNR) - Madagascar
                    </option>
                    <option value="NOS">
                      Nosy Be Airport - Madagascar
                    </option>
                    <option value="TMM">
                      Toamasina Airport - Madagascar
                    </option>
                    <option value="TLE">
                      Toliara Airport - Madagascar
                    </option>
                    <option value="MRU">
                      Mauritius - Sir Seewoosagur Ramgoolam (MRU) - Mauritius
                    </option>
                    <option value="RRG">
                      Rodrigues Island Airport - Mauritius
                    </option>
                    <option value="KGL">
                      Kigali Int'l (KGL) - Rwanda
                    </option>
                    <option value="KME">
                      Kamembe Int'l (KME) - Rwanda
                    </option>
                    <option value="GYI">
                      Gisenyi Airport (GYI) - Rwanda
                    </option>
                    <option value="BGD">
                      Bugesera Int'l - Rwanda
                    </option>
                    <option value="SEZ">
                      Mahé - Seychelles Int'l (SEZ) - Seychelles
                    </option>
                    <option value="PRI">
                      Praslin Island Airport - Seychelles
                    </option>
                    <option value="MGQ">
                      Mogadishu - Aden Adde Int'l (MGQ) - Somalia
                    </option>
                    <option value="HGA">
                      Hargeisa Egal Int'l (HGA) - Somalia
                    </option>
                    <option value="JUB">
                      Juba Int'l (JUB) - South Sudan
                    </option>
                    <option value="MAK">
                      Malakal Airport - South Sudan
                    </option>
                    <option value="WUU">
                      Wau Airport - South Sudan
                    </option>
                    <option value="DAR">
                      Dar es Salaam - Julius Nyerere (DAR) - Tanzania
                    </option>
                    <option value="JRO">
                      Kilimanjaro Int'l (JRO) - Tanzania
                    </option>
                    <option value="ZNZ">
                      Zanzibar - Abeid Amani Karume (ZNZ) - Tanzania
                    </option>
                    <option value="MWZ">
                      Mwanza Airport - Tanzania
                    </option>
                    <option value="ARK">
                      Arusha Airport - Tanzania
                    </option>
                    <option value="EBB">
                      Entebbe Int'l (EBB) - Uganda
                    </option>
                    <option value="KJJ">
                      Kajjansi Airfield - Uganda
                    </option>
                    <option value="GUL">
                      Gulu Airport - Uganda
                    </option>
                    <option value="RUA">
                      Arua Airport - Uganda
                    </option>
                    <option value="KSE">
                      Kasese Airport - Uganda
                    </option>
                    <option value="JIN">
                      Jinja Airfield - Uganda
                    </option>
                    <option value="TRY">
                      Tororo Airstrip - Uganda
                    </option>
                  </optgroup>
                  <optgroup label="Central Africa">
                    <option value="LAD">
                      Luanda - Quatro de Fevereiro (LAD) - Angola
                    </option>
                    <option value="SDD">
                      Lubango Airport - Angola
                    </option>
                    <option value="BUG">
                      Benguela Airport - Angola
                    </option>
                    <option value="CAB">
                      Cabinda Airport - Angola
                    </option>
                    <option value="DLA">
                      Douala Int'l (DLA) - Cameroon
                    </option>
                    <option value="NSI">
                      Yaoundé Nsimalen Int'l (NSI) - Cameroon
                    </option>
                    <option value="GRO">
                      Garoua Int'l Airport - Cameroon
                    </option>
                    <option value="BGF">
                      Bangui M'Poko Int'l (BGF) - CAR
                    </option>
                    <option value="NDJ">
                      N'Djamena Int'l (NDJ) - Chad
                    </option>
                    <option value="AEH">
                      Abéché Airport - Chad
                    </option>
                    <option value="MVO">
                      Moundou Airport - Chad
                    </option>
                    <option value="FIH">
                      Kinshasa - N'djili Int'l (FIH) - DR Congo
                    </option>
                    <option value="FBM">
                      Lubumbashi Int'l (FBM) - DR Congo
                    </option>
                    <option value="KWZ">
                      Kolwezi (KWZ) - DR Congo
                    </option>
                    <option value="GOM">
                      Goma Int'l (GOM) - DR Congo
                    </option>
                    <option value="FKI">
                      Kisangani / Bangoka (FKI) - DR Congo
                    </option>
                    <option value="MJM">
                      Mbuji-Mayi (MJM) - DR Congo
                    </option>
                    <option value="KGA">
                      Kananga (KGA) - DR Congo
                    </option>
                    <option value="BKY">
                      Bukavu / Kavumu (BKY) - DR Congo
                    </option>
                    <option value="NLO">
                      Ndolo Airport (NLO) - DR Congo
                    </option>
                    <option value="FMI">
                      Kalemie (FMI) - DR Congo
                    </option>
                    <option value="BUX">
                      Bunia (BUX) - DR Congo
                    </option>
                    <option value="SSG">
                      Malabo Int'l (SSG) - Equatorial Guinea
                    </option>
                    <option value="BSG">
                      Bata Airport - Equatorial Guinea
                    </option>
                    <option value="LBV">
                      Libreville Léon Mba Int'l (LBV) - Gabon
                    </option>
                    <option value="POG">
                      Port-Gentil Airport - Gabon
                    </option>
                    <option value="MVB">
                      Franceville Airport - Gabon
                    </option>
                    <option value="BZV">
                      Brazzaville - Maya-Maya (BZV) - Congo Republic
                    </option>
                    <option value="PNR">
                      Pointe-Noire Airport (PNR) - Congo Republic
                    </option>
                    <option value="TMS">
                      São Tomé Int'l (TMS) - São Tomé & Príncipe
                    </option>
                  </optgroup>
                  <optgroup label="North Africa">
                    <option value="ALG">
                      Algiers - Houari Boumediene (ALG) - Algeria
                    </option>
                    <option value="ORN">
                      Oran - Ahmed Ben Bella (ORN) - Algeria
                    </option>
                    <option value="CZL">
                      Constantine Airport - Algeria
                    </option>
                    <option value="AAE">
                      Annaba Airport - Algeria
                    </option>
                    <option value="CAI">
                      Cairo Int'l (CAI) - Egypt
                    </option>
                    <option value="HRG">
                      Hurghada Int'l (HRG) - Egypt
                    </option>
                    <option value="SSH">
                      Sharm El Sheikh Int'l (SSH) - Egypt
                    </option>
                    <option value="LXR">
                      Luxor Airport - Egypt
                    </option>
                    <option value="ASW">
                      Aswan Airport - Egypt
                    </option>
                    <option value="HBE">
                      Alexandria Borg El Arab - Egypt
                    </option>
                    <option value="MJI">
                      Tripoli - Mitiga Int'l (MJI) - Libya
                    </option>
                    <option value="BEN">
                      Benghazi - Benina Int'l (BEN) - Libya
                    </option>
                    <option value="MRA">
                      Misrata Airport - Libya
                    </option>
                    <option value="CMN">
                      Casablanca - Mohammed V Int'l (CMN) - Morocco
                    </option>
                    <option value="RAK">
                      Marrakech Menara (RAK) - Morocco
                    </option>
                    <option value="AGA">
                      Agadir Al Massira (AGA) - Morocco
                    </option>
                    <option value="RBA">
                      Rabat-Salé Airport - Morocco
                    </option>
                    <option value="FEZ">
                      Fès–Saïs Airport - Morocco
                    </option>
                    <option value="TNG">
                      Tangier Ibn Batouta - Morocco
                    </option>
                    <option value="PZU">
                      Port Sudan New Int'l (PZU) - Sudan
                    </option>
                    <option value="KRT">
                      Khartoum Int'l - Sudan
                    </option>
                    <option value="TUN">
                      Tunis Carthage Int'l (TUN) - Tunisia
                    </option>
                    <option value="MIR">
                      Monastir Habib Bourguiba (MIR) - Tunisia
                    </option>
                    <option value="DJE">
                      Djerba Zarzis Int'l (DJE) - Tunisia
                    </option>
                    <option value="SFA">
                      Sfax Airport - Tunisia
                    </option>
                  </optgroup>
                  <optgroup label="Southern Africa">
                    <option value="GBE">
                      Gaborone - Sir Seretse Khama Int'l (GBE) - Botswana
                    </option>
                    <option value="MUB">
                      Maun Airport - Botswana
                    </option>
                    <option value="BBK">
                      Kasane Airport - Botswana
                    </option>
                    <option value="SHO">
                      King Mswati III Int'l (SHO) - Eswatini
                    </option>
                    <option value="MSU">
                      Moshoeshoe I Int'l (MSU) - Lesotho
                    </option>
                    <option value="LLW">
                      Lilongwe - Kamuzu Int'l (LLW) - Malawi
                    </option>
                    <option value="BLZ">
                      Blantyre - Chileka Int'l (BLZ) - Malawi
                    </option>
                    <option value="MPM">
                      Maputo Int'l (MPM) - Mozambique
                    </option>
                    <option value="BEW">
                      Beira Airport - Mozambique
                    </option>
                    <option value="APL">
                      Nampula Airport - Mozambique
                    </option>
                    <option value="POL">
                      Pemba Airport - Mozambique
                    </option>
                    <option value="WDH">
                      Windhoek - Hosea Kutako Int'l (WDH) - Namibia
                    </option>
                    <option value="WVB">
                      Walvis Bay Airport - Namibia
                    </option>
                    <option value="ERS">
                      Windhoek - Eros Airport - Namibia
                    </option>
                    <option value="JNB">
                      Johannesburg - O.R. Tambo Int'l (JNB) - South Africa
                    </option>
                    <option value="CPT">
                      Cape Town Int'l (CPT) - South Africa
                    </option>
                    <option value="DUR">
                      Durban - King Shaka Int'l (DUR) - South Africa
                    </option>
                    <option value="HLA">
                      Johannesburg - Lanseria (HLA) - South Africa
                    </option>
                    <option value="PLZ">
                      Port Elizabeth (Gqeberha) (PLZ) - South Africa
                    </option>
                    <option value="GRJ">
                      George Airport (GRJ) - South Africa
                    </option>
                    <option value="LUN">
                      Lusaka - Kenneth Kaunda Int'l (LUN) - Zambia
                    </option>
                    <option value="LVI">
                      Livingstone - Harry Mwaanga Nkumbula (LVI) - Zambia
                    </option>
                    <option value="NLA">
                      Ndola Airport - Zambia
                    </option>
                    <option value="MFU">
                      Mfuwe Airport - Zambia
                    </option>
                    <option value="HRE">
                      Harare - Robert Gabriel Mugabe Int'l (HRE) - Zimbabwe
                    </option>
                    <option value="VFA">
                      Victoria Falls Airport (VFA) - Zimbabwe
                    </option>
                    <option value="BUQ">
                      Bulawayo - Joshua Mqabuko Nkomo (BUQ) - Zimbabwe
                    </option>
                  </optgroup>
                </select>
                <i className="fa-solid fa-plane-arrival" style={{ position: 'absolute', right: '12px', top: '15px', color: 'var(--text-muted)', pointerEvents: 'none' }}></i>
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="seat-input">
                Seat Type
              </label>
              <div style={{ position: 'relative' }}>
                <select className="input-field" id="seat-input" style={{ appearance: 'none', WebkitAppearance: 'none' }}>
                  <option value="economy">
                    Economy
                  </option>
                  <option value="premium">
                    Premium Economy
                  </option>
                  <option value="business">
                    Business Class
                  </option>
                  <option value="first">
                    First Class
                  </option>
                </select>
                <i className="fa-solid fa-chair" style={{ position: 'absolute', right: '12px', top: '15px', color: 'var(--text-muted)', pointerEvents: 'none' }}></i>
              </div>
            </div>
            <button className="btn btn-primary" type="submit" style={{ height: '46px', marginBottom: '2px' }}>
              Search Flights 
              <i className="fa-solid fa-arrow-right" style={{ marginLeft: '8px' }}></i>
            </button>
          </form>
          <div className="booking-options">
            <label className="option-checkbox">
              <input defaultChecked name="flight-type" type="radio" />
              <span className="custom-checkbox"></span>
              One-Way Flight
            </label>
            <label className="option-checkbox">
              <input name="flight-type" type="radio" />
              <span className="custom-checkbox"></span>
              Round Trip
            </label>
            <label className="option-checkbox">
              <input name="flight-type" type="radio" />
              <span className="custom-checkbox"></span>
              Multi-City
            </label>
            <label className="option-checkbox">
              <input name="flexible-dates" type="checkbox" />
              <span className="custom-checkbox"></span>
              Flexible Dates
            </label>
          </div>
        </div>
        <div className="tab-panel" id="panel-hotel" style={{ display: 'none' }}>
          <form className="booking-form" id="form-hotel">
            <div className="input-group">
              <label htmlFor="hotel-destination-input">
                Destination
              </label>
              <div style={{ position: 'relative' }}>
                <select className="input-field" id="hotel-destination-input" style={{ appearance: 'none', WebkitAppearance: 'none' }}>
                  <option value="">
                    Select destination
                  </option>
                  <option value="LOS">
                    Lagos, Nigeria
                  </option>
                  <option value="ABV">
                    Abuja, Nigeria
                  </option>
                  <option value="ACC">
                    Accra, Ghana
                  </option>
                  <option value="NBO">
                    Nairobi, Kenya
                  </option>
                  <option value="DSS">
                    Dakar, Senegal
                  </option>
                  <option value="EBB">
                    Kampala, Uganda
                  </option>
                  <option value="BJL">
                    Banjul, Gambia
                  </option>
                </select>
                <i className="fa-solid fa-location-dot" style={{ position: 'absolute', right: '12px', top: '15px', color: 'var(--text-muted)', pointerEvents: 'none' }}></i>
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="hotel-checkin-input">
                Check-In
              </label>
              <div style={{ position: 'relative' }}>
                <input className="input-field" id="hotel-checkin-input" type="date" />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="hotel-checkout-input">
                Check-Out
              </label>
              <div style={{ position: 'relative' }}>
                <input className="input-field" id="hotel-checkout-input" type="date" />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="hotel-guests-input">
                Guests
              </label>
              <div style={{ position: 'relative' }}>
                <select className="input-field" id="hotel-guests-input" style={{ appearance: 'none', WebkitAppearance: 'none' }}>
                  <option value="1">
                    1 Guest
                  </option>
                  <option value="2">
                    2 Guests
                  </option>
                  <option value="3">
                    3 Guests
                  </option>
                  <option value="4">
                    4+ Guests
                  </option>
                </select>
                <i className="fa-solid fa-user" style={{ position: 'absolute', right: '12px', top: '15px', color: 'var(--text-muted)', pointerEvents: 'none' }}></i>
              </div>
            </div>
            <button className="btn btn-primary" type="submit" style={{ height: '46px', marginBottom: '2px' }}>
              Search Hotels 
              <i className="fa-solid fa-arrow-right" style={{ marginLeft: '8px' }}></i>
            </button>
          </form>
        </div>
        <div className="tab-panel" id="panel-holiday" style={{ display: 'none' }}>
          <form className="booking-form" id="form-holiday">
            <div className="input-group">
              <label htmlFor="holiday-destination-input">
                Destination
              </label>
              <div style={{ position: 'relative' }}>
                <select className="input-field" id="holiday-destination-input" style={{ appearance: 'none', WebkitAppearance: 'none' }}>
                  <option value="">
                    Select destination
                  </option>
                  <option value="ZNZ">
                    Zanzibar, Tanzania
                  </option>
                  <option value="ACC">
                    Accra, Ghana
                  </option>
                  <option value="CPT">
                    Cape Town, South Africa
                  </option>
                  <option value="NBO">
                    Nairobi, Kenya
                  </option>
                </select>
                <i className="fa-solid fa-umbrella-beach" style={{ position: 'absolute', right: '12px', top: '15px', color: 'var(--text-muted)', pointerEvents: 'none' }}></i>
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="holiday-departure-date-input">
                Departure Date
              </label>
              <div style={{ position: 'relative' }}>
                <input className="input-field" id="holiday-departure-date-input" type="date" />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="holiday-duration-input">
                Duration
              </label>
              <div style={{ position: 'relative' }}>
                <select className="input-field" id="holiday-duration-input" style={{ appearance: 'none', WebkitAppearance: 'none' }}>
                  <option value="4">
                    4 Days
                  </option>
                  <option value="5">
                    5 Days
                  </option>
                  <option value="7">
                    7 Days
                  </option>
                  <option value="10">
                    10 Days
                  </option>
                </select>
                <i className="fa-solid fa-calendar-days" style={{ position: 'absolute', right: '12px', top: '15px', color: 'var(--text-muted)', pointerEvents: 'none' }}></i>
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="holiday-travelers-input">
                Travelers
              </label>
              <div style={{ position: 'relative' }}>
                <select className="input-field" id="holiday-travelers-input" style={{ appearance: 'none', WebkitAppearance: 'none' }}>
                  <option value="1">
                    1 Traveler
                  </option>
                  <option value="2">
                    2 Travelers
                  </option>
                  <option value="3">
                    3 Travelers
                  </option>
                  <option value="4">
                    4+ Travelers
                  </option>
                </select>
                <i className="fa-solid fa-users" style={{ position: 'absolute', right: '12px', top: '15px', color: 'var(--text-muted)', pointerEvents: 'none' }}></i>
              </div>
            </div>
            <button className="btn btn-primary" type="submit" style={{ height: '46px', marginBottom: '2px' }}>
              Search Packages 
              <i className="fa-solid fa-arrow-right" style={{ marginLeft: '8px' }}></i>
            </button>
          </form>
        </div>
        <div className="tab-panel" id="panel-visa" style={{ display: 'none' }}>
          <form className="booking-form" id="form-visa">
            <div className="input-group">
              <label htmlFor="visa-destination-input">
                Destination Country
              </label>
              <div style={{ position: 'relative' }}>
                <select className="input-field" id="visa-destination-input" style={{ appearance: 'none', WebkitAppearance: 'none' }}>
                  <option value="">
                    Select country
                  </option>
                  <option value="UK">
                    United Kingdom
                  </option>
                  <option value="US">
                    United States
                  </option>
                  <option value="AE">
                    United Arab Emirates
                  </option>
                  <option value="FR">
                    France
                  </option>
                  <option value="ZA">
                    South Africa
                  </option>
                  <option value="GH">
                    Ghana
                  </option>
                  <option value="KE">
                    Kenya
                  </option>
                </select>
                <i className="fa-solid fa-earth-africa" style={{ position: 'absolute', right: '12px', top: '15px', color: 'var(--text-muted)', pointerEvents: 'none' }}></i>
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="visa-type-input">
                Visa Type
              </label>
              <div style={{ position: 'relative' }}>
                <select className="input-field" id="visa-type-input" style={{ appearance: 'none', WebkitAppearance: 'none' }}>
                  <option value="tourist">
                    Tourist
                  </option>
                  <option value="business">
                    Business
                  </option>
                  <option value="student">
                    Student
                  </option>
                  <option value="work">
                    Work
                  </option>
                  <option value="transit">
                    Transit
                  </option>
                </select>
                <i className="fa-solid fa-passport" style={{ position: 'absolute', right: '12px', top: '15px', color: 'var(--text-muted)', pointerEvents: 'none' }}></i>
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="visa-travel-date-input">
                Intended Travel Date
              </label>
              <div style={{ position: 'relative' }}>
                <input className="input-field" id="visa-travel-date-input" type="date" />
              </div>
            </div>
            <button className="btn btn-primary" type="submit" style={{ height: '46px', marginBottom: '2px' }}>
              Check Visa Requirements 
              <i className="fa-solid fa-arrow-right" style={{ marginLeft: '8px' }}></i>
            </button>
          </form>
        </div>
        <div className="hero-badges-row">
          <div className="hero-badge-card reveal reveal-delay-1">
            <div className="hero-badge-icon">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <path d="m9 11 2 2 4-4"></path>
              </svg>
            </div>
            <div className="hero-badge-text">
              Trusted Travel
              <br />
              Expert
            </div>
          </div>
          <div className="hero-badge-card reveal reveal-delay-2">
            <div className="hero-badge-icon">
              <i className="fa-solid fa-globe"></i>
            </div>
            <div className="hero-badge-text">
              Global
              <br />
              Partnerships
            </div>
          </div>
          <div className="hero-badge-card reveal reveal-delay-3">
            <div className="hero-badge-icon">
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <div className="hero-badge-text">
              Opportunities
              <br />
              across Africa
            </div>
          </div>
          <div className="hero-badge-card reveal reveal-delay-4">
            <div className="hero-badge-icon">
              <i className="fa-solid fa-headset"></i>
            </div>
            <div className="hero-badge-text">
              Dedicated
              <br />
              Support
            </div>
          </div>
        </div>
      </div>

  );
}
