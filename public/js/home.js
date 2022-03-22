$(".btn-out").on("click", async () => {
  try {
    await $.ajax({
      type: "PUT",
      url: "/user/logout",
    });
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/Login";
  } catch (error) {
    console.log(error);
  }
});
$.ajax({
  url: "/user/portfolio",
  type: "GET",
})
  .then(function (data) {
    let name = data.username;
    $(".username").html(`${name}`);
  })
  .catch(function (err) {
    console.log(err);
  });
