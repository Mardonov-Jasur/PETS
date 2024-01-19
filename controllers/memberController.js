let memberController = module.exports;

memberController.home = (req, res) => {
  console.log("GET, request to homepage");
  res.send("welcome to homepage");
};
memberController.signup = (req, res) => {
  console.log("GET, request to signup");
  res.send("welcome to signup");
};
memberController.login = (req, res) => {
  console.log("GET, request to login");
  res.send("welcome to login");
};
memberController.logout = (req, res) => {
  console.log("GET, request to logout");
  res.send("welcome to logout");
};
