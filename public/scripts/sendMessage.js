window.onload = function () {
  const contact = document.getElementById("send-message");
  contact.addEventListener("click", (e) => {
    e.preventDefault();
    const name = document.getElementById("contact-name").value;
    const email = document.getElementById("contact-email").value;
    const message = document.getElementById("conteact-message").value;

    const data = {
      name,
      email,
      message,
    };
    let headers = new Headers();
    headers.append("Accept", "Applocation/JSON");
    headers.append("Content-type", "application/json; charset=UTF-8");

    let req = new Request(`/contact`, {
      method: "POST",
      headers,
      mode: "cors",
      body: JSON.stringify(data),
    });
    fetch(req)
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        window.FlashMessage.success("Seccess Fully Message Send");
        //   create the input field empty
        document.getElementById("contact-name").value = "";
        document.getElementById("contact-email").value = "";
        document.getElementById("conteact-message").value = "";
      })
      .catch((err) => {
        window.FlashMessage.error("There is an error");
      });
  });
};
