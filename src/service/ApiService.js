import { API_BASE_URL } from "../app-config";

const ACCESS_TOKEN = "ACCESS_TOKEN";

export function call(api, method, request) {
  let headers = new Headers({
    "Content-type": "application/json",
  });

  // 로컬 스토리지에서 토큰 정보를 가져옴
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  // 토큰이 있으면 헤드에 붙여줌
  if (accessToken && accessToken !== null) {
    headers.append("Authorization", "Bearer " + accessToken);
  }

  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };

  if (request) {
    options.body = JSON.stringify(request);
  }

  // 백엔드 서버와 연결
  return fetch(options.url, options).then((response) =>
    response
      .json()
      .then((json) => {
        // 정상적으로 리스폰스를 받았을 경우 : response.ok === true
        if (!response.ok) {
          // response.ok 가 false 일 경우 에러를 리턴
          return Promise.reject(json);
        }
        return json;
      })
    .catch(() => {
      // 인증되지 않은 사용자면 (로그인 하지 않은 사용자면),
      // login 페이지로 리다이렉트
      if (response.status === 403) {
        window.location.href = "/login";
      }

      return Promise.reject(response);
    })
  );
  /* .catch((error) => {
      console.log(`error : ${error}`);
      console.log(`error.status : ${error.status}`);
      console.log(`error.response : ${error.response}`);
    }); */
}

// 회원가입 메서드
export function signup(userDTO) {
  return call("/auth/signup", "POST", userDTO);
}

// 로그인 메서드
export function signin(userDTO) {
  return call("/auth/signin", "POST", userDTO)
    .then((response) => {
      if (response.token) { // 토큰이 있으면
        // 로컬 스토리지에 토큰을 저장하여 서버로 전달
        localStorage.setItem(ACCESS_TOKEN, response.token);
        localStorage.setItem("USER_NAME", response.username);
        window.location.href = "/"; // 로그인 완료 후 메인 페이지로 리다이렉트
      }
  });
}

// 로그아웃 메서드
export function signout() {
  // 로컬 스토리지에서 토큰을 삭제하면,
  // 서버에 토큰이 전해지지 않기 때문에 로그아웃 된다.
  localStorage.setItem(ACCESS_TOKEN, null);
  localStorage.setItem("USER_NAME", null);
  window.location.href = "/login";  // 로그아웃 완료 후 로그인 페이지로 리다이렉트
 }
