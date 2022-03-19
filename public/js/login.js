function isLogined() {
  $(".result").html("");
  const username = $("#username").val().trim();
  const password = $("#password").val();
  $(".result").html("");
  if (username == "" || password == "") {
    $(".result").text("Vui lòng điền đầy đủ thông tin");
  } else {
    $.ajax({
      type: "POST",
      url: "/user/login",
      data: {
        username: username,
        password: password,
      },
    })
      .then((data) => {
        window.location.href = "/Home";
      })
      .catch((err) => {
        $(".result").text(err.responseJSON.message);
      });
  }
}

document.onkeydown = function (e) {
  if (e.key === "Enter") {
    isLogined();
  }
};
