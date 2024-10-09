import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { extractComoSchools } from "./utils/schools";
import { LatLngExpression } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

import { useCallback, useState } from "react";
import { AppBar, Button, Fab, Grid2, TextField, Toolbar, Typography, useTheme } from "@mui/material";
import SchoolCard from "./components/SchoolCard";
import InfoDialog from "./components/InfoDialog";
import NewsDialog from "./components/NewsDialog";

// https://tableconvert.com/
// https://www.geoapify.com/
// https://www.geoapify.com/tools/geocoding-online/
// https://www.adobe.com/acrobat/online/pdf-to-excel.html

const MAP_CENTER: LatLngExpression = [45.67819397, 9.74250449];

function App() {
  const [city, setCity] = useState("");
  const [classId, setClassId] = useState("");
  const [province, setProvince] = useState("");

  const [infoOpen, setInfoOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);

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

  const { spacing } = useTheme();

  const toggleInfo = useCallback(() => setInfoOpen((infoOpen) => !infoOpen), []);

  const toggleNews = useCallback(() => setNewsOpen((newsOpen) => !newsOpen), []);

  return (
    <div style={{ position: "relative" }}>
      <AppBar component="nav">
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }}>Cattedre Lombardia 2024</Typography>
          <div style={{ display: "flex" }}>
            <Button color="info" onClick={toggleNews} variant="contained">
              Novità 🌟
            </Button>
            {/* <Button color="error" variant="contained" sx={{ ml: 1 }}>
              Segnala 🪲
            </Button> */}
          </div>
        </Toolbar>
      </AppBar>
      <div style={{ width: "calc(100% - 32px)", height: "calc(100vh - 72px)", marginTop: "72px" }}>
        <Grid2 container spacing={2}>
          <Grid2
            size={{ xs: 12, lg: 3 }}
            style={{ position: "relative", overflow: "hidden", height: "calc(100vh - 96px)", paddingBottom: "200px" }}
          >
            <Grid2 spacing={2} style={{ marginBottom: spacing(0.25), padding: spacing(2) }}>
              <Grid2 size={6}>
                <TextField
                  id="province"
                  margin="dense"
                  onChange={(e) => setProvince(e.target.value)}
                  placeholder="Provincia"
                  fullWidth
                  size="small"
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  id="city"
                  margin="dense"
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Comune"
                  fullWidth
                  size="small"
                />
              </Grid2>
              <Grid2 size={8}>
                <TextField
                  id="classId"
                  margin="dense"
                  onChange={(e) => setClassId(e.target.value)}
                  placeholder="Classe di concorso"
                  fullWidth
                  size="small"
                />
              </Grid2>
            </Grid2>
            <div style={{ height: "100%", overflowY: "scroll" }}>
              {schools.map((school) => (
                <SchoolCard key={`card-${school["miur:CODICESCUOLA"]}`} classId={classId} school={school} />
              ))}
            </div>
          </Grid2>
          <Grid2 size={{ xs: 12, lg: 9 }}>
            <div
              id="map"
              style={{
                height: "90vh",
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
                    <Marker
                      key={`marker-${school["miur:CODICESCUOLA"]}`}
                      position={[school.coord.lat, school.coord.lon]}
                      icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
                    >
                      <Popup>
                        <SchoolCard classId={classId} school={school} />
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            </div>
          </Grid2>
        </Grid2>
      </div>
      <Fab color="info" style={{ bottom: spacing(2), right: spacing(2), position: "fixed" }} onClick={toggleInfo}>
        ℹ️
      </Fab>
      {infoOpen && <InfoDialog open={infoOpen} toggle={toggleInfo} />}
      {newsOpen && <NewsDialog open={newsOpen} toggle={toggleNews} />}
    </div>
  );
}

export default App;
