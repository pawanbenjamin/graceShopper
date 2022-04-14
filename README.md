# Fullstack Application Starter

## The Stack:

### Node, PostrgreSql, Express, React

#### Has a simple login and Authentication routes set up

#### Authorization with JWT, BCRYPT, and HTTPONLY COOKIES

##### Deployment:

```heroku create```

```heroku addons:create heroku-postgresql:hobby-dev```

```git push heroku main```

Set Any Secrets you need in the heroku environment
```heroku config:set JWT_SECRET="don't tell a soul"```

Seed Heroku DB
```heroku run npm run seed```

#### Then you should be good to go
