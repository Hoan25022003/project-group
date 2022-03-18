async function add() {
  const username = $("#username").val();
  const school = $("#school").val();
  const address = $("#address").val();
  try {
    const res = await $.ajax({
      url: "/user/creat",
      type: "POST",
      data: {
        username: username,
        school: school,
        address: address,
      },
    });
    $(".list").html("");
    $(".list").html(res);
  } catch (error) {
    console.log(error);
  }
}

async function removeUser(id) {
  try {
    const res = await $.ajax({
      type: "DELETE",
      url: `/user/${id}`,
    });
    $(".list").html("");
    $(".list").html(res);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}
