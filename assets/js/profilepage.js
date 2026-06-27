let userInfo = localStorage.getItem("user");

userInfo = JSON.parse(userInfo);

for (let key in userInfo) {
  let element = document.getElementById(key);
  element.textContent = userInfo[key];
}
