To run the app in production with API, either set up an Express server for it and set: 
```
Access-Control-Allow-Origin: process.env.API
```

Remember to have budget-backend up and running with following set up in .env:
```
API=API_ADRESS:PORT 
```

Start the app by:
```
yarn install
yarn start
```

![Screenshot](https://raw.githubusercontent.com/allwd/budget/master/screenshot.png)