# 🇵🇸 Boykot İsrail - Boycott Israel Platform

A modern web platform to raise awareness about Israeli-origin applications and provide alternative recommendations for conscious consumption.

## 🌟 Features

- **Comprehensive Database**: Apps and websites with Israeli origins
- **Turkish Alternatives**: Local and international alternatives for each item
- **Admin Panel**: Easy content management and data validation
- **Modern UI**: Responsive design with Tailwind CSS
- **Real-time Filtering**: Category, usage, and search-based filtering

## 🚀 Deployment with Dokploy

### For Static Deployment:

1. **Build the project**: The `dist/` folder contains all production files
2. **Upload to Dokploy**: Create a zip file with the `dist/` folder contents
3. **Static Site**: Configure as a static site in Dokploy

### Build Commands:
```bash
npm install
npm run build
```

### Output Directory: `dist/`

## 📁 Project Structure

```
dist/
├── index.html          # Landing page
├── apps.html           # Apps listing page
├── submit.html         # Suggestion form
├── admin.html          # Admin panel
├── data/
│   ├── apps.json      # Apps database
│   └── sites.json     # Websites database
└── assets/            # Compiled CSS/JS
```

## 🛠️ Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`

## 📊 Admin Panel

Access the admin panel at `/admin.html` to:
- Add new apps/websites/brands
- Validate data integrity
- Export/import data
- Generate backups

## 🔧 Tech Stack

- **Frontend**: Vanilla JavaScript, HTML, CSS
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Data**: JSON files (can be easily migrated to database)

## 📝 Contributing

1. Use the suggestion form at `/submit.html`
2. Access admin panel for direct content management
3. Submit pull requests for code improvements

## 🎯 Purpose

This platform supports the Palestinian cause by promoting conscious consumption and providing alternatives to Israeli-origin products and services.

**🇵�� Free Palestine** 