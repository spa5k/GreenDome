# syntax=docker/dockerfile:1.4
FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Copy the .next directory and other built artifacts to the container with ownership
COPY --chown=node:node .next/standalone ./
COPY --chown=node:node public ./public
COPY --chown=node:node .next/static .next/static

# Own the .next directory and public directory
RUN chown -R node:node /app/.next \
    && chown -R node:node /app/public

EXPOSE 3000

# Start the Next.js app
CMD ["node", "server.js"]
