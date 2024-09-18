/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Contacts', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.STRING,
				defaultValue: Sequelize.UUIDV4,
				isUUID: 4
			},
			name: {
				type: Sequelize.TEXT
			},
			userId: {
				type: Sequelize.STRING,
				references: {
					model: 'Users',
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
		await queryInterface.dropTable('Contacts')
	}
}
