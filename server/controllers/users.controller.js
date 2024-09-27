const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const { google } = require('googleapis');
//const config=require('../config/auth.config')
const userRepository = require('../repositories/users.repository');

exports.getAll = (req, res, next) => {
	userRepository
		.getAll(req.query.page, req.query.limit, req.query.sortby)
		.then((datas) => {
			res.json(datas);
		});
};

exports.getOne = (req, res, next) => {
	userRepository.getOne(req.params.id).then((data) => {
		if (data) res.json(data.toJSON());
		else res.status(404).send({ message: 'not found' });
	});
};

exports.new = (req, res, next) => {
	userRepository
		.new(req.body)
		.then((datas) => {
			res.status(201).json(datas);
		})
		.catch((err) => {
			console.log('dans controlller user');
			console.log({ err: err });
			if (err.errors) res.status(400).send(err.errors);
			else res.status(400).send(err);
		});
};

exports.update = (req, res, next) => {
	userRepository
		.update(req.params.id, req.body)
		.then((data) => res.json({ updated: data[0] }))
		.catch((err) => {
			res.status(400).send(err.errors);
		});
};

exports.delete = (req, res, next) => {
	userRepository
		.delete(req.params.id)
		.then((data) => res.json({ deleted: data }));
};

exports.login = (req, res, next) => {
	console.log('dans login controller');
	const RSA_PRIVATE_KEY = process.env.JWTPRIVATEKEY;
	// const RSA_PRIVATE_KEY = fs.readFileSync(
	// 	path.resolve('config/jwt/private.pem')
	// );
	console.log(RSA_PRIVATE_KEY);
	userRepository.login(req.body.email).then((data) => {
		if (data.length) {
			let user = data[0].toJSON();
			console.log(user);
			const isValid = bcrypt.compareSync(req.body.password, user.password);
			if (!isValid) {
				return res.status(401).send({
					accessToken: null,
					message: 'Invalid Password!',
				});
			}
			const jwtBearerToken = jwt.sign(
				{ id: user.id, role: user.role },
				{ key: RSA_PRIVATE_KEY, passphrase: '3allilkoufiye' },
				{
					algorithm: 'RS256',
					expiresIn: 86400 * 5,
					// subject: user.id.toString()
				}
			);
			user.accessToken = jwtBearerToken;
			delete user.password;
			res.json(user);
		} else res.status(404).send({ message: 'user not found' });
		console.log(data);
	});
};

exports.checkEmail = (req, res, next) => {
	userRepository
		.checkEmail(req.params.email)
		.then((data) => {
			if (data) res.json({ exist: 'true' });
			else res.json({ exist: 'false' });
		})
		.catch((err) => {
			console.log(err);
			res.status(400).send(err.errors);
		});
};
// exports.sendEmail=(req,res,next)=>{
//     sendMail('name','awaly.ola@gmail.com')
// }
exports.sendEmail = (req, res, next) => {
	console.log('dans send email');

	var nodemailer = require('nodemailer');

	var transporter = nodemailer.createTransport({
		service: 'gmail',
		port: 587,
		auth: {
			type: 'OAuth2',
			user: 'awaly.ola@gmail.com',

			clientId: process.env.OAUTH_CLIENTID,
			clientSecret: process.env.OAUTH_CLIENT_SECRET,
			refreshToken: process.env.OAUTH_REFRESH_TOKEN,
		},
	});

	var mailOptions = {
		from: 'awaly.ola@gmail.com',
		to: 'awaly.ola@gmail.com',
		subject: 'Sending Email using Node.js',
		text: 'That was easy!',
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log({ Erreeeeuuuur: error });
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
};

exports.resetPassword = (req, res, next) => {
	console.log('resetPassword controller');
	userRepository
		.resetPassword(req.params.id, req.body)
		.then((data) => res.json({ updated: data[0] }))
		.catch((err) => {
			res.status(400).send(err.errors);
		});
};
exports.resetPasswordByToken = (req, res, next) => {
	console.log('resetPasswordByToken controller');
	userRepository
		.checkRandomToken(req.body.token)
		.then((data) => {
			console.log(data);
			if (data) {
				user = data.toJSON();
				dateToken = user.tokenForgetPasswordDate;
				let d = new Date(dateToken);
				let current = new Date();
				console.log({ expiration: d.getTime() + 86400000 });
				console.log({ auj: current.getTime() });
				if (d.getTime() + 86400000 > current.getTime())
					userRepository
						.resetPassword(user.id, req.body)
						.then((d) => {
							res.json({ updated: d[0] });
						})
						.catch((err) => {
							res.status(400).send(err.errors);
						});
				else res.status(403).send({ message: 'Token not valid' });
			} else res.status(403).send({ message: 'Token not valid' });
		})
		.catch((err) => {
			res.status(400).send(err.errors);
		});
};
exports.sendEmailForgetPassword = (req, res, next) => {
	let token = uuidv4();
	userRepository
		.setRandomToken(req.body.email, token)
		.then((data) => {
			if (data[0] == 1) {
				console.log('set suceeded');
				let toEmail = req.body.email;
				let link = req.body.link + '/' + token;
				let subject = 'Modifiez votre mot de passe';
				let message =
					"<p>Bonjour, Veuillez utilisez ce lien pour modifiez votre mot de passe:<a href='" +
					link +
					"'>Lien</a></p>";
				console.log({ email: toEmail, subject: subject, message: message });
				var nodemailer = require('nodemailer');
				var transporter = nodemailer.createTransport({
					service: 'gmail',
					port: 587,
					auth: {
						type: 'OAuth2',
						user: process.env.MAIL_USERNAME,
						clientId: process.env.OAUTH_CLIENTID,
						clientSecret: process.env.OAUTH_CLIENT_SECRET,
						refreshToken: process.env.OAUTH_REFRESH_TOKEN,
					},
				});
				var mailOptions = {
					from: 'awaly.ola@gmail.com',
					to: toEmail,
					subject: subject,
					html: message,
				};

				transporter.sendMail(mailOptions, function (error, info) {
					if (error) {
						console.log({ Erreeeeuuuur: error });
						res.json({ sent: 0 });
					} else {
						console.log('Email sent: ' + info.response);
						res.json({ sent: 1 });
					}
				});
			} else res.json({ sent: 0 });
		})
		.catch((err) => {
			res.status(400).send(err.errors);
		});
	// générer token: uuid fait l'affaire
};

exports.checkRandomToken = (req, res, next) => {
	console.log('dans check random token controller');
	userRepository
		.checkRandomToken(req.body.token)
		.then((data) => {
			console.log(data);
			if (data) {
				user = data.toJSON();
				dateToken = user.tokenForgetPasswordDate;
				let d = new Date(dateToken);
				let current = new Date();
				console.log({ expiration: d.getTime() + 86400000 });
				console.log({ auj: current.getTime() });
				if (d.getTime() + 86400000 > current.getTime())
					res.status(200).json(data);
				else res.json({ valid: 0 });
			} else res.json({ valid: 0 });
		})
		.catch((err) => {
			res.status(400).send(err.errors);
		});
};
