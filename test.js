const bcrypt = require("bcrypt");

const password = "hoan";

// bcrypt
//   .hash(password, Math.random() * 10)
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

bcrypt
  .compare(
    password,
    "$2b$04$sZ3ZTiNvJf9eCz22XHzoUeDwvfFcPHWYFsw3ofO.BlgExb6q6sAMG"
  )
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
