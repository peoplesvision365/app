class LottoBall extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const number = this.getAttribute('number');
        const color = this.getAttribute('color');

        const circle = document.createElement('div');
        circle.style.backgroundColor = color;
        circle.style.width = '50px';
        circle.style.height = '50px';
        circle.style.borderRadius = '50%';
        circle.style.display = 'flex';
        circle.style.justifyContent = 'center';
        circle.style.alignItems = 'center';
        circle.style.fontSize = '1.5rem';
        circle.style.fontWeight = 'bold';
        circle.style.color = 'white';

        circle.textContent = number;

        shadow.appendChild(circle);
    }
}

customElements.define('lotto-ball', LottoBall);

const lottoNumbersContainer = document.getElementById('lotto-numbers');
const generateBtn = document.getElementById('generate-btn');
const themeButtons = document.querySelectorAll('.theme-btn');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeButtons.forEach((button) => {
        button.setAttribute('aria-pressed', button.dataset.theme === theme ? 'true' : 'false');
    });
}

function initTheme() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
        setTheme(storedTheme);
        return;
    }

    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
}

function generateLottoNumbers() {
    lottoNumbersContainer.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3'];
    let colorIndex = 0;

    for (const number of numbers) {
        const lottoBall = document.createElement('lotto-ball');
        lottoBall.setAttribute('number', number);
        lottoBall.setAttribute('color', colors[colorIndex++]);
        lottoNumbersContainer.appendChild(lottoBall);
    }
}

generateBtn.addEventListener('click', generateLottoNumbers);
themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        setTheme(button.dataset.theme);
    });
});

// Initial generation
initTheme();
generateLottoNumbers();
