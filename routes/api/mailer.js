const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY, url:"https://api.mailgun.net" });

const sendVerificationEmail = async (userEmail, verificationToken) => {
    const msg = mg.messages.create('sandbox4990f884f2ba4e7bba7924620a871413.mailgun.org', {
	from: "mailgun@sandbox4990f884f2ba4e7bba7924620a871413.mailgun.org",
	to: `${userEmail}`,
	subject: "Email verification",
	text: "For verification your email please click link below :",
	html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Verify your email </a>`
})
.then(msg => console.log(msg))
.catch(err => console.log(err));
};

module.exports = {sendVerificationEmail};