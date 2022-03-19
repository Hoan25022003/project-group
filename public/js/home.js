$("btn-out").on("click", function () {

  $.ajax({
    url: "/user/logout",
    type: "PUT",
  })
    .then(function (data) {
      document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      console.log(8, data);
      window.location.href = "/Home";
    })
    .catch(function (err) {
      console.log(err);
    });
});
