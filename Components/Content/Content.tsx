import * as React from "react";
import MovieCard from "../MovieCard/MovieCard";
import { Movie, TopMovie } from "../../Type/Type";
import { Box, Container, Grid } from "@mui/material";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { MovieContext } from "../../Services/MovieContext";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: 20,
  p: 4,
  display: "flex",
  ".pt1": {
    width: "60%",
    height: "100%",
    color: "gray",
    fontSize: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  ".pt2": {
    width: "40%",
    height: "100%",
    objectFit: "contain",
  },
};

interface OwnProps {
  topMovies: TopMovie[];
  hasError: boolean;
}
const Content = (props: OwnProps) => {
  const { topMovies, hasError } = props;

  const value = React.useContext(MovieContext);
  const [open, setOpen] = React.useState(false);
  const [modalMovie, setModalMovie] = React.useState<Movie | null>(null);
  const [load, setLoad] = React.useState(false);
  const [id, setId] = React.useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const showModal = async (id: string) => {
    setId(id);
    handleOpen();
  };

  React.useEffect(() => {
    setLoad(true);
    axios
      .get(`https://imdb-api.com/API/Search/k_1raguh4j/${id}`)
      .then((res) => res.data.results[0])
      .then((response) => setModalMovie(response))
      .catch((e) => console.log(e))
      .finally(() => setLoad(false));
  }, [id]);

  const data =
    !hasError && !value.error && value.movie ? value.movie : topMovies;

  return (
    <Container>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
        >
          <Fade in={open}>
            <Box sx={style}>
              {load ? (
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  <Box className="pt1">
                    <Box sx={{ fontWeight: "bold" }}>
                      Title : {modalMovie ? modalMovie.title : ""}
                    </Box>

                    <Box>
                      Year : {modalMovie ? modalMovie.description : ""}
                    </Box>
                    <Box>
                      ID : {modalMovie ? modalMovie.id : ""}
                    </Box>
                  </Box>
                  <img
                    className="pt2"
                    src={modalMovie ? modalMovie.image : ""}
                  />
                </>
              )}
            </Box>
          </Fade>
        </Modal>
      </div>
      <Box display="flex" flexWrap="wrap" marginTop="20px">
        {/* response for search and ssr request are not equal it made me use any as item type */}
        {data.map((item: any) => (
          <Grid
            item={true}
            xs={12}
            sm={6}
            md={4}
            key={item.id}
            display="flex"
            justifyContent="center"
            onClick={() => showModal(item.id)}
          >
            <MovieCard item={item} />
          </Grid>
        ))}
      </Box>
    </Container>
  );
};
export default Content;
