FROM httpd:latest

# Set the working directory inside the container
WORKDIR /usr/local/apache2/htdocs/

# Copy static website files into the Apache document root
COPY . /usr/local/apache2/htdocs/

# Expose port 80
EXPOSE 80

# Start the Apache server
CMD ["httpd-foreground"]