import { Card, CardContent, Chip, Typography, useTheme } from "@mui/material";
import { School } from "../../utils/schools";

type SchoolCardProps = {
  classId?: string;
  school: School;
};

const SchoolCard = ({ classId, school }: SchoolCardProps) => {
  const { palette, shape, spacing } = useTheme();

  return (
    <Card key={`card-${school["miur:CODICESCUOLA"]}`} variant="outlined" style={{ marginBottom: "4px" }}>
      <CardContent>
        <Typography display="block">{school["miur:DENOMINAZIONESCUOLA"].replace('"', "").replace('"', "")}</Typography>
        <Typography display="block" variant="caption">
          <b>{school["miur:CODICESCUOLA"]}</b> - {school["miur:DESCRIZIONETIPOLOGIAGRADOISTRUZIONESCUOLA"]}
        </Typography>
        <Typography variant="caption">
          {school["miur:INDIRIZZOSCUOLA"]}, {school["miur:DESCRIZIONECOMUNE"]}
        </Typography>
        <ul style={{ display: "flex", flexWrap: "wrap", marginTop: "8px", padding: "0", listStyle: "none" }}>
          {school.seats
            .sort((a, b) => a.classId.localeCompare(b.classId))
            .filter((seat) => !classId || seat.classId.toUpperCase() === classId.toUpperCase())
            .map((seat) => (
              <li key={`${school["miur:CODICESCUOLA"]}-${seat.classId}`}>
                <div
                  style={{
                    alignItems: "center",
                    border: `1px solid ${palette.divider}`,
                    borderRadius: shape.borderRadius,
                    display: "flex",
                    justifyContent: "center",
                    margin: spacing(0.25),
                    padding: `${spacing(0.25)} ${spacing(0.5)}`,
                  }}
                >
                  <Typography variant="caption">{seat.classId}</Typography>
                  <Chip color="success" label={seat.intSeats} size="small" style={{ marginLeft: "4px" }} />
                  <Chip color="error" label={seat.extSeats} size="small" style={{ marginLeft: "2px" }} />
                </div>
              </li>
            ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default SchoolCard;
