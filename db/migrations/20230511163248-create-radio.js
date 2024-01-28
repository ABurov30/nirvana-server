/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Radios', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				isUUID: 4
			},
			name: {
				type: Sequelize.TEXT
			},
			url: {
				type: Sequelize.TEXT
			},
			favicon: {
				type: Sequelize.TEXT
			},
			tags: {
				type: Sequelize.TEXT
			},
			country: {
				type: Sequelize.TEXT
			},
			votes: {
				type: Sequelize.INTEGER
			},
			lastcheckoktime: {
				type: Sequelize.TEXT
			},
			void: {
				type: Sequelize.TEXT
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn('NOW')
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn('NOW')
			}
		})
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Radios')
	}
}
