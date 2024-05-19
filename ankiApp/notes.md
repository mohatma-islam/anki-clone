### to allow @ in the import to point to files some modification were made to tsconfig.json file and app.json file


- tsconfig.json
this below code added ` start "strict" `: true, line
` "baseUrl": ".", `

- app.json
this below code is added in the ` experiment ` array
"tsconfigPaths": true