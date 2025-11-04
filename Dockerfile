# Step:1 Build the React app
FROM node:20 AS build
WORKDIR/ frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve the app with Nginx
FROM nginx:alphine
COPY --from=build /frontend/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g", "daemon off;"]
