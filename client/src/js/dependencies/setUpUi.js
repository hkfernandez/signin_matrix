export function setUpUi(userPermissions) {
  console.log("userPermissions: ", userPermissions);
  const elements = () => {
    return {
      adminElements: document.getElementsByClassName("admin"),
      signedInUsername: document.getElementById("signedInUsername"),
      signOutBtn: document.getElementById("signOutBtn"),
    };
  };

  const page = window.location.pathname;
  if (page === "/quotes") {
    const { signedInUsername } = elements();
    if (!signedInUsername.textContent) {
      const adminElements = document.getElementsByClassName("admin");
      Array.from(adminElements).forEach((element) => {
        element.classList.add("hidden");
      });
    }
  }
}
