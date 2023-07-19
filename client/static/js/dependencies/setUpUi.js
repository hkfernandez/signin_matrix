export function setUpUi(userInfo) {
  const elements = () => {
    return {
      adminElements: document.getElementsByClassName("admin"),
      loginInfo: document.getElementById("loginInfo"),
    };
  };

  function extractUserName(email) {
    const ampersandLocation = email.indexOf("@");
    return email.slice(0, ampersandLocation);
  }

  const { loginInfo } = elements();
  console.log("setting up ui with : ", userInfo);
  if (userInfo) {
    console.log("adding logged in user information");
    loginInfo.innerHTML =
      `Hi ${extractUserName(userInfo.email)}! ` + "&#128512";
    loginInfo.style.display = "block";
  } else {
    loginInfo.style.display = "none";
  }
}
