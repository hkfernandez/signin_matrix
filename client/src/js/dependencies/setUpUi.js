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

  const page = window.location.pathname;
  console.log("page", page);
  if (page === "/quotes") {
    const { loginInfo } = elements();
    console.log("loginInfo.textContent", loginInfo.textContent);
    if (!loginInfo.textContent) {
      console.log("hiding elements");
      const adminElements = document.getElementsByClassName("admin");
      console.log(adminElements);
      Array.from(adminElements).forEach((element) => {
        element.classList.add("hidden");
      });
    }
  }
}
