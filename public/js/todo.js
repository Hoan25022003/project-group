var id = "";
async function add() {
  let name = $("#name").val();
  let status = $("#status").val();
  let deadline = $("#deadline").val();
  if (name && status && deadline) {
    try {
      const res = await $.ajax({
        url: "/todo",
        type: "POST",
        data: { name, status, deadline },
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  } else {
    alert("hay dien du thong tin");
  }
}

$(".updateclick").on("click", function () {
  console.log(this);
  id = $(this).attr("id-task");
  console.log(12, id);
});
function updateTodo() {
  const newname = $("#name-up").val();
  const newstatus = $("#status-up").val();
  const newdeadline = $("#deadline-up").val();
  console.log(id);
  $.ajax({
    url: "/todo/update/" + id,
    type: "PUT",
    data: {
      name: newname,
      status: newstatus,
      deadline: newdeadline,
    },
  })
    .then(function (data) {
      console.log(data);
      window.location.reload();
    })
    .catch(function (err) {
      console.log(err);
    });
}
