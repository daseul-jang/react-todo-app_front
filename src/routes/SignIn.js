import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import AxiosService from "../service/AxiosService";
import { loginAlert } from "../swal";

export default function SignIn(props) {
  // 로그인 submit
  const handleSubmit = (event) => {
    // 기본 form 이벤트를 막아 새로고침 방지
    event.preventDefault();

    const data = new FormData(event.target);
    const userDTO = {
      email: data.get("email"),
      password: data.get("password"),
    };

    AxiosService.emailCheck(userDTO.email).then((response) =>
      response.data
        ? AxiosService.signIn(userDTO)
        : loginAlert("error", "존재하지 않는 아이디입니다.")
    );
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h5" style={{ marginBottom: "10px" }}>
            로그인
          </Typography>
        </Grid>
      </Grid>
      <form noValidate onSubmit={handleSubmit}>
        {" "}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="이메일 주소"
              id="email"
              name="email"
              autoComplete="email"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="패스워드"
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              로그인
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center">
              <Link to="/signup" variant="body2">
                계정이 없나요? 여기를 눌러 가입 하세요.
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
