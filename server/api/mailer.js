import express from 'express';
import mailer from 'nodemailer';


var smtpTransport = mailer.createTransport("SMTP",{
					service: "Gmail",
					auth: {
						user: "nailletine.lajoie19@gmail.com",
						pass: ""
					}
				});


        var mail = {
  					from: "nailletine.lajoie19@gmail.com",
  					to: "davidveiga.pereira@gmail.com",
  					subject: "mailtest",
  					html: "leCorpsDeVotreMessageEnHTML",
            attachments: [
						{
						  filePath: 'leCheminDuFichierAEnvoyer'
						},
					]
				}; 
  				};
