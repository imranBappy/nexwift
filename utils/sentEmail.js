const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(to, data) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "imranbappy.official@gmail.com",
      pass: "lyvbydklyqrfzvxu",
    },
  });

  var mailOptions = {
    from: "imranbappy.official@gmail.com",
    to: to,
    subject: "New Submission!",

    html: `
         <h1>Hi Admin</h1>
          <p>You have a new submission with the following details...</p>
          <ul>
            <li>Name: ${data.name}</li>
            <li>Email: ${data.email}</li>
            <li>Message: ${data.message}</li>
          </ul>
          
          <h3>Thanks</h3>
          <h3>Imran Bappy</h3>
          <h3>Web Developer</h3>
          <h3>
            <a href="https://imranbappy.netlify.app">imranbappy.netlify.app</a>
          </h3>
       

    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = sendEmail;
