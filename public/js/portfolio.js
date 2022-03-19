$.ajax({
  url: "/user/portfolio",
  type: "GET",
})
  .then((data) => {
    console.log(data);
    let today = new Date();
    let date = new Date(data.date.split("/").reverse().join("/"));
    let age;
    if (
      date.getMonth() < today.getMonth() ||
      (date.getMonth() == today.getMonth() && today.getDate() >= date.getDate())
    ) {
      age = today.getFullYear() - date.getFullYear();
    } else {
      age = today.getFullYear() - date.getFullYear() - 1;
    }
    const htmls = `
        
        <p class="username">My name : ${data.username}</p>
        <p>Sex : ${data.sex}</p>
        <p>Date : ${data.date}</p>
        <p>Age : ${age}</p>
        <p>Address : ${data.address}</p>
        `;
    $("#info").append(htmls);
    $(".avata").append(`
    <div class="user-img"><img src="${data.avatar}" alt="" /></div>
    <div class="user-name">${data.username}</div>
    `);
    if (data.intro == undefined) {
      $(".introduce-detail").append("input something");
    } else {
      $(".introduce-detail").append(`${data.intro}`);
    }
  })
  .catch((err) => console.log(err));

$(".avata").on("click", function () {
  $(".avata-modal").css({ display: "block" });
});

async function uploads() {
  try {
    const form = $("form")[0];
    const formData = new FormData(form);
    const res = await $.ajax({
      type: "PUT",
      url: "/user/profile",
      data: formData,
      contentType: false,
      processData: false,
    });
    console.log(res);
    window.location.href = "/Portfolio";
  } catch (error) {
    console.log(error);
  }
}

$(".cancel-upload").on("click", function () {
  $(".avata-modal").css({ display: "none" });
});
$(".cancel-change").on("click", function () {
  $(".change-pass-modal").css({ display: "none" });
});
$(".cancel-intro").on("click", function () {
  $(".edit-intro-modal").css({ display: "none" });
});

$(".show-btn").on("click", function () {
  $(".change-pass-modal").css({ display: "block" });
});

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

$(".edit-intro").on("click", function () {
  $(".edit-intro-modal").css({ display: "block" });
});

async function changeIntro() {
  try {
    await $.ajax({
      type: "PUT",
      url: "/user/createintro",
      data: {
        intro: $("textarea").val(),
      },
    });
    window.location.href = "/Portfolio";
  } catch (error) {
    console.log(error);
  }
}
