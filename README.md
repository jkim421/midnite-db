# midnite-db

`midnite-db` provides a more robust way to search the [MyAnimeList](https://myanimelist.net/anime.php) database.

As a longtime fan of animated media, I would often search the MAL database to discover older or less well known media. However, I was often frustrated with the limited search capabilities available on the site. After scraping the MAL database, I built `midnite-db` to support more specific queries to enabled better targeted searches.
<br>
<br>
## Stack

Client - React + TypeScript  
Server - FastAPI (Python)  
MAL Scraper ([link](https://github.com/jkim421/midnite-scraper)) - Python
<br>
<br>
## Filter functionality

`midnite-db` enables more powerful queries for most filterable options on MAL.  

There are three types of filters available: range filters, multi-select filters, and multi-select filters with sets.
<br>
### Range filters for `Score` and `Year`

The range filters query for data that exists between the lower and upper values of the filter.  On MAL, the `Score` filter is a single select that only enables searching for entries with a score between the selected integer value and the next integer value.
<br>
### Multi-select filters for `Media Type`, `Status`, `Rating`, and `Demographic`

The multi-select filters query for data that matches any of the selected options. On MAL, all these filters are single select.
<br>
### Multi-select filters with sets for `Genre` and `Theme`

The multi-select filters with sets query for data that matches _all_ selected options, and also allows for multiple sets of options to be queried. If no sets are added, the filter submits the currently selected values. If sets of options are added, entries that match all options from any selected set are returned.
<br>
<br>
## Upcoming Features
- Responsive mobile friendly view
- Ability to select options to exclude through filters
- Studios filter to allow querying by production studio
- Search bar to query title and synopsis text for current entries
- Secondary list views that can be toggled (i.e. table display, tiles)
