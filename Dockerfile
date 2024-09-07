# syntax=docker/dockerfile:1.4
FROM node:22-slim AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Copy the .next directory and other built artifacts to the container
COPY .next/standalone ./
COPY public ./public
COPY .next/static .next/static

USER node

EXPOSE 3000

# Start the Next.js app
CMD ["node", "server.js"]
