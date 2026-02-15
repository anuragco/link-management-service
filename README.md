# 🔗 URL Shortener

A modern, fast, and secure URL shortening service built with Node.js, Express, MongoDB, and EJS. Create shortened URLs instantly with a beautiful, responsive interface and track click analytics.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D22.0.0-brightgreen.svg)
![Docker](https://img.shields.io/badge/docker-supported-blue.svg)

## ✨ Features

- 🚀 **Fast URL Shortening** - Generate short links in milliseconds
- 📊 **Click Analytics** - Track click counts for each shortened URL
- 🎨 **Modern UI** - Beautiful, responsive interface with gradient design
- 🔒 **Secure** - Built with Helmet.js for enhanced security
- 🐳 **Docker Support** - Easy deployment with Docker and Docker Compose
- 📱 **Mobile Responsive** - Works seamlessly on all devices
- ✅ **Form Validation** - Client and server-side URL validation
- 🎯 **RESTful API** - Clean API endpoints for integration
- 📝 **EJS Templates** - Server-side rendering for better SEO
- 🔄 **POST-Redirect-GET Pattern** - Prevents form resubmission

## 🏗️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Template Engine**: EJS
- **Styling**: Bootstrap 5, Custom CSS with Glassmorphism
- **Security**: Helmet.js, CORS
- **ID Generation**: ShortID
- **Environment Variables**: dotenv

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v22.x or higher)
- **MongoDB** (Atlas or local instance)
- **npm** or **yarn** package manager
- **Docker** (optional, for containerized deployment)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd url-shortner/Backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the `Backend` directory:

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:

```env
# Server Configuration
PORT=5000

# MongoDB Configuration
MONGOOSE_URL=mongodb+srv://username:password@cluster.mongodb.net/URL-SHORTNER

# For local MongoDB (alternative)
# MONGOOSE_URL=mongodb://localhost:27017/url-shortner
```

### 4. Start the Application

```bash
npm start
```

The application will be available at `http://localhost:5000`

## 🐳 Docker Deployment

### Using Docker

#### 1. Build the Docker Image

```bash
docker build -t url-shortener .
```

#### 2. Run the Container

**Important**: You must pass environment variables when running the container:

```bash
docker run -d \
  --name url-shortener \
  -p 5000:5000 \
  -e PORT=5000 \
  -e MONGOOSE_URL="your_mongodb_connection_string" \
  url-shortener
```

**Using environment file:**

```bash
docker run -d \
  --name url-shortener \
  -p 5000:5000 \
  --env-file .env \
  url-shortener
```

### Using Docker Compose (Recommended)

Docker Compose makes it easier to manage environment variables and container configuration.

#### 1. Configure Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGOOSE_URL=mongodb+srv://username:password@cluster.mongodb.net/URL-SHORTNER
```

#### 2. Start with Docker Compose

```bash
docker-compose up -d
```

#### 3. View Logs

```bash
docker-compose logs -f
```

#### 4. Stop the Service

```bash
docker-compose down
```

## 📁 Project Structure

```
Backend/
├── config/
│   └── connectMongo.js      # MongoDB connection configuration
├── Controller/
│   ├── CreateLink.js        # URL creation controller
│   ├── RedirectUser.js      # Redirect handler
│   └── Static.controller.js # Home page controller
├── middleware/              # Custom middleware (if any)
├── model/
│   └── Shortner.js         # MongoDB schema for URLs
├── Routes/
│   ├── redirect.route.js   # Redirect routes
│   ├── Shortner.route.js   # URL creation routes
│   └── static.route.js     # Static page routes
├── views/
│   └── home.ejs            # Main application UI
├── .dockerignore           # Docker ignore file
├── .env                    # Environment variables (not in git)
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore file
├── docker-compose.yml      # Docker Compose configuration
├── Dockerfile              # Docker build instructions
├── index.js                # Application entry point
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
```

## 🔧 Configuration

### Environment Variables

| Variable       | Description                          | Default | Required |
|---------------|--------------------------------------|---------|----------|
| `PORT`        | Port number for the server           | 5000    | Yes      |
| `MONGOOSE_URL`| MongoDB connection string            | -       | Yes      |

### MongoDB Connection Strings

**MongoDB Atlas (Cloud):**
```
mongodb+srv://username:password@cluster.mongodb.net/URL-SHORTNER
```

**Local MongoDB:**
```
mongodb://localhost:27017/url-shortner
```

**Docker MongoDB:**
```
mongodb://mongo:27017/url-shortner
```

## 📡 API Endpoints

### Create Short URL

```http
POST /api/create/link
Content-Type: application/x-www-form-urlencoded

USerGivenUrl=https://example.com/very-long-url
```

**Response:** Redirects to home page with success message and short ID

### Redirect to Original URL

```http
GET /:shortid
```

**Response:** 302 Redirect to original URL

### Home Page

```http
GET /
```

**Response:** Renders home page with URL list

## 🎨 Features in Detail

### URL Shortening
- Paste any valid URL into the input field
- Click "Shorten URL" to generate a short link
- Copy the shortened URL with one click
- Automatically validates URL format

### Analytics Dashboard
- View all shortened URLs in a table
- See creation dates for each URL
- Track total clicks for each link
- Responsive table layout

### Click Tracking
- Every redirect is logged
- Click metrics stored in ClickMatrics array
- View total clicks per URL

## 🔒 Security Features

- **Helmet.js** - Sets secure HTTP headers
- **CORS** - Configurable Cross-Origin Resource Sharing
- **Input Validation** - Server and client-side validation
- **URL Sanitization** - Prevents malicious URLs
- **Environment Variables** - Sensitive data kept secure

## 🛠️ Development

### Running in Development Mode

```bash
npm start
```

The application uses nodemon for auto-reloading during development.

### Building for Production

1. Ensure all environment variables are set
2. Use Docker for consistent deployment
3. Consider using a process manager like PM2:

```bash
npm install -g pm2
pm2 start index.js --name url-shortener
```

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Problem:** Cannot connect to MongoDB

**Solution:**
- Check your MongoDB connection string
- Ensure IP address is whitelisted in MongoDB Atlas
- Verify database user credentials
- Check network connectivity

### Port Already in Use

**Problem:** Port 5000 is already in use

**Solution:**
```bash
# Change PORT in .env file
PORT=3000
```

### Docker Container Not Starting

**Problem:** Container exits immediately

**Solution:**
- Check if environment variables are passed correctly
- View container logs: `docker logs url-shortener`
- Ensure MongoDB URL is accessible from container

### Empty URL in Input Field

**Problem:** Form allows empty submission

**Solution:** Client-side validation prevents empty submissions. If bypassed, server-side validation returns error message.

## 📊 Database Schema

### URL Document Structure

```javascript
{
  shortId: String,          // Generated short ID
  redirectUrl: String,      // Original URL
  ClickMatrics: Array,      // Array of click timestamps/data
  status: String,           // 'active', 'inactive', or 'removed'
  createdAt: Date,          // Auto-generated timestamp
  updatedAt: Date           // Auto-generated timestamp
}
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Anurag**

## 🙏 Acknowledgments

- Bootstrap for the UI framework
- Font Awesome for icons
- MongoDB for the database
- Express.js community
- All contributors and users

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact the maintainer
- Check existing documentation

## 🔮 Future Enhancements

- [ ] Custom short URL aliases
- [ ] QR code generation
- [ ] Link expiration dates
- [ ] User authentication
- [ ] Advanced analytics dashboard
- [ ] API rate limiting
- [ ] Bulk URL shortening
- [ ] Export analytics data
- [ ] Link preview before redirect
- [ ] Branded short domains

---

Made with ❤️ by Anurag
