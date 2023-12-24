/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Favorites', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4
			},
			trackId: {
				type: Sequelize.UUID,
				references: {
					model: 'Tracks',
					key: 'id'
				},
				unique: 'compositeKeyTrackUserId'
			},
			radioId: {
				type: Sequelize.UUID,
				references: {
					model: 'Radios',
					key: 'id'
				},
				unique: 'compositeKeyRadioUserId'
			},
			userId: {
				type: Sequelize.UUID,
				references: {
					model: 'Users',
					key: 'id'
				},
				unique: 'compositeKeyTrackUserId',
				unique: 'compositeKeyRadioUserId'
			},
			type: {
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

		await queryInterface.addConstraint('Favorites', {
			fields: ['userId', 'trackId'],
			type: 'unique',
			name: 'compositeKeyTrackUserId'
		})

		await queryInterface.addConstraint('Favorites', {
			fields: ['userId', 'radioId'],
			type: 'unique',
			name: 'compositeKeyRadioUserId'
		})
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.removeConstraint('Favorites', 'compositeKey')
		await queryInterface.dropTable('Favorites')
	}
}
