import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const Nav = (props) => {
  return (
    <>
      <Stack spacing={2} direction="row">
        <Button component={Link} to='/profile'>Profile</Button>
        <Button component={Link} to='/map'>map</Button>
        <Button component={Link} to='/weather'>weather</Button>
        <Button component={Link} to="/">logout</Button>
      </Stack>
    </>
  );
};

export default Nav;
