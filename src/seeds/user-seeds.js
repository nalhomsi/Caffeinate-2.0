const { User } = require('../models');

const userData = [
	{
		username: 'ddaveren0',
		email: 'jbeyer0@jigsy.com',
		hashedPassword: 'Hc1tsfT',
	},
	{
		username: 'kbeccera1',
		email: 'flamball1@paginegialle.it',
		hashedPassword: 'guJT7yaKTi6',
	},
	{
		username: 'ggladdin2',
		email: 'agot2@weather.com',
		hashedPassword: 'yAQ5a2Pz9O',
	},
	{
		username: 'vfolomkin3',
		email: 'lcutting3@sina.com.cn',
		hashedPassword: 'fvyrWpCOI',
	},
	{
		username: 'josharry4',
		email: 'jpeye4@theglobeandmail.com',
		hashedPassword: 'r8x9UyBF',
	},
	{
		username: 'clydiatt5',
		email: 'hpaulisch5@drupal.org',
		hashedPassword: 'WuwOANn',
	},
	{
		username: 'mluscombe6',
		email: 'dburkett6@rediff.com',
		hashedPassword: 'SaZsXLYo',
	},
	{
		username: 'gbunford7',
		email: 'cbenes7@hubpages.com',
		hashedPassword: 'tqlIjbMSI',
	},
	{
		username: 'lharyngton8',
		email: 'rmafham8@uol.com.br',
		hashedPassword: '2agFdveZ',
	},
	{
		username: 'dhuish9',
		email: 'jleonard9@cpanel.net',
		hashedPassword: 'wV3YRlKTbim',
	},
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
