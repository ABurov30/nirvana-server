/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('ContactPerUsers', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				isUUID: 4
			},
			contactOwnerId: {
				type: Sequelize.STRING,
				references: {
					model: 'Users',
					key: 'id'
				},
				isUUID: 4
			},
			contactId: {
				type: Sequelize.STRING,
				references: {
					model: 'Contacts',
					key: 'id'
				},
				isUUID: 4
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
		await queryInterface.dropTable('ContactPerUsers')
	}
}
