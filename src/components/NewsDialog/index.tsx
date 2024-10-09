import { Dialog, DialogContent, DialogTitle, List, ListItem, ListItemText } from "@mui/material";

import newsData from "../../../data/news.json";
import { useMemo } from "react";

type NewsDialogProps = {
  open: boolean;
  toggle: () => void;
};

const NewsDialog = ({ open, toggle }: NewsDialogProps) => {
  const news = useMemo(
    () => newsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [newsData]
  );

  return (
    <Dialog maxWidth="lg" onClose={toggle} open={open}>
      <DialogTitle>Novità</DialogTitle>
      <DialogContent>
        <List>
          {news.map((newsItem) => (
            <ListItem key={newsItem.date}>
              <ListItemText primary={`${newsItem.date} - ${newsItem.title}`} secondary={newsItem.content} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default NewsDialog;
