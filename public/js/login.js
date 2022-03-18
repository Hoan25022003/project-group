function isLogined() {
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
        console.log(data);
        window.location.href = "/Home";
      })
      .catch((err) => {
        if ($(".result").text().length == 0) {
          $(".result").text(err.responseJSON.message);
        }
      });
  }
}

document.onkeydown = function (e) {
  if (e.key === "Enter") {
    isLogined();
  }
};
