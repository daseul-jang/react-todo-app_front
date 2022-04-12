import { AppBar, Button, Grid, Toolbar, Typography } from "@material-ui/core";
import AxiosService from "../service/AxiosService";

export default function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography variant="h6">오늘의 할 일</Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="body2"
              style={{ display: "inline-block", padding: "6px 8px" }}
            >
              {`${localStorage.getItem("USER_NAME")} 님`}
            </Typography>
            <Button color="inherit" onClick={AxiosService.signOut}>
              <Typography variant="body2">로그아웃</Typography>
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
