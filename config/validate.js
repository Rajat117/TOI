module.exports = {
  validateUser: function(user, body, errors, code, cb) {
    const { email, username, pwd1, pwd2, phone, checkbox1 } = body;
    if (user) {
      // errors.push({ msg: "That Email Is Already Registered" });
      code.push("er1");
    }
    if (!username) {
      // errors.push({ msg: "Full Name Must Be Supplied" });
      code.push("er2");
    }
    if (pwd2.length < 6 || pwd1.length < 6) {
      // errors.push({ msg: "Password must be at least 6 characters" });
      code.push("er3");
    }
    if (pwd1 != pwd2) {
      // errors.push({ msg: "Password Not Matched" });
      code.push("er4");
    }
    if (phone.length < 10) {
      // errors.push({ msg: "Phone must be at least 10 characters" });
      code.push("er5");
    }
    if (checkbox1 === undefined) {
      // errors.push({ msg: "Please Accept Terms And Conditions" });
      code.push("er6");
    }
    cb();
  }
};
