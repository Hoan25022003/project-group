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

$(".updateclick").on("click", function (event) {
  let updateName = $(this).parent().siblings().eq(0).html();
  let updateDate = $(this).parent().siblings().eq(1).html();
  id = $(this).attr("id-task");
  $("#name-up").val(updateName);
  $("#deadline-up").val(updateDate);
  console.log(updateDate);
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

$(".removebtn").on("click", function () {
  let a = $(this).attr("id-task");
  $.ajax({
    url: "/todo/" + a,
    type: "DELETE",
    data: {
      id: a,
    },
  })
    .then(function (data) {
      console.log(data);
      window.location.reload();
    })
    .catch(function (err) {
      console.log(err);
    });
});
