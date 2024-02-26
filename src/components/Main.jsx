import { Header } from "./Header";
import { News } from "./News";
export const Main = ({ token }) => {
  return (
    <>
      <Header token={token} />
      <News token={token} />
    </>
  );
};
