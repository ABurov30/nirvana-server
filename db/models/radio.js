const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Radio extends Model {
		static associate(models) {}
	}
	Radio.init(
		{
			changeuuid: DataTypes.TEXT,
			stationuuid: DataTypes.TEXT,
			serveruuid: DataTypes.TEXT,
			name: DataTypes.TEXT,
			url: DataTypes.TEXT,
			url_resolved: DataTypes.TEXT,
			homepage: DataTypes.TEXT,
			favicon: DataTypes.TEXT,
			tags: DataTypes.TEXT,
			country: DataTypes.TEXT,
			countrycode: DataTypes.TEXT,
			iso_3166_2: DataTypes.TEXT,
			state: DataTypes.TEXT,
			language: DataTypes.TEXT,
			languagecodes: DataTypes.TEXT,
			votes: DataTypes.INTEGER,
			lastchangetime: DataTypes.TEXT,
			lastchangetime_iso8601: DataTypes.TEXT,
			codec: DataTypes.TEXT,
			bitrate: DataTypes.INTEGER,
			hls: DataTypes.INTEGER,
			lastcheckok: DataTypes.INTEGER,
			lastchecktime: DataTypes.TEXT,
			lastchecktime_iso8601: DataTypes.TEXT,
			lastcheckoktime: DataTypes.TEXT,
			lastcheckoktime_iso8601: DataTypes.TEXT,
			lastlocalchecktime: DataTypes.TEXT,
			lastlocalchecktime_iso8601: DataTypes.TEXT,
			clicktimestamp: DataTypes.TEXT,
			clicktimestamp_iso8601: DataTypes.TEXT,
			clickcount: DataTypes.INTEGER,
			clicktrend: DataTypes.INTEGER,
			ssl_error: DataTypes.INTEGER,
			geo_lat: DataTypes.INTEGER,
			geo_long: DataTypes.INTEGER,
			has_extended_info: DataTypes.BOOLEAN
		},
		{
			sequelize,
			modelName: 'Radio'
		}
	)
	return Radio
}
