FROM oven/bun

WORKDIR /

COPY package.json .
COPY bun.lockb .

RUN bun install --production

COPY src src
COPY tsconfig.json .

ENV NODE_ENV=production
CMD ["bun", "tailwindcss -i ./src/public/input.css -o ./src/public/output.css"]
CMD ["bun", "src/index.ts"]

EXPOSE 3000
