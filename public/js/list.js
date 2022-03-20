async function addList() {
  const listName = $("#listName").val();
  const color = $("#color").val();
  console.log(color);
  try {
    await $.ajax({
      url: "/list",
      type: "POST",
      data: {
        listName: listName,
        color: color,
      },
    });
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

async function deleteList(id) {
  try {
    await $.ajax({
      type: "DELETE",
      url: "/list/" + id,
    });
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}
