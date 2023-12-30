<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://github.com/martinshaw/hire-me-skiddle/blob/master/public/images/Readme%20Logo.png?raw=true" width="400" alt="Laravel Logo"></a></p>

<p align="center">
Demonstration of my PHP / React abilities for Skiddle
</p>

## Built using 

- [Laravel v10](https://laravel.com/)
  *It is the most popular PHP framework. I have also done plenty of work with other PHP & Node.JS frameworks and with more proprietary codebases.*

- [React](https://reactjs.org/)
  *I have used React (DOM & Native) for a number of professional projects, including my own personal website. I have also used Vue.js, Angular.js and most other widely used JS frameworks.*

- [Inertia.js](https://inertiajs.com/)
  *Inertia.js is a wonderful way to integrate a modern React user interface with the complete backend power of the Laravel framework. I recommend it for any new Laravel projects. I have also built plenty of API-driven projects.*

## Want to continue the conversation?

Have some questions? Can I join the team?

Check out my portfolio at [martinshaw.co](https://martinshaw.co)
 
WhatsApp me at +44 7564 979 107

Email me at hello@martinshaw.co

Call me on +44 7564 979 107


## Installing this project on your own machine

### Prerequisites

Ensure that the following prerequisites are installed on your machine:

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Git](https://git-scm.com/downloads)

### Checkout the project

Clone the project to your local machine:

```bash
git clone https://github.com/martinshaw/hire-me-skiddle.git

cd hire-me-skiddle
```

### Install Composer dependencies

As the project contains configuration for the [Laravel Sail](https://laravel.com/docs/10.x/sail) Docker environment, you can install the Composer dependencies (without installing Composer on your local machine) using the following command:

```bash
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php83-composer:latest \
    composer install --ignore-platform-reqs
```

### Start the Docker environment

Start the Laravel Sail development Docker environment:

```bash
./vendor/bin/sail up -d
```

### Run the database migrations

Run the database migrations to create the database tables:

```bash
./vendor/bin/sail artisan migrate
```

### Seed the database

Seed the database with some sample data:

```bash
./vendor/bin/sail artisan db:seed
```

### Install the JavaScript dependencies

Install the JavaScript dependencies using NPM:

```bash
./vendor/bin/sail npm install
```

### Copy the environmental variables file and generate the application key

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env

./vendor/bin/sail artisan key:generate
```

### Add the hire-me-skiddle.local domain to your local machine's hosts file

#### If you are using Windows

Open Notepad as an administrator (right click the icon in the start menu) and open the file `C:\Windows\System32\drivers\etc\hosts`.

Add the following line to the bottom of the file:

```
127.0.0.1    hire-me-skiddle.local
```

Save the file. If you encounter an error, ensure that you have opened Notepad as an administrator.

#### If you are using macOS, Linux or another Unix-based operating system

Open a terminal window and run the following command:

```bash
sudo echo "\n127.0.0.1    hire-me-skiddle.local" >> /etc/hosts
```

### Run the Vite development server 

This project uses the [Vite](https://vitejs.dev/) development server to compile the frontend JavaScript and styling assets.

```bash
./vendor/bin/sail npm run dev
```

If you are developing on a remote server through VS Code Remote SSH using a non-typical interface (such as with Tailscale) (My preferred dev environment), you may need to run the Vite development server using a local copy of Node.js., instead of the copy of Node.js installed in the Docker container. 

```bash
npm run dev
```

### Open the project in your browser

Open the project in your browser at [http://hire-me-skiddle.local:8082](http://hire-me-skiddle.local:8082).

Make changes to the .tsx, .ts, .scss and .css files in the `resources/js` and `resources/css` directories and the Vite development server will automatically recompile the assets and reload the browser.

### When you are finished

When you want to stop the Vite development server, simply press the `q` key in the terminal window where it is running.

To stop the Laravel Sail Docker environment, run the following command:

```bash
./vendor/bin/sail down
```

