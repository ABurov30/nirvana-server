'use strict'
const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const arr = []
		for (let i = 0; i < 100; i++) {
			arr.push({
				nickname: faker.person.fullName(),
				email: faker.internet.email(),
				hashpass: faker.internet.password()
			})
		}

		await queryInterface.bulkInsert('Users', arr, {})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Users', null, {})
	}
}
