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
