import './style.css'

let allApps = [];
let allSites = [];
let filteredApps = [];

// Load apps data with fallback to localStorage
async function loadAppsData() {
    try {
        console.log('Starting data load...');
        
        // First try to load from localStorage (includes admin additions)
        const savedData = localStorage.getItem('boycott-data');
        if (savedData) {
            const parsed = JSON.parse(savedData);
            if (parsed.apps && Array.isArray(parsed.apps)) {
                allApps = parsed.apps;
                console.log('Loaded apps from localStorage:', allApps.length);
            }
            if (parsed.sites && Array.isArray(parsed.sites)) {
                allSites = parsed.sites;
                console.log('Loaded sites from localStorage:', allSites.length);
            }
        }
        
        // If no localStorage data or empty, load from JSON files
        if (allApps.length === 0) {
            console.log('Loading apps from JSON...');
            const response = await fetch('/data/apps.json');
            if (response.ok) {
                allApps = await response.json();
                console.log('Loaded apps from JSON:', allApps.length);
            } else {
                console.error('Failed to load apps.json:', response.status);
            }
        }
        
        if (allSites.length === 0) {
            console.log('Loading sites from JSON...');
            const sitesResponse = await fetch('/data/sites.json');
            if (sitesResponse.ok) {
                allSites = await sitesResponse.json();
                console.log('Loaded sites from JSON:', allSites.length);
            } else {
                console.error('Failed to load sites.json:', sitesResponse.status);
            }
        }
        
        // Combine apps and sites for display
        const combinedData = [...allApps, ...allSites];
        filteredApps = combinedData;
        
        console.log('Total combined data:', combinedData.length);
        
        // Remove loading message if it exists
        const loadingMessage = document.querySelector('.loading-message');
        if (loadingMessage) {
            loadingMessage.remove();
        }
        
        renderTable(filteredApps);
        setupEventListeners();
    } catch (error) {
        console.error('Error loading data:', error);
        const tableBody = document.getElementById('apps-table-body') || document.getElementById('apps-table');
        if (tableBody) {
            if (tableBody.tagName === 'TBODY') {
                tableBody.innerHTML = `
                    <tr>
                        <td colspan="5" class="px-6 py-4 text-center text-red-600">
                            Veri yüklenirken hata oluştu: ${error.message}
                        </td>
                    </tr>
                `;
            }
        }
    }
}

// Render table (unified function for apps and sites)
function renderTable(items) {
    const tableBody = document.getElementById('apps-table-body') || document.getElementById('apps-table');
    if (!tableBody) return;

    if (tableBody.tagName === 'TBODY') {
        tableBody.innerHTML = '';
    } else {
        tableBody.innerHTML = '';
    }
    
    items.forEach(item => {
        const row = document.createElement('tr');
        row.className = 'border-b border-gray-200 hover:bg-gray-50';
        
        // Check if it's a website/brand (has url field) or app
        const displayName = item.url ? `${item.name} (${item.url})` : item.name;
        const typeIcon = item.type === 'website' ? '🌐' : item.type === 'brand' ? '🏢' : '📱';
        
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                ${typeIcon} ${displayName}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.category}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.usedInTR ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }">
                    ${item.usedInTR ? 'Yaygın' : 'Nadir'}
                </span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-500 max-w-xs">${item.alternative}</td>
            <td class="px-6 py-4 text-sm text-gray-500 max-w-xs">${item.reason}</td>
        `;
        
        if (tableBody.tagName === 'TBODY') {
            tableBody.appendChild(row);
        } else {
            tableBody.innerHTML += row.outerHTML;
        }
    });
}

// Filter functionality (updated to work with combined data)
function filterApps() {
    const categoryFilter = document.getElementById('category-filter');
    const usageFilter = document.getElementById('usage-filter');
    const searchInput = document.getElementById('search-input');
    
    if (!categoryFilter || !usageFilter || !searchInput) return;
    
    // Combine all data for filtering
    const combinedData = [...allApps, ...allSites];
    let filteredItems = [...combinedData];
    
    // Category filter
    if (categoryFilter.value !== 'all') {
        filteredItems = filteredItems.filter(item => item.category === categoryFilter.value);
    }
    
    // Usage filter
    if (usageFilter.value !== 'all') {
        const isUsed = usageFilter.value === 'used';
        filteredItems = filteredItems.filter(item => item.usedInTR === isUsed);
    }
    
    // Search filter
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        filteredItems = filteredItems.filter(item => 
            item.name.toLowerCase().includes(searchTerm) ||
            item.alternative.toLowerCase().includes(searchTerm) ||
            item.reason.toLowerCase().includes(searchTerm) ||
            (item.url && item.url.toLowerCase().includes(searchTerm))
        );
    }
    
    renderTable(filteredItems);
}

// Setup event listeners (new function)
function setupEventListeners() {
    const categoryFilter = document.getElementById('category-filter');
    const usageFilter = document.getElementById('usage-filter');
    const searchInput = document.getElementById('search-input');
    
    if (categoryFilter) categoryFilter.addEventListener('change', filterApps);
    if (usageFilter) usageFilter.addEventListener('change', filterApps);
    if (searchInput) searchInput.addEventListener('input', filterApps);
    
    // Populate category filter with all available categories
    if (categoryFilter) {
        const categories = [...new Set([...allApps, ...allSites].map(item => item.category))].sort();
        categoryFilter.innerHTML = '<option value="all">Tüm Kategoriler</option>';
        categories.forEach(category => {
            categoryFilter.innerHTML += `<option value="${category}">${category}</option>`;
        });
    }
}

// Initialize filters (updated name to avoid confusion)
function initializeFilters() {
    setupEventListeners();
}

// Handle form submission
function handleFormSubmit() {
  const form = document.getElementById('submit-form');
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send to Formspree or similar service
    console.log('Form submitted:', data);
    
    // Show success message
    const successMessage = document.getElementById('success-message');
    if (successMessage) {
      successMessage.classList.remove('hidden');
      form.reset();
    }
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  loadAppsData();
  initializeFilters();
  handleFormSubmit();
});

// Export for global access
window.filterApps = filterApps; 