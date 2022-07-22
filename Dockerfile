FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install --only=production

COPY --from=development /usr/src/app/dist ./dist

COPY --from=development /usr/src/app/doc ./doc

CMD ["node", "dist/main"]