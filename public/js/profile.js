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
