// Admin Panel functionality
let appsData = [];
let sitesData = [];
let currentType = '';

// Load all data
async function loadAllData() {
    try {
        const [appsResponse, sitesResponse] = await Promise.all([
            fetch('/data/apps.json'),
            fetch('/data/sites.json')
        ]);
        
        if (!appsResponse.ok) {
            throw new Error(`Apps data loading failed: ${appsResponse.status}`);
        }
        if (!sitesResponse.ok) {
            throw new Error(`Sites data loading failed: ${sitesResponse.status}`);
        }
        
        appsData = await appsResponse.json();
        sitesData = await sitesResponse.json();
        
        console.log('Loaded apps:', appsData.length);
        console.log('Loaded sites:', sitesData.length);
        
        updateStatistics();
        updateRecentActivity('Veriler başarıyla yüklendi');
    } catch (error) {
        console.error('Error loading data:', error);
        updateRecentActivity(`Veri yükleme hatası: ${error.message}`);
        
        // Initialize with empty arrays to prevent further errors
        appsData = [];
        sitesData = [];
        updateStatistics();
    }
}

// Update statistics dashboard
function updateStatistics() {
    const totalApps = appsData.length;
    const totalSites = sitesData.length;
    const popularInTR = [...appsData, ...sitesData].filter(item => item.usedInTR).length;
    const categories = new Set([...appsData.map(app => app.category), ...sitesData.map(site => site.category)]).size;

    document.getElementById('apps-count').textContent = totalApps;
    document.getElementById('apps-total').textContent = totalApps;
    document.getElementById('sites-count').textContent = totalSites;
    document.getElementById('sites-total').textContent = totalSites;
    document.getElementById('popular-count').textContent = popularInTR;
    document.getElementById('popular-total').textContent = popularInTR;
    document.getElementById('categories-count').textContent = categories;
    document.getElementById('categories-total').textContent = categories;
    
    console.log('Statistics updated:', { totalApps, totalSites, popularInTR, categories });
}

// Show quick add modal
function showQuickAdd(type) {
    currentType = type;
    const modal = document.getElementById('quick-add-modal');
    const title = document.getElementById('modal-title');
    const urlField = document.getElementById('url-field');
    
    title.textContent = `Yeni ${type === 'app' ? 'Uygulama' : type === 'website' ? 'Website' : 'Marka'} Ekle`;
    
    // Show URL field for websites and brands
    if (type === 'website' || type === 'brand') {
        urlField.classList.remove('hidden');
        urlField.querySelector('input').required = true;
    } else {
        urlField.classList.add('hidden');
        urlField.querySelector('input').required = false;
    }
    
    modal.classList.remove('hidden');
    updateRecentActivity(`${type} ekleme formü açıldı`);
}

// Close quick add modal
function closeQuickAdd() {
    const modal = document.getElementById('quick-add-modal');
    const form = document.getElementById('quick-add-form');
    modal.classList.add('hidden');
    form.reset();
}

// Handle quick add form submission
function handleQuickAdd(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Convert string boolean to actual boolean
    data.usedInTR = data.usedInTR === 'true';
    
    // Add appropriate fields based on type
    if (currentType === 'website' || currentType === 'brand') {
        data.type = currentType;
        data.verificationStatus = 'pending';
        data.sources = [];
        data.description = data.reason;
        sitesData.push(data);
    } else {
        appsData.push(data);
    }
    
    updateStatistics();
    updateRecentActivity(`Yeni ${currentType} eklendi: ${data.name}`);
    closeQuickAdd();
    
    // Save changes
    saveDataChanges();
    
    // Show success message
    alert(`${data.name} başarıyla eklendi!`);
}

// Save data changes (for demo purposes, shows what would be saved)
function saveDataChanges() {
    // In a production environment, this would send data to a backend API
    // For now, we'll just show what would be saved and update localStorage
    const allData = {
        apps: appsData,
        sites: sitesData,
        lastModified: new Date().toISOString()
    };
    
    // Save to localStorage for persistence during session
    localStorage.setItem('boycott-data', JSON.stringify(allData));
    
    updateRecentActivity('Değişiklikler kaydedildi (session storage)');
    console.log('Data saved to localStorage:', allData);
}

// Load data from localStorage if available
function loadFromLocalStorage() {
    try {
        const savedData = localStorage.getItem('boycott-data');
        if (savedData) {
            const parsed = JSON.parse(savedData);
            if (parsed.apps && parsed.sites) {
                appsData = parsed.apps;
                sitesData = parsed.sites;
                updateRecentActivity('Local veriler yüklendi');
                console.log('Loaded from localStorage');
                return true;
            }
        }
    } catch (error) {
        console.error('Error loading from localStorage:', error);
    }
    return false;
}

// Export all data
function exportAllData() {
    const allData = {
        apps: appsData,
        sites: sitesData,
        exportDate: new Date().toISOString(),
        totalItems: appsData.length + sitesData.length
    };
    
    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `boycott-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    updateRecentActivity('Tüm veri dışa aktarıldı');
}

// Import data from file
function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            
            if (importedData.apps && Array.isArray(importedData.apps)) {
                appsData = [...appsData, ...importedData.apps];
            }
            
            if (importedData.sites && Array.isArray(importedData.sites)) {
                sitesData = [...sitesData, ...importedData.sites];
            }
            
            updateStatistics();
            updateRecentActivity(`${file.name} dosyasından veri içe aktarıldı`);
            alert('Veri başarıyla içe aktarıldı!');
        } catch (error) {
            alert('Dosya okuma hatası: ' + error.message);
            updateRecentActivity('Veri içe aktarma hatası');
        }
    };
    reader.readAsText(file);
}

// Generate backup
function generateBackup() {
    const backup = {
        timestamp: new Date().toISOString(),
        version: '1.0',
        data: {
            apps: appsData,
            sites: sitesData
        },
        metadata: {
            totalApps: appsData.length,
            totalSites: sitesData.length,
            categories: [...new Set([...appsData.map(app => app.category), ...sitesData.map(site => site.category)])]
        }
    };
    
    const backupStr = JSON.stringify(backup, null, 2);
    const backupBlob = new Blob([backupStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(backupBlob);
    link.download = `boycott-backup-${Date.now()}.json`;
    link.click();
    
    updateRecentActivity('Sistem yedeği oluşturuldu');
}

// Validate all data
function validateAllData() {
    const errors = [];
    
    // Validate apps
    appsData.forEach((app, index) => {
        if (!app.name || !app.category || !app.alternative || !app.reason) {
            errors.push(`Uygulama ${index + 1}: Eksik alanlar`);
        }
        if (typeof app.usedInTR !== 'boolean') {
            errors.push(`Uygulama ${index + 1}: usedInTR boolean olmalı`);
        }
    });
    
    // Validate sites
    sitesData.forEach((site, index) => {
        if (!site.name || !site.category || !site.alternative || !site.reason) {
            errors.push(`Site ${index + 1}: Eksik alanlar`);
        }
        if (site.url && !isValidUrl(site.url)) {
            errors.push(`Site ${index + 1}: Geçersiz URL`);
        }
    });
    
    if (errors.length === 0) {
        alert('Tüm veriler geçerli! ✅');
        updateRecentActivity('Veri doğrulama başarılı');
    } else {
        alert(`${errors.length} doğrulama hatası bulundu:\n\n${errors.join('\n')}`);
        updateRecentActivity(`${errors.length} doğrulama hatası bulundu`);
    }
}

// Generate sitemap
function generateSitemap() {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://yourdomain.com/</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://yourdomain.com/apps.html</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://yourdomain.com/submit.html</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <priority>0.8</priority>
    </url>
</urlset>`;

    const sitemapBlob = new Blob([sitemap], {type: 'application/xml'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(sitemapBlob);
    link.download = 'sitemap.xml';
    link.click();
    
    updateRecentActivity('Sitemap oluşturuldu');
}

// Update statistics (refresh)
function updateStats() {
    loadAllData();
    updateRecentActivity('İstatistikler güncellendi');
}

// Update recent activity log
function updateRecentActivity(message) {
    const activityContainer = document.getElementById('recent-activity');
    const time = new Date().toLocaleTimeString('tr-TR');
    
    const activityItem = document.createElement('div');
    activityItem.className = 'flex items-center text-sm text-gray-500';
    activityItem.innerHTML = `
        <span class="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
        <span>${message} - ${time}</span>
    `;
    
    activityContainer.insertBefore(activityItem, activityContainer.firstChild);
    
    // Keep only last 10 activities
    while (activityContainer.children.length > 10) {
        activityContainer.removeChild(activityContainer.lastChild);
    }
}

// Update current time
function updateCurrentTime() {
    const now = new Date();
    document.getElementById('current-time').textContent = now.toLocaleString('tr-TR');
}

// Utility function to validate URL
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    updateCurrentTime();
    setInterval(updateCurrentTime, 60000); // Update every minute
    
    // Add form event listener
    document.getElementById('quick-add-form').addEventListener('submit', handleQuickAdd);
    
    updateRecentActivity('Admin paneli başlatıldı');
    
    // Load data - try localStorage first, but don't duplicate load
    const hasLocalData = loadFromLocalStorage();
    if (hasLocalData) {
        updateStatistics();
        updateRecentActivity('Önbellekten veriler yüklendi');
    }
    
    // Always try to load fresh data, but only once
    loadAllData();
});

// Clear localStorage and reset data
function clearLocalStorage() {
    localStorage.removeItem('boycott-data');
    updateRecentActivity('Local storage temizlendi');
    
    // Reload fresh data
    appsData = [];
    sitesData = [];
    loadAllData();
    
    alert('Local storage temizlendi ve veriler yeniden yüklendi!');
}

// Export functions to global scope
window.showQuickAdd = showQuickAdd;
window.closeQuickAdd = closeQuickAdd;
window.exportAllData = exportAllData;
window.importData = importData;
window.generateBackup = generateBackup;
window.validateAllData = validateAllData;
window.generateSitemap = generateSitemap;
window.updateStats = updateStats;
window.clearLocalStorage = clearLocalStorage; 