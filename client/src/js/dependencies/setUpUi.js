export function setUpUi(userInfo) {
  const elements = () => {
    return {
      adminElements: document.getElementsByClassName("admin"),
      loginInfo: document.getElementById("loginInfo"),
      signOutBtn: document.getElementById("signOutBtn"),
    };
  };

  function extractUserName(email) {
    const ampersandLocation = email.indexOf("@");
    return email.slice(0, ampersandLocation);
  }

  const { loginInfo, signOutBtn } = elements();
  if (userInfo) {
    loginInfo.innerText = `Hi ${extractUserName(userInfo.email)}!`;
    loginInfo.style.display = "block";
    signOutBtn.style.display = "block";
  } else {
    loginInfo.innerText = "";
    loginInfo.style.display = "none";
    signOutBtn.style.display = "none";
  }
}
