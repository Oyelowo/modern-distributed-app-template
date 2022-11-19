import { createStyles } from "@mantine/core";

export const useStyles = createStyles((t) => ({
  root: { height: "100%", display: "block" },
  tableContainer: {
    display: "block",
    overflow: "auto",
    "& > table": {
      "& > thead": { backgroundColor: t.colors.gray[0], zIndex: 1 },
      "& > thead > tr > th": { padding: t.spacing.md },
      "& > tbody > tr > td": { padding: t.spacing.md },
    },
  },
  stickHeader: { top: 0, position: "sticky" },
  sortableHeader: { "&:hover": { backgroundColor: t.colors.gray[2] } },
  disableSortIcon: { color: t.colors.gray[5] },
  sortDirectionIcon: { transition: "transform 200ms ease" },
}));
