'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Images', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			alt_description: {
				type: Sequelize.STRING
			},
			description: {
				type: Sequelize.STRING
			},
			raw: {
				type: Sequelize.STRING
			},
			full: {
				type: Sequelize.STRING
			},
			favicon: {
				type: Sequelize.STRING
			},
			small: {
				type: Sequelize.STRING
			},
			thumb: {
				type: Sequelize.STRING
			},
			small_s3: {
				type: Sequelize.STRING
			},
			self: {
				type: Sequelize.STRING
			},
			html: {
				type: Sequelize.STRING
			},
			download: {
				type: Sequelize.STRING
			},
			download_location: {
				type: Sequelize.STRING
			},
			likes: {
				type: Sequelize.INTEGER
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn('Now')
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn('Now')
			}
		})
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Images')
	}
}
