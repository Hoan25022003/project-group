async function addList() {
  const listName = $("#listName").val();
  try {
    const res = await $.ajax({
      url: "/list",
      type: "POST",
      data: {
        listName: listName,
      },
    });
    $(".list").html(res);
  } catch (error) {
    console.log(error);
  }
}

async function deleteList(id) {
  try {
    const res = await $.ajax({
      type: "DELETE",
      url: "/list/" + id,
    });
    $(".list").html(res);
  } catch (error) {
    console.log(error);
  }
}
