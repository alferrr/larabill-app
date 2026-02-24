# Use official PHP image with FPM
FROM php:8.2-fpm

# Set working directory
WORKDIR /var/www

# Install system dependencies needed by Laravel & Composer
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    libzip-dev \
    zip \
    libonig-dev \
    curl \
    && docker-php-ext-install pdo pdo_pgsql mbstring zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy app files
COPY . .

# Install PHP dependencies (Laravel)
RUN composer install --no-dev --optimize-autoloader --ignore-platform-reqs

# Set proper permissions for storage & cache
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Expose port Laravel will run on
EXPOSE 8000

# Start Laravel development server
CMD php artisan serve --host=0.0.0.0 --port=8000