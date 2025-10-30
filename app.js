// Global state
let dashboardData = null;
let budgetTableData = [];
let currentSortColumn = -1;
let currentSortDirection = 'asc';

// Initialize dashboard
async function initDashboard() {
    try {
        // Load data
        const response = await fetch('dashboard_ketahanan_pangan_data.json');
        dashboardData = await response.json();
        
        // Set current date
        setCurrentDate();
        
        // Initialize all sections
        initExecutiveSummary();
        initOverviewKPIs();
        initAvailability();
        initAccessibility();
        initAffordability();
        initAcceptability();
        initFiscalPolicy();
        initRisksProjections();
        initSidebar();
        
        // Initialize charts
        createProductionTrendChart();
        createPriceIndexChart();
        
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        showFallbackData();
    }
}

// Set current date in header
function setCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = new Date().toLocaleDateString('id-ID', options);
}

// Initialize Executive Summary
function initExecutiveSummary() {
    const container = document.getElementById('executiveSummary');
    
    const summaries = [
        {
            title: 'Availability (Ketersediaan)',
            text: 'Produksi pangan nasional stabil dengan surplus beras 3.2 juta ton. Cadangan strategis mencapai 1.8 juta ton, mencukupi kebutuhan 3 bulan.'
        },
        {
            title: 'Accessibility (Akses)',
            text: 'Infrastruktur distribusi meningkat 15%. Masih terdapat 127 kabupaten dengan akses terbatas yang memerlukan intervensi khusus.'
        },
        {
            title: 'Affordability (Keterjangkauan)',
            text: 'Inflasi pangan terkendali di 3.4%. Harga beras dan minyak goreng relatif stabil dengan subsidi tepat sasaran.'
        },
        {
            title: 'Acceptability (Penerimaan)',
            text: 'Standar kualitas pangan terpenuhi 92%. Program fortifikasi dan keamanan pangan berjalan efektif di seluruh wilayah.'
        },
        {
            title: 'Aspek Fiskal & Risiko',
            text: 'Alokasi RAPBN 2026 sebesar Rp 87.5 triliun. Risiko utama: perubahan iklim dan fluktuasi harga global.'
        }
    ];
    
    container.innerHTML = summaries.map(summary => `
        <div class="summary-card">
            <h4>${summary.title}</h4>
            <p>${summary.text}</p>
        </div>
    `).join('');
}

// Initialize Overview KPIs
function initOverviewKPIs() {
    const container = document.getElementById('overviewKPIs');
    
    const kpis = [
        { label: 'Surplus Produksi', value: '3.2 jt ton', change: '+8.5%', trend: 'positive' },
        { label: 'Inflasi Pangan', value: '3.4%', change: '-0.8%', trend: 'positive' },
        { label: 'Kabupaten Rawan', value: '127', change: '-15', trend: 'positive' },
        { label: 'Anggaran RAPBN', value: 'Rp 87.5 T', change: '+12%', trend: 'positive' }
    ];
    
    renderKPIs(container, kpis);
}

// Initialize Availability Section
function initAvailability() {
    const kpisContainer = document.getElementById('availabilityKPIs');
    const trafficContainer = document.getElementById('availabilityTrafficLight');
    
    const kpis = [
        { label: 'Produksi Beras', value: '31.5 jt ton', change: '+5.2%', trend: 'positive' },
        { label: 'Produksi Jagung', value: '23.8 jt ton', change: '+3.8%', trend: 'positive' },
        { label: 'Cadangan Pangan', value: '1.8 jt ton', change: '+12%', trend: 'positive' },
        { label: 'Self-Sufficiency', value: '94.5%', change: '+2.1%', trend: 'positive' }
    ];
    
    const trafficLights = [
        { name: 'Beras', status: 'green' },
        { name: 'Jagung', status: 'green' },
        { name: 'Kedelai', status: 'yellow' },
        { name: 'Gula', status: 'yellow' },
        { name: 'Bawang', status: 'green' },
        { name: 'Cabai', status: 'yellow' }
    ];
    
    renderKPIs(kpisContainer, kpis);
    renderTrafficLights(trafficContainer, trafficLights);
    
    // Create charts
    createAvailabilityCharts();
}

// Initialize Accessibility Section
function initAccessibility() {
    const kpisContainer = document.getElementById('accessibilityKPIs');
    const trafficContainer = document.getElementById('accessibilityTrafficLight');
    
    const kpis = [
        { label: 'Pasar Tradisional', value: '13,450', change: '+215', trend: 'positive' },
        { label: 'Kabupaten Terlayani', value: '387', change: '+12', trend: 'positive' },
        { label: 'Infrastruktur Baik', value: '78%', change: '+15%', trend: 'positive' },
        { label: 'Waktu Distribusi', value: '2.3 hari', change: '-0.5', trend: 'positive' }
    ];
    
    const trafficLights = [
        { name: 'Jawa', status: 'green' },
        { name: 'Sumatera', status: 'green' },
        { name: 'Kalimantan', status: 'yellow' },
        { name: 'Sulawesi', status: 'yellow' },
        { name: 'Papua', status: 'red' },
        { name: 'Maluku', status: 'yellow' }
    ];
    
    renderKPIs(kpisContainer, kpis);
    renderTrafficLights(trafficContainer, trafficLights);
    
    // Create charts
    createAccessibilityCharts();
}

// Initialize Affordability Section
function initAffordability() {
    const kpisContainer = document.getElementById('affordabilityKPIs');
    const trafficContainer = document.getElementById('affordabilityTrafficLight');
    
    const kpis = [
        { label: 'Inflasi Pangan', value: '3.4%', change: '-0.8%', trend: 'positive' },
        { label: 'Harga Beras Rata-rata', value: 'Rp 12,500/kg', change: '+2.1%', trend: 'negative' },
        { label: 'Subsidi Pangan', value: 'Rp 25.3 T', change: '+8%', trend: 'neutral' },
        { label: 'Daya Beli Index', value: '108.5', change: '+4.2', trend: 'positive' }
    ];
    
    const trafficLights = [
        { name: 'Beras Premium', status: 'green' },
        { name: 'Beras Medium', status: 'green' },
        { name: 'Minyak Goreng', status: 'green' },
        { name: 'Gula Pasir', status: 'yellow' },
        { name: 'Daging Sapi', status: 'red' },
        { name: 'Telur', status: 'green' }
    ];
    
    renderKPIs(kpisContainer, kpis);
    renderTrafficLights(trafficContainer, trafficLights);
    
    // Create charts
    createAffordabilityCharts();
}

// Initialize Acceptability Section
function initAcceptability() {
    const kpisContainer = document.getElementById('acceptabilityKPIs');
    const trafficContainer = document.getElementById('acceptabilityTrafficLight');
    
    const kpis = [
        { label: 'Standar Kualitas', value: '92%', change: '+3%', trend: 'positive' },
        { label: 'Sertifikasi Halal', value: '88%', change: '+5%', trend: 'positive' },
        { label: 'Fortifikasi', value: '75%', change: '+8%', trend: 'positive' },
        { label: 'Keamanan Pangan', value: '94%', change: '+2%', trend: 'positive' }
    ];
    
    const trafficLights = [
        { name: 'Beras', status: 'green' },
        { name: 'Produk Olahan', status: 'green' },
        { name: 'Daging & Telur', status: 'green' },
        { name: 'Sayuran', status: 'yellow' },
        { name: 'Buah-buahan', status: 'green' },
        { name: 'Susu', status: 'green' }
    ];
    
    renderKPIs(kpisContainer, kpis);
    renderTrafficLights(trafficContainer, trafficLights);
    
    // Create charts
    createAcceptabilityCharts();
}

// Initialize Fiscal Policy Section
function initFiscalPolicy() {
    const kpisContainer = document.getElementById('fiscalKPIs');
    
    const kpis = [
        { label: 'Total Anggaran', value: 'Rp 87.5 T', change: '+12%', trend: 'positive' },
        { label: 'Subsidi Pupuk', value: 'Rp 22.8 T', change: '+8%', trend: 'neutral' },
        { label: 'Bantuan Pangan', value: 'Rp 25.3 T', change: '+15%', trend: 'positive' },
        { label: 'Realisasi 2025', value: '87.5%', change: 'On Track', trend: 'positive' }
    ];
    
    renderKPIs(kpisContainer, kpis);
    
    // Initialize budget table
    initBudgetTable();
    
    // Create charts
    createFiscalCharts();
}

// Initialize Risks & Projections Section
function initRisksProjections() {
    const kpisContainer = document.getElementById('risksKPIs');
    const alertsContainer = document.getElementById('riskAlerts');
    
    const kpis = [
        { label: 'Risk Score', value: 'Moderate', change: 'Stable', trend: 'neutral' },
        { label: 'Proyeksi Produksi 2026', value: '+6.5%', change: 'Optimistic', trend: 'positive' },
        { label: 'Climate Risk Index', value: '45/100', change: '+5', trend: 'negative' },
        { label: 'Import Dependency', value: '8.5%', change: '-2.1%', trend: 'positive' }
    ];
    
    const alerts = [
        {
            type: 'warning',
            title: 'Peringatan Perubahan Iklim',
            desc: 'Prediksi El Niño moderat dapat mempengaruhi produksi padi di musim tanam berikutnya. Perlu mitigasi melalui irigasi dan diversifikasi.'
        },
        {
            type: 'info',
            title: 'Proyeksi Harga Global',
            desc: 'Harga komoditas global diperkirakan stabil hingga akhir 2026. Cadangan devisa mencukupi untuk impor darurat jika diperlukan.'
        },
        {
            type: 'warning',
            title: 'Ketergantungan Impor Kedelai',
            desc: 'Ketergantungan impor kedelai masih tinggi (65%). Perlu percepatan program swasembada melalui intensifikasi dan ekstensifikasi.'
        }
    ];
    
    renderKPIs(kpisContainer, kpis);
    renderAlerts(alertsContainer, alerts);
    
    // Create charts
    createRisksCharts();
}

// Initialize Sidebar
function initSidebar() {
    const recommendationsContainer = document.getElementById('fiscalRecommendations');
    const trafficSummaryContainer = document.getElementById('trafficLightSummary');
    
    const recommendations = [
        'Tingkatkan subsidi pupuk untuk meningkatkan produktivitas petani kecil',
        'Perkuat cadangan pangan strategis untuk mengantisipasi risiko iklim',
        'Optimalkan distribusi bantuan pangan ke 127 kabupaten rawan pangan',
        'Percepat program diversifikasi untuk mengurangi ketergantungan impor'
    ];
    
    recommendationsContainer.innerHTML = recommendations.map(rec => `
        <div class="recommendation-item">${rec}</div>
    `).join('');
    
    // Traffic light summary
    const summary = [
        { color: 'green', label: 'Aman', count: 18 },
        { color: 'yellow', label: 'Perhatian', count: 8 },
        { color: 'red', label: 'Kritis', count: 2 }
    ];
    
    trafficSummaryContainer.innerHTML = summary.map(item => `
        <div class="traffic-summary-item">
            <div style="display: flex; align-items: center;">
                <div class="traffic-dot ${item.color}"></div>
                <span>${item.label}</span>
            </div>
            <strong>${item.count}</strong>
        </div>
    `).join('');
}

// Render KPIs
function renderKPIs(container, kpis) {
    container.innerHTML = kpis.map(kpi => `
        <div class="kpi-card">
            <div class="kpi-label">${kpi.label}</div>
            <div class="kpi-value">${kpi.value}</div>
            <div class="kpi-change ${kpi.trend}">
                ${kpi.trend === 'positive' ? '↑' : kpi.trend === 'negative' ? '↓' : '→'} ${kpi.change}
            </div>
        </div>
    `).join('');
}

// Render Traffic Lights
function renderTrafficLights(container, lights) {
    container.innerHTML = lights.map(light => `
        <div class="traffic-light-item">
            <span class="traffic-light-name">${light.name}</span>
            <div class="traffic-light-indicator ${light.status}"></div>
        </div>
    `).join('');
}

// Render Alerts
function renderAlerts(container, alerts) {
    container.innerHTML = alerts.map(alert => `
        <div class="alert-item ${alert.type}">
            <div class="alert-title">${alert.title}</div>
            <div class="alert-desc">${alert.desc}</div>
        </div>
    `).join('');
}

// Initialize Budget Table
function initBudgetTable() {
    budgetTableData = [
        { program: 'Subsidi Pupuk', budget: 22800, realization: 85, status: 'on-track' },
        { program: 'Bantuan Pangan (Rastra/BPNT)', budget: 25300, realization: 92, status: 'on-track' },
        { program: 'Cadangan Pangan Pemerintah', budget: 8500, realization: 78, status: 'on-track' },
        { program: 'Infrastruktur Pertanian', budget: 12400, realization: 65, status: 'at-risk' },
        { program: 'Riset & Pengembangan', budget: 3200, realization: 88, status: 'on-track' },
        { program: 'Penyuluhan & Pelatihan', budget: 2800, realization: 72, status: 'on-track' },
        { program: 'Stabilisasi Harga Pangan', budget: 6500, realization: 58, status: 'at-risk' },
        { program: 'Fortifikasi Pangan', budget: 1800, realization: 91, status: 'on-track' },
        { program: 'Diversifikasi Pangan', budget: 2400, realization: 82, status: 'on-track' },
        { program: 'Sistem Informasi Pangan', budget: 1800, realization: 95, status: 'on-track' }
    ];
    
    renderBudgetTable(budgetTableData);
    
    // Search functionality
    document.getElementById('budgetSearch').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = budgetTableData.filter(item => 
            item.program.toLowerCase().includes(searchTerm)
        );
        renderBudgetTable(filtered);
    });
}

// Render Budget Table
function renderBudgetTable(data) {
    const tbody = document.getElementById('budgetTableBody');
    
    tbody.innerHTML = data.map(item => {
        const statusClass = item.status === 'on-track' ? 'on-track' : 
                           item.status === 'at-risk' ? 'at-risk' : 'delayed';
        const statusText = item.status === 'on-track' ? 'On Track' : 
                          item.status === 'at-risk' ? 'At Risk' : 'Delayed';
        
        return `
            <tr>
                <td>${item.program}</td>
                <td>${item.budget.toLocaleString('id-ID')}</td>
                <td>${item.realization}%</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            </tr>
        `;
    }).join('');
}

// Sort Budget Table
function sortBudgetTable(columnIndex) {
    if (currentSortColumn === columnIndex) {
        currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        currentSortColumn = columnIndex;
        currentSortDirection = 'asc';
    }
    
    budgetTableData.sort((a, b) => {
        let aVal, bVal;
        
        switch(columnIndex) {
            case 0: // Program
                aVal = a.program;
                bVal = b.program;
                break;
            case 1: // Budget
                aVal = a.budget;
                bVal = b.budget;
                break;
            case 2: // Realization
                aVal = a.realization;
                bVal = b.realization;
                break;
            case 3: // Status
                aVal = a.status;
                bVal = b.status;
                break;
        }
        
        if (currentSortDirection === 'asc') {
            return aVal > bVal ? 1 : -1;
        } else {
            return aVal < bVal ? 1 : -1;
        }
    });
    
    renderBudgetTable(budgetTableData);
}

// Chart creation functions
function createProductionTrendChart() {
    const ctx = document.getElementById('productionTrendChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
            datasets: [
                {
                    label: 'Beras',
                    data: [27.5, 28.2, 29.1, 30.2, 31.0, 31.5],
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    tension: 0.4
                },
                {
                    label: 'Jagung',
                    data: [19.8, 20.5, 21.2, 22.1, 23.0, 23.8],
                    borderColor: '#FFC185',
                    backgroundColor: 'rgba(255, 193, 133, 0.1)',
                    tension: 0.4
                },
                {
                    label: 'Kedelai',
                    data: [0.8, 0.9, 0.95, 1.0, 1.1, 1.2],
                    borderColor: '#B4413C',
                    backgroundColor: 'rgba(180, 65, 60, 0.1)',
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Juta Ton'
                    }
                }
            }
        }
    });
}

function createPriceIndexChart() {
    const ctx = document.getElementById('priceIndexChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt'],
            datasets: [{
                label: 'Indeks Harga Pangan',
                data: [102.5, 103.2, 104.1, 103.8, 104.5, 105.2, 105.8, 106.1, 106.5, 106.8],
                backgroundColor: '#1FB8CD'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Indeks (2018=100)'
                    }
                }
            }
        }
    });
}

function createAvailabilityCharts() {
    // Chart 1: Production by commodity
    const ctx1 = document.getElementById('availabilityChart1').getContext('2d');
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['Beras', 'Jagung', 'Kedelai', 'Gula', 'Bawang', 'Cabai'],
            datasets: [{
                label: 'Produksi 2025 (Ribu Ton)',
                data: [31500, 23800, 1200, 2800, 1650, 2400],
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F', '#DB4545', '#D2BA4C']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { display: false } }
        }
    });
    
    // Chart 2: Strategic reserves
    const ctx2 = document.getElementById('availabilityChart2').getContext('2d');
    new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['Beras', 'Jagung', 'Gula', 'Lainnya'],
            datasets: [{
                data: [1800, 850, 450, 300],
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

function createAccessibilityCharts() {
    const ctx1 = document.getElementById('accessibilityChart1').getContext('2d');
    new Chart(ctx1, {
        type: 'line',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
            datasets: [{
                label: 'Infrastruktur Baik (%)',
                data: [58, 62, 67, 70, 75, 78],
                borderColor: '#1FB8CD',
                backgroundColor: 'rgba(31, 184, 205, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, max: 100 } }
        }
    });
    
    const ctx2 = document.getElementById('accessibilityChart2').getContext('2d');
    new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['Jawa', 'Sumatera', 'Kalimantan', 'Sulawesi', 'Papua', 'Maluku'],
            datasets: [{
                label: 'Jumlah Pasar',
                data: [5200, 3100, 1850, 1600, 950, 750],
                backgroundColor: '#1FB8CD'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { display: false } }
        }
    });
}

function createAffordabilityCharts() {
    const ctx1 = document.getElementById('affordabilityChart1').getContext('2d');
    new Chart(ctx1, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt'],
            datasets: [{
                label: 'Inflasi Pangan (%)',
                data: [4.2, 4.1, 3.9, 3.7, 3.6, 3.5, 3.4, 3.4, 3.3, 3.4],
                borderColor: '#1FB8CD',
                backgroundColor: 'rgba(31, 184, 205, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
        }
    });
    
    const ctx2 = document.getElementById('affordabilityChart2').getContext('2d');
    new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['Beras', 'Minyak Goreng', 'Gula', 'Daging Sapi', 'Telur', 'Cabai'],
            datasets: [{
                label: 'Harga (Rp/kg)',
                data: [12500, 14800, 13200, 135000, 28500, 35000],
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F', '#DB4545', '#D2BA4C']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { display: false } }
        }
    });
}

function createAcceptabilityCharts() {
    const ctx1 = document.getElementById('acceptabilityChart1').getContext('2d');
    new Chart(ctx1, {
        type: 'radar',
        data: {
            labels: ['Kualitas', 'Keamanan', 'Halal', 'Fortifikasi', 'Higienitas', 'Label'],
            datasets: [{
                label: 'Skor Penerimaan',
                data: [92, 94, 88, 75, 89, 86],
                borderColor: '#1FB8CD',
                backgroundColor: 'rgba(31, 184, 205, 0.2)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
    
    const ctx2 = document.getElementById('acceptabilityChart2').getContext('2d');
    new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['Karbohidrat', 'Protein', 'Sayur/Buah', 'Lainnya'],
            datasets: [{
                data: [45, 25, 20, 10],
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

function createFiscalCharts() {
    const ctx1 = document.getElementById('fiscalChart1').getContext('2d');
    new Chart(ctx1, {
        type: 'pie',
        data: {
            labels: ['Subsidi Pupuk', 'Bantuan Pangan', 'Infrastruktur', 'Cadangan', 'Lainnya'],
            datasets: [{
                data: [22800, 25300, 12400, 8500, 18500],
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F', '#DB4545']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
    
    const ctx2 = document.getElementById('fiscalChart2').getContext('2d');
    new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
            datasets: [{
                label: 'Subsidi Pupuk (Triliun Rp)',
                data: [16.5, 18.2, 19.5, 20.8, 21.5, 22.8, 24.0],
                borderColor: '#1FB8CD',
                backgroundColor: 'rgba(31, 184, 205, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
        }
    });
}

function createRisksCharts() {
    const ctx1 = document.getElementById('risksChart1').getContext('2d');
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['Beras', 'Jagung', 'Kedelai', 'Gula', 'Hortikultura'],
            datasets: [
                {
                    label: 'Proyeksi 2026',
                    data: [33.5, 25.3, 1.4, 3.1, 28.5],
                    backgroundColor: '#1FB8CD'
                },
                {
                    label: 'Realisasi 2025',
                    data: [31.5, 23.8, 1.2, 2.8, 26.2],
                    backgroundColor: '#FFC185'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
    
    const ctx2 = document.getElementById('risksChart2').getContext('2d');
    new Chart(ctx2, {
        type: 'radar',
        data: {
            labels: ['Iklim', 'Harga Global', 'Produksi', 'Distribusi', 'Ketahanan'],
            datasets: [{
                label: 'Risk Score',
                data: [65, 45, 35, 40, 30],
                borderColor: '#B4413C',
                backgroundColor: 'rgba(180, 65, 60, 0.2)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// Show fallback data if JSON loading fails
function showFallbackData() {
    console.log('Using fallback data');
    // Data is already initialized in each init function
}

// Tab navigation
document.addEventListener('DOMContentLoaded', () => {
    // Initialize dashboard
    initDashboard();
    
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
});