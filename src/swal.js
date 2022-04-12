import Swal from "sweetalert2";

const config = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: false,
  showCloseButton: true,
});

const success = (msg) => {
  config.fire({
    icon: "success",
    title: `${msg}되었습니다.`,
  });
};

export const Toast = {
  success,
};

export const loginAlert = (state, text) => {
  Swal.fire({
    icon: state,
    text: text,
  });
};



