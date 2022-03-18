$.ajax({
  url: "/user/portfolio",
  type: "GET",
})
  .then((data) => {
    let today = new Date();
    let date = new Date(data.date.split("/").reverse().join("/"));
    let age;
    if (
      date.getMonth() < today.getMonth() ||
      (date.getMonth() == today.getMonth() && today.getDate() >= date.getDate())
    ) {
      age = today.getFullYear() - date.getFullYear();
    } else {
      age = today.getFullYear() - date.getFullYear() - 1;
    }
    const htmls = `
        <img src="${data.avatar}" alt="" />
        <p>Username : ${data.username}</p>
        <p>Sex : ${data.sex}</p>
        <p>Date : ${data.date}</p>
        <p>Age : ${age}</p>
        <p>Address : ${data.address}</p>
        <p>School : ${data.school}</p>
        `;
    $("#info").append(htmls);
  })
  .catch((err) => console.log(err));
