export default {
  jwt: {
    secretOrKey: process.env.JWT_SECRET_KEY,
    expiresIn: 86400,
  },
  // You can also use any other email sending services
  mail: {
    service: {
      host: 'smtp.sendgrid.net',
      port: 587,
      secure: false,
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY,
    },
    senderCredentials: {
      name: 'Find My Masters',
      email: 'picolo@ku.edu.tr',
    },
  },

  // these are used in the mail templates
  project: {
    name: 'Find My Masters',
    address: 'Rumelifeneri Road, Koc University',
    logoUrl: 'https://avatars.githubusercontent.com/u/92540527?s=200&v=4',
    slogan: 'Made with ❤️ in Istanbul',
    color: '#123456',
    socials: [['GitHub', 'https://github.com/PicoloGroup']],
    url: 'http://localhost:3000',
    mailVerificationUrl: 'http://localhost:3000/auth/verify',
    mailChangeUrl: 'http://localhost:3000/auth/change-email',
    resetPasswordUrl: 'http://localhost:3000/reset-password',
    termsOfServiceUrl: 'http://localhost:3000/legal/terms',
  },
};
