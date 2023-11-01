
1. How to use RadioBrowserApi in that project to make seeds

Example:
import { RadioBrowserApi, StationSearchType } from 'radio-browser-api';

const api = new RadioBrowserApi('My Radio App');

const st = await api.getStationsBy(StationSearchType.byTag, 'jazz');

Example of response:
  {
    changeuuid: '35b964f4-e826-4e41-adcb-799c6f56f5b6',
    stationuuid: '0fa1bfa4-f365-11e8-a471-52543be04c81',
    serveruuid: 'c54c69a7-9175-4a27-9b13-e6fabc997b90',
    name: '- 0 N - Jazz on Radio',
    url: 'https://0n-jazz.radionetz.de/0n-jazz.aac',
    url_resolved: 'https://0n-jazz.radionetz.de/0n-jazz.aac',
    homepage: 'http://www.0nradio.com/',
    favicon: 'https://www.0nradio.com/logos/0n-jazz_600x600.jpg',
    tags: 'jazz,smooth jazz,swing',
    country: 'Germany',
    countrycode: 'DE',
    iso_3166_2: 'DE-BY',
    state: 'Bavaria',
    language: 'german',
    languagecodes: 'DE,de',
    votes: 145,
    lastchangetime: '2022-05-02 10:06:52',
    lastchangetime_iso8601: '2022-05-02T10:06:52Z',
    codec: 'AAC+',
    bitrate: 64,
    hls: 0,
    lastcheckok: 1,
    lastchecktime: '2023-04-28 01:29:42',
    lastchecktime_iso8601: '2023-04-28T01:29:42Z',
    lastcheckoktime: '2023-04-28 01:29:42',
    lastcheckoktime_iso8601: '2023-04-28T01:29:42Z',
    lastlocalchecktime: '2023-04-27 14:16:18',
    lastlocalchecktime_iso8601: '2023-04-27T14:16:18Z',
    clicktimestamp: '2023-04-26 18:39:35',
    clicktimestamp_iso8601: '2023-04-26T18:39:35Z',
    clickcount: 29,
    clicktrend: -2,
    ssl_error: 0,
    geo_lat: 50.3115,
    geo_long: 11.923,
    has_extended_info: true
  }
