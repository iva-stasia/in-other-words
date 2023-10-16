import {
  BookRounded,
  CollectionsBookmarkRounded,
  SchoolRounded,
  TrendingUpRounded,
} from "@mui/icons-material";

const pages = [
  {
    title: "Dictionary",
    icon: <BookRounded />,
    path: "/",
  },
  {
    title: "Word sets",
    icon: <CollectionsBookmarkRounded />,
    path: "/word-sets",
  },
  {
    title: "Study",
    icon: <SchoolRounded />,
    path: "/study",
  },
  {
    title: "My progress",
    icon: <TrendingUpRounded />,
    path: "/my-progress",
  },
];

export { pages };
