import styled from "styled-components";

export const HomePageWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 39%;
  transform: translateX(-50%);
  color: ghostwhite;
  font-size: 30px;
  font-weight: bold;

`;

export const Home = () => {
  return (
    <>
      <img
        src="./images/home-page.png"
        alt="home-page"
        width="100%"
        height="100%"
        style={{"opacity":"0.6"}}

      />
      <HomePageWrapper>
        “Every act of conscious learning requires the willingness to suffer an
        injury to one's self-esteem. That is why young children, before they are
        aware of their own self-importance, learn so easily.”
      </HomePageWrapper>
    </>
  );
};
export default Home;
