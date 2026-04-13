# Menggunakan image resmi Playwright
FROM mcr.microsoft.com/playwright:v1.40.0-jammy

# Set working directory di dalam container
WORKDIR /app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install browser Playwright (opsional jika image sudah menyediakannya, tapi aman untuk tetap ada)
RUN npx playwright install --with-deps

# Copy semua file project ke dalam container
COPY . .

# Perintah default untuk menjalankan test
CMD ["npx", "playwright", "test"]