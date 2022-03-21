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

function showid() {
  let idcard = $(this).attr("id-task");
  console.log(1212, idcard);
}
function updateTodo() {
  const newname = $("#name-up").val();
  const newstatus = $("#status-up").val();
  const newdeadline = $("#deadline-up").val();
  $.ajax({
    url: "/todo/update/",
  });
}
