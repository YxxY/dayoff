# dayOff API 
restful api to demonstrate whether a date is chinese holiday

## api
- `/api/today`
- `/api/yesterday`
- `/api/tomorrow`
- `/api/<date-format>`
    - `/api/2022-06-01`
    - `/api/20220601`

## response
- `1`: day off
- `0`: work day

## config
`yaml` config file under `data` folder: `${YEAR}.yaml` or `{YEAR}.yml`
current year is `2022.yaml`  
next year will be `2023.yaml`

## install
- clone this repo
- install node.js >= v12.0.0
- install dependencies: `npm install`
- generate database: `npm run init`
- dev: `npm run dev`

## deploy by docker
```
docker build -t dayoff .
docker run -p 7001:7001 -d dayoff
```

