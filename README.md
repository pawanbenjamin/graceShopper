# Fullstack Application Starter

## The Stack:

### Node, PostrgreSql, Express, React

#### Has a simple login and Authentication routes set up

#### Authorization with JWT, BCRYPT, and HTTPONLY COOKIES

##### Make sure to make a db locally for dev
```createdb <your db name>``` set it in db/pool.js

Seed the db:
```npm run seed```

```npm run start:dev``` starts both react and express servers

##### Deployment:

```heroku create```

```heroku addons:create heroku-postgresql:hobby-dev```

```git push heroku main```

Set Any Secrets you need in the heroku environment
```heroku config:set JWT_SECRET="don't tell a soul"```

Seed Heroku DB
```heroku run npm run seed```

#### Then you should be good to go
