async function signUp() {
  try {
    $(".result").html("");
    const username = $("#username").val().trim();
    const sex = $("#sex").val();
    const date = $("#date").val().split("-").reverse().join("/");
    const address = $("#address").val().trim();
    const password = $("#password").val();
    const confirmPassword = $("#confirm-password").val();
    if (
      username == "" ||
      date == "" ||
      address == "" ||
      password == "" ||
      confirmPassword == ""
    ) {
      $(".result").text("Vui lòng nhập đầy đủ thông tin");
    } else {
      if (password !== confirmPassword) {
        $(".result").text("Mật khẩu phải được trùng khớp");
      } else if (password.length < 6) {
        $(".result").text("Mật khẩu phải có tối thiểu 6 kí tự");
      } else {
        await $.ajax({
          url: "/user/creat",
          type: "POST",
          data: {
            username: username,
            sex: sex,
            date: date,
            address: address,
            password: password,
          },
        });
        window.location.href = "/Login";
      }
    }
  } catch (err) {
    $(".result").text(err.responseJSON.message);
  }
}

document.onkeydown = async (e) => {
  if (e.key === "Enter") {
    signUp();
  }
};
