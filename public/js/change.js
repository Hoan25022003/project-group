async function changePassword() {
  try {
    const username = $("#username").val().trim();
    const password = $("#password").val();
    const newPassword = $("#new-password").val();
    const confirmPassword = $("#confirm-password").val();
    if (
      username == "" ||
      password == "" ||
      newPassword == "" ||
      confirmPassword == ""
    ) {
      $(".result").text("Vui lòng điền đầy đủ thông tin");
    } else if (newPassword.length >= 6) {
      if (newPassword === confirmPassword) {
        await $.ajax({
          url: "/user/change-password",
          type: "PUT",
          data: {
            username: username,
            password: password,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
          },
        });
        document.cookie =
          "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/Login";
      } else {
        $(".result").text("Mật khẩu phải được trùng khớp");
      }
    } else {
      $(".result").text("Mật khẩu phải có tối thiểu 6 kí tự");
    }
  } catch (err) {
    $(".result").text(err.responseJSON.message);
  }
}

document.onkeydown = async (e) => {
  if (e.key === "Enter") {
    changePassword();
  }
};
