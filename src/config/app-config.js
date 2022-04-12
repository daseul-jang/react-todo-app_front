let backendHost;
const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
  // 백엔드 서버 포트 (톰캣)
  backendHost = process.env.REACT_APP_BASE_URL;
}

export const API_BASE_URL = `${backendHost}`;