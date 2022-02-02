import type { NextPage } from "next";
import axios from "axios";
import Content from "../Components/Content/Content";
import { TopMovie } from "../Type/Type";
interface OwnProps {
  hasError: boolean;
  topMovies: TopMovie[];
  chidlren?: React.ReactNode;
}
const Home: NextPage | any = (props: OwnProps) => {
  const { topMovies, hasError } = props;

  return <Content topMovies={topMovies} hasError={hasError} />;
};
export async function getServerSideProps() {
  try {
    const response = await axios.get(
      "https://imdb-api.com/en/API/Top250Movies/k_1raguh4j"
    );
    const res = response.data.items;

    return {
      props: {
        topMovies: res,
        hasError: false,
      },
    };
  } catch (error) {
    return {
      props: {
        topMovies: [],
        hasError: true,
      },
    };
  }
}
export default Home;
