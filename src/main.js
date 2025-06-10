import './style.css'

// Load apps data
let appsData = [];

async function loadAppsData() {
  try {
    const response = await fetch('/data/apps.json');
    appsData = await response.json();
    renderAppsTable(appsData);
  } catch (error) {
    console.error('Error loading apps data:', error);
  }
}

// Render apps table
function renderAppsTable(apps) {
  const tableBody = document.getElementById('apps-table-body');
  if (!tableBody) return;

  tableBody.innerHTML = '';
  
  apps.forEach(app => {
    const row = document.createElement('tr');
    row.className = 'border-b border-gray-200 hover:bg-gray-50';
    
    row.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${app.name}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${app.category}</td>
      <td class="px-6 py-4 whitespace-nowrap">
        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          app.usedInTR ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
        }">
          ${app.usedInTR ? 'Yaygın' : 'Nadir'}
        </span>
      </td>
      <td class="px-6 py-4 text-sm text-gray-500 max-w-xs">${app.alternative}</td>
      <td class="px-6 py-4 text-sm text-gray-500 max-w-xs">${app.reason}</td>
    `;
    
    tableBody.appendChild(row);
  });
}

// Filter functionality
function filterApps() {
  const categoryFilter = document.getElementById('category-filter');
  const usageFilter = document.getElementById('usage-filter');
  const searchInput = document.getElementById('search-input');
  
  if (!categoryFilter || !usageFilter || !searchInput) return;
  
  let filteredApps = [...appsData];
  
  // Category filter
  if (categoryFilter.value !== 'all') {
    filteredApps = filteredApps.filter(app => app.category === categoryFilter.value);
  }
  
  // Usage filter
  if (usageFilter.value !== 'all') {
    const isUsed = usageFilter.value === 'used';
    filteredApps = filteredApps.filter(app => app.usedInTR === isUsed);
  }
  
  // Search filter
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm) {
    filteredApps = filteredApps.filter(app => 
      app.name.toLowerCase().includes(searchTerm) ||
      app.alternative.toLowerCase().includes(searchTerm) ||
      app.reason.toLowerCase().includes(searchTerm)
    );
  }
  
  renderAppsTable(filteredApps);
}

// Initialize filters
function initializeFilters() {
  const categoryFilter = document.getElementById('category-filter');
  const usageFilter = document.getElementById('usage-filter');
  const searchInput = document.getElementById('search-input');
  
  if (categoryFilter) categoryFilter.addEventListener('change', filterApps);
  if (usageFilter) usageFilter.addEventListener('change', filterApps);
  if (searchInput) searchInput.addEventListener('input', filterApps);
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