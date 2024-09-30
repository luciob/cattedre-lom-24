import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { extractComoSchools } from "./utils/schools";
import { LatLngExpression } from "leaflet";
import { useState } from "react";

// https://tableconvert.com/
// https://www.geoapify.com/

const MAP_CENTER: LatLngExpression = [45.67819397, 9.74250449];

function App() {
  const [city, setCity] = useState("");
  const [classId, setClassId] = useState("");
  const [province, setProvince] = useState("");

  const schools = extractComoSchools().filter((school) => {
    if (!province && !city && !classId) {
      return true;
    }

    let shouldInclude = true;
    if (province) {
      shouldInclude = school["miur:PROVINCIA"].toUpperCase().includes(province.toUpperCase());
    }
    if (city) {
      shouldInclude = shouldInclude && school["miur:DESCRIZIONECOMUNE"].toUpperCase().includes(city.toUpperCase());
    }
    if (classId) {
      shouldInclude =
        shouldInclude && school.seats.some((seat) => seat.classId.toUpperCase() === classId.toUpperCase());
    }

    return shouldInclude;
  });

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      <div style={{ height: "80%", width: "400px" }}>
        <b>Lista scuole</b>
        <div style={{ display: "flex", flexDirection: "column", marginBottom: "8px" }}>
          <b>Filtro</b>
          <input id="province" onChange={(e) => setProvince(e.target.value)} placeholder="Provincia" value={province} />
          <input id="city" onChange={(e) => setCity(e.target.value)} placeholder="Comune" />
          <input id="classId" onChange={(e) => setClassId(e.target.value)} placeholder="Classe di concorso" />
        </div>
        <div style={{ height: "100%", overflowY: "scroll" }}>
          {schools.map((school) => (
            <div
              key={school["miur:CODICESCUOLA"]}
              style={{ border: "1px solid black", borderRadius: "8px", margin: "8px 0", padding: "8px" }}
            >
              <span>{school["miur:DENOMINAZIONESCUOLA"].replace('"', "").replace('"', "")}</span>
              <br />
              <small>
                <b>{school["miur:CODICESCUOLA"]}</b> - {school["miur:DESCRIZIONETIPOLOGIAGRADOISTRUZIONESCUOLA"]}
              </small>
              <br />
              <small>{`${school["miur:INDIRIZZOSCUOLA"]}, ${school["miur:DESCRIZIONECOMUNE"]}`}</small>
              <br />
              <ul style={{ margin: "2px 0", padding: 0 }}>
                {school.seats
                  .sort((a, b) => a.classId.localeCompare(b.classId))
                  .filter((seat) => !classId || seat.classId.toUpperCase() === classId.toUpperCase())
                  .map((seat) => (
                    <li
                      key={`${school["miur:CODICESCUOLA"]}-${seat.classId}`}
                      style={{
                        border: "1px solid #ccc",
                        boxSizing: "border-box",
                        width: "auto",
                        listStyleType: "none",
                        margin: "1px 0",
                        padding: 0,
                      }}
                    >
                      {seat.classId} - int: {seat.intSeats} - ext: {seat.extSeats}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div
        id="map"
        style={{
          padding: "16px",
          margin: "8px",
          height: "93vh",
          width: "100%",
        }}
      >
        <MapContainer
          center={MAP_CENTER}
          zoom={9}
          scrollWheelZoom={false}
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {schools.map((school) => {
            if (!school.coord) {
              return null;
            }

            return (
              <Marker position={[school.coord.lat, school.coord.lon]}>
                <Popup>
                  <div
                    key={school["miur:CODICESCUOLA"]}
                    style={{ border: "1px solid black", borderRadius: "8px", margin: "8px 0", padding: "16px" }}
                  >
                    <h2>{school["miur:CODICESCUOLA"]}</h2>
                    <span>{school["miur:DENOMINAZIONESCUOLA"]}</span>
                    <br />
                    <span>{school["miur:DESCRIZIONETIPOLOGIAGRADOISTRUZIONESCUOLA"]}</span>
                    <br />
                    <span>{`${school["miur:INDIRIZZOSCUOLA"]}, ${school["miur:DESCRIZIONECOMUNE"]}`}</span>
                    <br />
                    <pre>{JSON.stringify(school.coord, null, 2)}</pre>
                    <ul>
                      {school.seats.map((seat) => (
                        <li key={`${school["miur:CODICESCUOLA"]}-${seat.classId}`}>
                          {seat.classId} - int: {seat.intSeats} - ext: {seat.extSeats}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
