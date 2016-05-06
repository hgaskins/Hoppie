# [Hoppie](http://hoppieapp.herokuapp.com)

<b>Team Name</b>: Hoppies

<b>Team Members</b>: [Hannah Gaskins](https://github.com/hnag409), [Randy Gulling](https://github.com/rgylling), [Johnny Luangphasy](https://github.com/jluangphasy)

The purpose of this project is to create a web app for beer consumers and connoisseurs alike.

A user would want to access the site and be able to find local breweries around them, and find out information
about different types of beers. The app will also include information to calculate BAC and if it is a high number, provide links to UBER and Lyft apps.

## Requirements

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](http://www.postgresql.org/download/)
- [Yelp API](https://www.yelp.com/developers/documentation/v2/overview)

## Getting started

1. Clone the repo: `git clone https://github.com/hnag409/Hoppie.git`.
2. Install node modules: `npm install`.
3. Install and setup PostgreSQL.
  1. Start PostgreSQL server.
  2. Create a database.
  3. Create a username and password.
  3. Create a table: `CREATE TABLE track_search (id SERIAL PRIMARY KEY, term varchar(255), timestamp_added timestamp);`.
4. Create account and API keys from Yelp.
5. Add env variables in one of these files: `~/.profile`, `~/.bashrc`, `~/.bash_profile`, `.zshrc`. Replace all keywords with "your_" prefix to your info.
  1. `export DATABASE_URL=postgres://your_username:your_password@localhost/your_database`
  2. `export YELP_CONSUMER_KEY=your_yelp_consumer_key`
  2. `export YELP_CONSUMER_SECRET=your_yelp_consumer_secret`
  2. `export YELP_TOKEN=your_yelp_token`
  2. `export YELP_TOKEN_SECRET=your_yelp_token_secret`
6. Start node server: `node server.js`.

## Stories

- as a developer I want to use FP, OOP, middleware, SMACCS, and DRY principles.
- as a developer I want to use the appropriate APIs, and data to display quality information to my users.
-  as a user I want to find information about beer and have interactivity including a BAC with links to driving services so I can get home safely.
- as a user I want to easily navigate the homepage.
- as a user I want to search for local PDX breweries that are close to me. I also want to be able to click and find additional information on the breweries.
- as a user I want to search for different types of beer and access additional information to research that beer.
- as a user I want the additional beer and brewery information to be displayed in a organized fashion to easily see that information.
- as a user I want to know my BAC based on customized inputs I give the site.
- as a user I want to know who created this site and why.
- as a developer I want to use webSQL to persist my site's state.

## Hoppie for dummies

![User Guide](userguide/hoppieguide.gif "userguide")



## Domain Model

![Domain Modeling](wireframes/domainModel.jpg "domainModel")

## Wireframes

![homepageOne](/wireframes/homepageOne.jpg "homepageOne")

![homepageTwo](/wireframes/homepageTwo.jpg "homepageTwo")

![beerandbreweryPage](/wireframes/beerandbreweryPage.jpg "beerandbreweryPage")

![BACPage](/wireframes/BACPage.jpg "BACPage")

![aboutPage](/wireframes/aboutPage.jpg "aboutPage")
