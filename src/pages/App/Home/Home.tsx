import { GET_USERS } from "@/graphql/query/user.query";
import { useLazyQuery } from "@apollo/client";
import { Button } from "@mantine/core";

const HomePage = () => {
  const [callUsersQuery, users] = useLazyQuery(GET_USERS);
  const handleClick = () => {
    callUsersQuery();
  };
  return <Button onClick={handleClick}>Llamar a query</Button>;
};

export default HomePage;
