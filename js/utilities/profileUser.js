const closeProfileWindow = (parentWindowProfile) =>
  parentWindowProfile.remove();
const closeSession = () => {
  window.location.href = "../server/auth/logout.php";
};

const profileUserWindow = () => {
  const fragment = document.createDocumentFragment();

  const parentWindowprofile = document.createElement("div");
  const divContainerProfile = document.createElement("div");
  const divDecoration = document.createElement("div");
  const containerDataUser = document.createElement("div");
  const textRol = document.createElement("span");
  const containerImageUser = document.createElement("div");
  const textForehead = document.createElement("p");
  const textNameComplete = document.createElement("p");
  const textEmail = document.createElement("p");
  const buttonCloseSession = document.createElement("button");

  parentWindowprofile.setAttribute("id", "parentDiv_closeProfile");
  divContainerProfile.setAttribute("class", "container-profile");
  divDecoration.setAttribute("class", "container-decoration");
  containerImageUser.setAttribute("class", "container-imageUser");
  textForehead.setAttribute("class", "text-forehead");
  textNameComplete.setAttribute("class", "text-nameComplete");
  buttonCloseSession.setAttribute("class", "button-action");

  textRol.textContent = sessionStorage.getItem("rol");
  textForehead.textContent = sessionStorage.getItem("forehead");
  textNameComplete.textContent = `${sessionStorage.getItem(
    "name"
  )} ${sessionStorage.getItem("firstSurname")} ${sessionStorage.getItem(
    "secondSurname"
  )}`;
  textEmail.textContent = sessionStorage.getItem("email");
  buttonCloseSession.textContent = "Cerrar sesión";

  containerDataUser.append(
    textRol,
    containerImageUser,
    textForehead,
    textNameComplete,
    textEmail,
    buttonCloseSession
  );
  divContainerProfile.append(divDecoration, containerDataUser);
  parentWindowprofile.append(divContainerProfile);

  fragment.append(parentWindowprofile);
  document.body.append(fragment);

  divContainerProfile.addEventListener("click", (event) =>
    event.stopPropagation()
  );
  parentWindowprofile.addEventListener("click", () =>
    closeProfileWindow(parentWindowprofile)
  );
  buttonCloseSession.addEventListener("click", () => closeSession());
};

document
  .querySelector(".account-container")
  .addEventListener("click", profileUserWindow);
