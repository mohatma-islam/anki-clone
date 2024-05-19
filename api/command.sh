#initial json package

npm init -y

#install all the devDependencies
npm install -D @types/express @types/node ts-node nodemon rimraf

#install all the dependencies
npm install dotenv express

# Install dependencies
npm install @xata.io/cli -g

# Authenticate the CLI to your account
xata auth login

# Initialize your project locally with the Xata CLI
xata init --db https://Mohatma-Islam-s-workspace-rb77gc.eu-west-1.xata.sh/db/anki-clone

#npm run command -> npm run start:dev

#localhost postman test -> http://localhost:3000

