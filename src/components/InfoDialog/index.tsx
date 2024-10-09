import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

type InfoDialogProps = {
  open: boolean;
  toggle: () => void;
};

const OPEN_DATA_URL = "https://dati.istruzione.it/opendata/opendata/catalogo/elements1/?area=Scuole";

const InfoDialog = ({ open, toggle }: InfoDialogProps) => {
  return (
    <Dialog maxWidth="lg" onClose={toggle} open={open}>
      <DialogTitle>Cattedre Lombardia 2024</DialogTitle>
      <DialogContent>
        <Typography>
          Questo sito è basato su{" "}
          <a href={OPEN_DATA_URL} target="_blank">
            Open Data
          </a>{" "}
          del Ministero dell&apos;Istruzione e del merito.
        </Typography>
        <Typography variant="overline">Attribuzione mappe:</Typography>
        <br />
        <Typography variant="caption">
          © OpenStreetMap contributors Open Database License https://www.openstreetmap.org/copyright
        </Typography>
        <br />
        <Typography variant="caption">Who's On First CC0 https://www.whosonfirst.org/docs/licenses/</Typography>
        <br />
        <Typography variant="caption">© OpenAddresses contributors BSD-3-Clause License</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default InfoDialog;
