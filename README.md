# Home Library Service

## Installing NPM modules

```



npm install



```

## Running application

```



npm start



```

After starting the app on port (4000 as default) you can open

in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

## Docker

```



npm run docker - start docker-compose



```

```



npm run docker:scan - start scan image



```

docker hub - https://hub.docker.com/r/alepashkou/nodejs2022q2-service

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```



npm run test



```

To run only one of all test suites

```



npm run test -- <path to suite>



```

To run only specific test suite with authorization

### Auto-fix and format

```



npm run lint



```

```



npm run format



```
