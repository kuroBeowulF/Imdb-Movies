import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { TopMovie } from "../../Type/Type";

interface OwnProps {
  item: TopMovie;
}
export default function MovieCard(props: OwnProps) {
  const { item } = props;
  return (
    <Card
      sx={{
        width: 200,
        height: 340,
        margin: 5,
        paddingTop: "5px",
        cursor: "pointer",
        "&:hover": {
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        },
      }}
    >
      <CardMedia
        component="img"
        height="250"
        width="200"
        image={item.image}
        sx={{ objectFit: "contain" }}
        alt="Zzzz!!"
      />
      <CardContent>
        <Typography gutterBottom fontSize="14px" component="div">
          {item.title}
        </Typography>
      </CardContent>
    </Card>
  );
}
