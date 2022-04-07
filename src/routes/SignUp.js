import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
//import { signup } from "../service/ApiService";
import AxiosService from "../service/AxiosService";

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const userDTO = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
    };

    AxiosService.signUp(userDTO).then((response) => {
      // 회원가입 완료 후 로그인 페이지로 리다이렉트
      window.location.href = "/login";
    });
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5">
              계정 생성
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="사용자 이름"
              id="username"
              name="username"
              autoComplete="fname"
              variant="outlined"
              required
              fullWidth
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="이메일 주소"
              id="email"
              name="email"
              autoComplete="email"
              variant="outlined"
              required
              fullWidth
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="패스워드"
              type="password"
              id="password"
              name="password"
              autoComplete="password"
              variant="outlined"
              required
              fullWidth
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              계정 생성
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="flex-end"
          style={{ marginTop: "0.4rem" }}
        >
          <Grid item>
            <Link to="/login" variant="body2">
              이미 계정이 있나요? 로그인 하세요.
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
