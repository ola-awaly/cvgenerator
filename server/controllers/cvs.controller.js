const cvRepository = require('../repositories/cvs.repository');
const path = require('path');

exports.getAll = (req, res, next) => {
	cvRepository
		.getAll(req.query.page, req.query.limit, req.query.sortby)
		.then((datas) => {
			if (datas)
				datas.rows = datas.rows.map((el) => {
					if (el.photo) el.photo = process.env.CUR_HOST + el.photo;
					if (el.pdf) el.pdf = process.env.CUR_HOST + el.pdf;
					return el;
				});
			res.json(datas);
		});
};

exports.getOne = (req, res, next) => {
	cvRepository.getOne(req.params.id).then((data) => {
		if (data) {
			if (data.photo) data.photo = process.env.CUR_HOST + data.photo;
			if (data.pdf) data.pdf = process.env.CUR_HOST + data.pdf;
			res.json(data.toJSON());
		} else res.status(404).send({ message: 'not found' });
	});
};

exports.getFullOne = (req, res, next) => {
	cvRepository.getFullOne(req.params.id).then((data) => {
		console.log(data);
		//    if(data)
		//        res.json(data.toJSON())
		//    else
		//        res.status(404).send({message:'not found'})
	});
};
exports.duplicate = (req, res, next) => {
	cvRepository.duplicate(req.params.id).then((data) => {
		console.log(data);
		if (data) res.json(data);
		else res.status(404).send({ message: 'not found' });
	});
};

exports.new = (req, res, next) => {
	cvRepository
		.new(req.body)
		.then((datas) => {
			res.status(201).json(datas);
		})
		.catch((err) => {
			res.status(400).send(err.errors);
		});
};

exports.update = (req, res, next) => {
	cvRepository
		.update(req.params.id, req.body)
		.then((data) => res.json({ updated: data[0] }))
		.catch((err) => {
			res.status(400).send(err.errors);
		});
};

exports.delete = (req, res, next) => {
	cvRepository
		.delete(req.params.id)
		.then((data) => res.json({ deleted: data }));
};

exports.setPhoto = (req, res, next) => {
	console.log('set photo');
	//const photo = JSON.parse(req.body.photo);
	let imageUrl = `/images/${req.file.filename}`;
	console.log(imageUrl);
	cvRepository
		.setPhoto(req.params.id, imageUrl)
		.then((data) => {
			imageUrl = process.env.CUR_HOST + imageUrl;
			res.json({ imageUrl: imageUrl });
		})
		.catch((err) => {
			res.status(400).send(err.errors);
		});
};
exports.setPhoto64 = (req, res, next) => {
	console.log('set photo64');
	//const photo = JSON.parse(req.body.photo);
	let imageUrl = req.uploadedImg;
	console.log(imageUrl);
	cvRepository
		.setPhoto(req.params.id, imageUrl)
		.then((data) => {
			imageUrl = process.env.CUR_HOST + imageUrl;
			res.json({ imageUrl: imageUrl });
		})
		.catch((err) => {
			console.log(err);
			res.status(400).send(err.errors);
		});
};
exports.setPdf = (req, res, next) => {
	console.log('set pdf controller' + req.uploadedPdf);
	let pdfUrl = req.uploadedPdf;
	console.log(pdfUrl);
	cvRepository
		.setPdf(req.params.id, pdfUrl)
		.then((data) => {
			pdfUrl = process.env.CUR_HOST + pdfUrl;
			res.json({ pdfUrl: pdfUrl });
		})
		.catch((err) => {
			console.log(err);
			res.status(400).send(err.errors);
		});
};
exports.getByUserId = (req, res, next) => {
	cvRepository
		.getByUserId(
			req.params.id,
			req.query.page,
			req.query.limit,
			req.query.sortby
		)
		.then((data) => {
			if (data)
				data.rows = data.rows.map((el) => {
					if (el.photo) el.photo = process.env.CUR_HOST + el.photo;
					if (el.pdf) el.pdf = process.env.CUR_HOST + el.pdf;
					return el;
				});
			res.json(data);
		});
};

exports.sendByMail = (req, res, next) => {
	cvRepository.getOne(req.params.id).then((data) => {
		if (data && data.pdf) {
			let toEmail = req.body.toEmail;
			let subject = req.body.subject;
			let message = req.body.message;
			console.log('dans send email');
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
				attachments: [
					{
						filename: `cv.pdf`,
						path: path.join(__dirname, `../${data.pdf}`),
						contentType: 'application/pdf',
					},
				],
			};

			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					console.log({ Erreeeeuuuur: error });
					res.status(400).send(error);
				} else {
					console.log('Email sent: ' + info.response);
					res.json({ sent: 1 });
				}
			});
		} else res.status(404).send({ message: 'not found' });
	});
};
