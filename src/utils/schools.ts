import schools from "../../data/miur-db-lom.json";

export type School = {
  "@id": string;
  "miur:ANNOSCOLASTICO": number;
  "miur:AREAGEOGRAFICA": string;
  "miur:CAPSCUOLA": number;
  "miur:CODICECOMUNESCUOLA": string;
  "miur:CODICEISTITUTORIFERIMENTO": string;
  "miur:CODICESCUOLA": string;
  "miur:DENOMINAZIONEISTITUTORIFERIMENTO": string;
  "miur:DENOMINAZIONESCUOLA": string;
  "miur:DESCRIZIONECARATTERISTICASCUOLA": string;
  "miur:DESCRIZIONECOMUNE": string;
  "miur:DESCRIZIONETIPOLOGIAGRADOISTRUZIONESCUOLA": string;
  "miur:INDICAZIONESEDEDIRETTIVO": string;
  "miur:INDICAZIONESEDEOMNICOMPRENSIVO": string;
  "miur:INDIRIZZOEMAILSCUOLA": string;
  "miur:INDIRIZZOPECSCUOLA": string;
  "miur:INDIRIZZOSCUOLA": string;
  "miur:PROVINCIA": string;
  "miur:REGIONE": string;
  "miur:SEDESCOLASTICA": string;
  "miur:SITOWEBSCUOLA": string;
};

export const extractComoSchools = () => {
  return schools;
};
