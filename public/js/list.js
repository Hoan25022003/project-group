async function addList() {
  $(".message").html("");
  const listName = $("#listName").val();
  const color = $("#color").val();
  try {
    if (listName == "") {
      $(".message").text("Bạn không được bỏ trống tên List");
    } else {
      await $.ajax({
        url: "/list",
        type: "POST",
        data: {
          listName: listName,
          color: color,
        },
      });
      window.location.reload();
    }
  } catch (error) {
    $(".message").text(error.responseJSON.message);
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

function updateList(id, listName, color) {
  $(".message").html("");
  $("#editListName").val(listName);
  $("#editColor").val(color);
  $("#editBtn").on("click", async () => {
    const newListName = $("#editListName").val();
    const newColor = $("#editColor").val();
    try {
      await $.ajax({
        type: "PUT",
        url: `/list/${id}/update`,
        data: {
          newListName: newListName,
          newColor: newColor,
        },
      });
      window.location.reload();
    } catch (error) {
      $(".message").text(error.responseJSON.message);
    }
  });
}
