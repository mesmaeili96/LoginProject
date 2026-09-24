# -------------------------
# Stage 1 - Dependencies
# -------------------------

FROM node:22-alpine AS dependencies

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci


# -------------------------
# Stage 2 - Build
# -------------------------

FROM node:22-alpine AS build

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules

COPY . .

ARG NEXT_PUBLIC_API_URL=http://localhost:5162

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build


# -------------------------
# Stage 3 - Runtime
# -------------------------

FROM node:22-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app ./

EXPOSE 3000

CMD ["npm", "run", "start", "--", "-p", "3000"]