// Configuració de microserveis (actualitzar amb URLs reals)
const SERVICES = {
    FAVORITES: 'http://localhost:3001',
    WISHLIST: 'https://service-wishlist-production.up.railway.app',
    COMMENTS: 'https://service-comments-production.up.railway.app',
    RESTCOUNTRIES: 'https://restcountries.com/v3.1'
};

let currentCountry = null;
let favorites = [];
let wishlist = [];
let searchHistory = [];

// inicialitzar l'aplicació
document.addEventListener('DOMContentLoaded', () => {
    loadFavorites();
    loadWishlist();
    loadSearchHistory();
    
    // event listeners
    document.getElementById('countrySearch').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchCountry();
    });
    
    document.getElementById('countrySearch').addEventListener('input', (e) => {
        if (e.target.value.length > 1) {
            searchSuggestions(e.target.value);
        } else {
            document.getElementById('suggestions').classList.remove('active');
        }
    });
});

// Buscar país
async function searchCountry() {
    const searchTerm = document.getElementById('countrySearch').value.trim();
    
    if (!searchTerm) {
        showNotification('Si us plau, introduïu un país', 'error');
        return;
    }

    try {
        const response = await fetch(
            `${SERVICES.RESTCOUNTRIES}/name/${searchTerm}`
        );
        
        if (!response.ok) {
            showNotification('País no trobat', 'error');
            return;
        }

        const countries = await response.json();
        const country = countries[0];
        
        currentCountry = country;
        displayCountryInfo(country);
        
        // guardar a historial
        addToSearchHistory(country.name.common);
        
        // carregar comentaris
        await loadComments(country.name.common);
        
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error en la búsqueda', 'error');
    }
}

// Suggestions
async function searchSuggestions(term) {
    try {
        const response = await fetch(
            `${SERVICES.RESTCOUNTRIES}/name/${term}`
        );
        
        if (!response.ok) return;

        const countries = await response.json();
        const suggestionsDiv = document.getElementById('suggestions');
        
        suggestionsDiv.innerHTML = countries
            .slice(0, 5)
            .map(country => `
                <div class="suggestion-item" onclick="selectCountry('${country.name.common}')">
                    <strong>${country.name.common}</strong>
                    <span style="margin-left: 10px; color: #999;">
                        ${country.region}
                    </span>
                </div>
            `)
            .join('');
        
        suggestionsDiv.classList.add('active');
        
    } catch (error) {
        console.error('Error fetching suggestions:', error);
    }
}

// Seleccionar país del dropdown
function selectCountry(countryName) {
    document.getElementById('countrySearch').value = countryName;
    document.getElementById('suggestions').classList.remove('active');
    searchCountry();
}

// Mostrar informació del país
function displayCountryInfo(country) {
    document.getElementById('resultSection').style.display = 'block';
    document.getElementById('countryName').textContent = country.name.common;
    document.getElementById('countryFlag').src = country.flags.svg;
    document.getElementById('capital').textContent = 
        country.capital ? country.capital[0] : 'N/A';
    document.getElementById('region').textContent = country.region;
    document.getElementById('population').textContent = 
        new Intl.NumberFormat('ca-ES').format(country.population);
    document.getElementById('area').textContent = 
        new Intl.NumberFormat('ca-ES').format(country.area) + ' km²';
    
    const currencies = country.currencies ? Object.keys(country.currencies) : [];
    document.getElementById('currency').textContent = 
        currencies.length > 0 ? currencies[0] : 'N/A';
    
    const languages = country.languages ? Object.values(country.languages) : [];
    document.getElementById('language').textContent = 
        languages.length > 0 ? languages.join(', ') : 'N/A';
    
    // actualitzar estat dels botons
    updateFavoriteButton();
    updateWishlistButton();
    
    // scroll a la secció de resultats
    document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth' });
}

// ===== FAVORITES SERVICE =====
async function toggleFavorite() {
    if (!currentCountry) return;
    
    const countryName = currentCountry.name.common;
    const isFavorite = favorites.includes(countryName);
    
    try {
        const url = `${SERVICES.FAVORITES}/api/favorites/${countryName}`;
        const method = isFavorite ? 'DELETE' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: !isFavorite ? JSON.stringify({ 
                name: countryName,
                data: currentCountry 
            }) : undefined
        });
        
        if (response.ok) {
            if (isFavorite) {
                favorites = favorites.filter(f => f !== countryName);
                showNotification('Eliminat de Favorits', 'success');
            } else {
                favorites.push(countryName);
                showNotification('Afegit a Favorits!', 'success');
            }
            updateFavoriteButton();
            displayFavorites();
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error al processar favorit', 'error');
    }
}

function updateFavoriteButton() {
    const btn = document.querySelector('.btn-favorite');
    if (currentCountry && favorites.includes(currentCountry.name.common)) {
        btn.classList.add('active');
    } else {
        btn.classList.remove('active');
    }
}

async function loadFavorites() {
    try {
        const response = await fetch(`${SERVICES.FAVORITES}/api/favorites`);
        if (response.ok) {
            favorites = await response.json();
            displayFavorites();
        }
    } catch (error) {
        console.error('Error loading favorites:', error);
    }
}

function displayFavorites() {
    const favoritesList = document.getElementById('favoritesList');
    
    if (favorites.length === 0) {
        favoritesList.innerHTML = '<div class="empty-message">No hi ha favorits</div>';
        return;
    }
    
    favoritesList.innerHTML = favorites.map(fav => `
        <div class="item">
            <span class="item-name">⭐ ${fav}</span>
            <div class="item-actions">
                <button class="remove-btn" onclick="removeFavorite('${fav}')">Treure</button>
            </div>
        </div>
    `).join('');
}

async function removeFavorite(countryName) {
    try {
        const response = await fetch(
            `${SERVICES.FAVORITES}/api/favorites/${countryName}`,
            { method: 'DELETE' }
        );
        
        if (response.ok) {
            favorites = favorites.filter(f => f !== countryName);
            displayFavorites();
            updateFavoriteButton();
            showNotification('Eliminat de Favorits', 'success');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// ===== WISHLIST SERVICE =====
async function toggleWishlist() {
    if (!currentCountry) return;
    
    const countryName = currentCountry.name.common;
    const isInWishlist = wishlist.includes(countryName);
    
    try {
        const url = `${SERVICES.WISHLIST}/api/wishlist/${countryName}`;
        const method = isInWishlist ? 'DELETE' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: !isInWishlist ? JSON.stringify({ name: countryName }) : undefined
        });
        
        if (response.ok) {
            if (isInWishlist) {
                wishlist = wishlist.filter(w => w !== countryName);
                showNotification('Eliminat de Wishlist', 'success');
            } else {
                wishlist.push(countryName);
                showNotification('Afegit a Wishlist!', 'success');
            }
            updateWishlistButton();
            displayWishlist();
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error al processar wishlist', 'error');
    }
}

function updateWishlistButton() {
    const btn = document.querySelector('.btn-wishlist');
    if (currentCountry && wishlist.includes(currentCountry.name.common)) {
        btn.classList.add('active');
    } else {
        btn.classList.remove('active');
    }
}

async function loadWishlist() {
    try {
        const response = await fetch(`${SERVICES.WISHLIST}/api/wishlist`);
        if (response.ok) {
            wishlist = await response.json();
            displayWishlist();
        }
    } catch (error) {
        console.error('Error loading wishlist:', error);
    }
}

function displayWishlist() {
    const wishlistSection = document.getElementById('wishlistList');
    
    if (wishlist.length === 0) {
        wishlistSection.innerHTML = '<div class="empty-message">Wishlist buida</div>';
        return;
    }
    
    wishlistSection.innerHTML = wishlist.map(item => `
        <div class="item">
            <span class="item-name">📌 ${item}</span>
            <div class="item-actions">
                <button class="remove-btn" onclick="removeFromWishlist('${item}')">Treure</button>
            </div>
        </div>
    `).join('');
}

async function removeFromWishlist(countryName) {
    try {
        const response = await fetch(
            `${SERVICES.WISHLIST}/api/wishlist/${countryName}`,
            { method: 'DELETE' }
        );
        
        if (response.ok) {
            wishlist = wishlist.filter(w => w !== countryName);
            displayWishlist();
            updateWishlistButton();
            showNotification('Eliminat de Wishlist', 'success');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// ===== COMMENTS SERVICE =====
async function addComment() {
    if (!currentCountry) return;
    
    const commentText = document.getElementById('commentText').value.trim();
    if (!commentText) {
        showNotification('El comentari no pot estar buit', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${SERVICES.COMMENTS}/api/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                country: currentCountry.name.common,
                text: commentText,
                timestamp: new Date().toISOString()
            })
        });
        
        if (response.ok) {
            document.getElementById('commentText').value = '';
            showNotification('Comentari publicat!', 'success');
            await loadComments(currentCountry.name.common);
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error al publicar comentari', 'error');
    }
}

async function loadComments(countryName) {
    try {
        const response = await fetch(
            `${SERVICES.COMMENTS}/api/comments/${countryName}`
        );
        
        if (response.ok) {
            const comments = await response.json();
            displayComments(comments);
        }
    } catch (error) {
        console.error('Error loading comments:', error);
    }
}

function displayComments(comments) {
    const commentsList = document.getElementById('commentsList');
    
    if (!comments || comments.length === 0) {
        commentsList.innerHTML = '<div class="empty-message">Sense comentaris encara</div>';
        return;
    }
    
    commentsList.innerHTML = comments.map(comment => `
        <div class="comment-item">
            <strong>Anònim</strong>
            <p>${escapeHtml(comment.text)}</p>
            <div class="comment-time">
                ${new Date(comment.timestamp).toLocaleDateString('ca-ES', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
            </div>
        </div>
    `).join('');
}

// ===== SEARCH HISTORY =====
function addToSearchHistory(country) {
    if (!searchHistory.includes(country)) {
        searchHistory.unshift(country);
        if (searchHistory.length > 10) searchHistory.pop();
        displaySearchHistory();
    }
}

function displaySearchHistory() {
    const historyList = document.getElementById('historyList');
    
    if (searchHistory.length === 0) {
        historyList.innerHTML = '<div class="empty-message">Sense historial</div>';
        return;
    }
    
    historyList.innerHTML = searchHistory.map((country, index) => `
        <div class="item">
            <span class="item-name">🔍 ${country}</span>
            <div class="item-actions">
                <button onclick="document.getElementById('countrySearch').value='${country}'; searchCountry();" 
                        style="background: #667eea; color: white; padding: 5px 10px; border-radius: 4px; border: none; cursor: pointer;">
                    Buscar
                </button>
            </div>
        </div>
    `).join('');
}

function loadSearchHistory() {
    // carregat des de sessionStorage o inicialitzat buida
    const stored = sessionStorage.getItem('searchHistory');
    if (stored) {
        searchHistory = JSON.parse(stored);
        displaySearchHistory();
    }
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification show ${type}`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
