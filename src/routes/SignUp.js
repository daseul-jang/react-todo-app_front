import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import AxiosService from "../service/AxiosService";
import { useRef } from "react";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    AxiosService.signUp(data)
      .then((response) => {
        console.log(`signup onsubmit response ${JSON.stringify(response.data)}`);
        // 회원가입 완료 후 로그인 페이지로 리다이렉트
        window.location.href = "/login";
      })
      .catch((error) => {
        console.log(`signup onsubmit error : ${error.response.data.error}`);
      });
  };

  const blankRemove = (e) => {
    e.target.value = e.target.value.replace(/\s/gi, "");
  };

  const password = useRef();
  password.current = watch("password");

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              {...register("username", {
                required: "이름을 입력해주세요.",
                pattern: {
                  value: /^[a-zA-Z0-9가-힣]+$/,
                  message: "한글, 영어, 숫자만 입력해주세요.",
                },
                minLength: {
                  value: 2,
                  message: "2자 이상 입력해주세요.",
                },
                maxLength: {
                  value: 10,
                  message: "10자를 초과하였습니다.",
                },
              })}
            />
            {errors.username && (
              <Typography variant="body2" className="valid">
                {errors.username.message}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="이메일 주소"
              id="email"
              name="email"
              autoComplete="email"
              variant="outlined"
              fullWidth
              autoFocus
              required
              {...register("email", {
                required: "이메일을 입력해주세요.",
                pattern: {
                  value:
                    /^(([a-zA-Z\d][-_]?){3,20})@([a-zA-z\d.]{3,20})\.([a-z]{2,3})$/,
                  message: "이메일 형식이 맞지 않습니다.",
                },
                validate: {
                  emailChk: (value) =>
                    AxiosService.emailCheck(value).then((response) => {
                      return response.data ? "중복된 이메일입니다." : null;
                    }),
                },
              })}
            />
            {errors.email && (
              <Typography variant="body2" className="valid">
                {errors.email.message}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              onKeyUp={blankRemove}
              label="비밀번호"
              type="password"
              id="password"
              name="password"
              autoComplete="password"
              variant="outlined"
              fullWidth
              autoFocus
              required
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*])[A-Za-z\d~!@#$%^&*]+$/,
                  message: "영문, 숫자, 특수문자를 포함해주세요.",
                },
                minLength: {
                  value: 8,
                  message: "8자 이상 입력해주세요.",
                },
                maxLength: {
                  value: 20,
                  message: "20자까지 입력 가능합니다.",
                },
              })}
            />
            {errors.password && (
              <Typography variant="body2" className="valid">
                {errors.password.message}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              onKeyUp={blankRemove}
              label="비밀번호 확인"
              type="password"
              id="passCheck"
              name="passCheck"
              autoComplete="password"
              variant="outlined"
              fullWidth
              autoFocus
              required
              {...register("passCheck", {
                required: "비밀번호를 한 번 더 입력해주세요.",
                validate: {
                  check: (value) => value === password.current || "비밀번호가 일치하지 않습니다.",
                }
              })}
            />
            {errors.passCheck && (
              <Typography variant="body2" className="valid">
                {errors.passCheck.message}
              </Typography>
            )}
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
