// Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAu2rosyyF2AJi_hVo-8XhXGsofTJ9zzdQ",
    authDomain: "myapp-1bc82.firebaseapp.com",
    projectId: "myapp-1bc82",
    storageBucket: "myapp-1bc82.firebasestorage.app",
    messagingSenderId: "723618358633",
    appId: "1:723618358633:web:24c6a343707c53de7009f8",
    measurementId: "G-2T0XL00LHH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const output = document.getElementById('terminalOutput');
const input = document.getElementById('cmdInput');
const inputArea = document.getElementById('inputArea');
const promptUser = document.getElementById('promptUser');

let roundNumbers = [];
let currentStep = 'country'; 
let selectedCountry = '';
let selectedServer = '';
let authMode = 'login'; // 'login' or 'signup'
let tempEmail = '';

const CONTACT_SUPPORT = "+94716344483";
const countries = ["SRI LANKA", "INDIA", "BRAZIL", "TURKEY", "RUSSIA", "VIETNAM", "GLOBAL"];

// SECURITY PROTOCOL: Block Ctrl+U, F12, and Context Menu
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        printLine("SECURITY ALERT: SOURCE VIEWING IS RESTRICTED.", "error");
        return false;
    }
    if (e.key === 'F12') {
        e.preventDefault();
        printLine("SECURITY ALERT: DEVTOOLS ACCESS DENIED.", "error");
        return false;
    }
    if (e.ctrlKey && e.shiftKey && (e.key === 'i' || e.key === 'I')) {
        e.preventDefault();
        return false;
    }
});

document.addEventListener('contextmenu', e => e.preventDefault(), false);

// 1. Boot Sequence
async function boot() {
    await printLine("INITIALIZING SECURITY PROTOCOLS...", "system");
    await sleep(500);
    await printLine("CONNECTING TO GLOBAL NODE NETWORK...", "system");
    await sleep(800);
    showCountrySelection();
}

function showCountrySelection() {
    printLine("--------------------------------------------------");
    printLine("SELECT OPERATIONAL REGION:", "warning");
    const grid = document.createElement('div');
    grid.className = 'server-grid';
    countries.forEach(c => {
        const btn = document.createElement('div');
        btn.className = 'server-btn';
        btn.innerText = c;
        btn.onclick = () => selectCountry(c);
        grid.appendChild(btn);
    });
    output.appendChild(grid);
    scrollToBottom();
}

async function selectCountry(country) {
    selectedCountry = country;
    printLine(`REGION SELECTED: [${country}]`, "success");
    await printLine("FETCHING LOCAL NODES...", "system");
    await sleep(600);
    showServerSelection(country === "SRI LANKA" ? "SL" : "GL");
}

function showServerSelection(srvPrefix) {
    printLine("--------------------------------------------------");
    printLine(`SELECT ${selectedCountry} ENCRYPTION SERVER:`, "warning");
    const grid = document.createElement('div');
    grid.className = 'server-grid';
    
    for(let i=0; i<20; i++) {
        const srvID = `${srvPrefix}${Math.floor(100000 + Math.random() * 900000)}`;
        const btn = document.createElement('div');
        btn.className = 'server-btn';
        btn.innerText = srvID;
        btn.onclick = () => initiateAuth(srvID);
        grid.appendChild(btn);
    }
    output.appendChild(grid);
    scrollToBottom();
}

async function initiateAuth(server) {
    selectedServer = server;
    printLine(`SERVER LINKED: ${server}`, "system");
    await sleep(500);
    printLine("--------------------------------------------------");
    printLine("SECURE FIREBASE LOGIN REQUIRED.", "warning");
    printLine("Type 'LOGIN' or 'SIGNUP' to proceed.");
    
    inputArea.classList.remove('hidden');
    currentStep = 'auth_choice';
    input.placeholder = "Command...";
    input.focus();
}

async function finalizeBoot(user) {
    printLine(`AUTHENTICATED AS: ${user.email}`, "success");
    printLine(`CONNECTING TO SECURE CORE...`, "system");
    await sleep(1000);
    printLine("HANDSHAKE COMPLETE. ACCESS GRANTED.", "success");
    printLine("--------------------------------------------------");
    printLine("AVIATOR INTELLIGENCE SYSTEM v5.0 [CONNECTED]");
    printLine(`NODE: ${selectedServer} | REGION: ${selectedCountry}`);
    printLine("Type 'HELP' for commands.");
    
    promptUser.innerText = `USR@${selectedServer}:~$`;
    input.placeholder = "";
    currentStep = 'ready';
}

// 2. Command Processor
const commands = {
    'HELP': () => {
        printLine('CORE COMMANDS:', 'success');
        printLine('  ADD [n]    - Record round number (5x+)');
        printLine('  LIST       - Show history');
        printLine('  ANALYZE    - Execute prediction');
        printLine('  LOGOUT     - Terminate session');
        printLine('  CLEAR      - Clear terminal');
    },
    'ADD': (args) => {
        const val = parseInt(args[0]);
        if (isNaN(val)) return printLine('ERROR: Invalid round ID.', 'error');
        roundNumbers.push(val);
        roundNumbers.sort((a, b) => a - b);
        printLine(`ROUND #${val} CACHED.`, "success");
    },
    'LIST': () => {
        if (roundNumbers.length === 0) return printLine('BUFFER EMPTY.', 'warning');
        printLine(`ACTIVE DATASET: [${roundNumbers.join(', ')}]`);
    },
    'LOGOUT': async () => {
        await auth.signOut();
        location.reload();
    },
    'CLEAR': () => {
        output.innerHTML = '';
    },
    'ANALYZE': () => {
        if (roundNumbers.length < 2) return printLine('ERROR: Insufficient data.', 'error');
        printLine('CALCULATING PROBABILITY WINDOWS...', 'system');
        
        setTimeout(() => {
            let intervals = [];
            for (let i = 1; i < roundNumbers.length; i++) intervals.push(roundNumbers[i] - roundNumbers[i-1]);

            const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
            const lastRound = roundNumbers[roundNumbers.length - 1];
            const nextStart = Math.floor(lastRound + avgInterval - 2);
            const nextEnd = nextStart + 5;

            const block = document.createElement('div');
            block.className = 'prediction-block';
            block.innerHTML = `
                <div class="line success">>>> PREDICTION ENGINE RESULT <<<</div>
                <div class="line text-xl">TARGET: <span class="highlight">RD ${nextStart} - ${nextEnd}</span></div>
                <div class="line mt-2 italic text-xs text-slate-500">Node: ${selectedServer}</div>
            `;
            output.appendChild(block);
            scrollToBottom();
        }, 800);
    }
};

// Input Handling
input.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
        const val = input.value.trim();
        if (!val) return;
        input.value = '';

        if (currentStep === 'auth_choice') {
            if (val.toUpperCase() === 'LOGIN') {
                authMode = 'login';
                currentStep = 'get_email';
                printLine("ENTER EMAIL:");
            } else if (val.toUpperCase() === 'SIGNUP') {
                authMode = 'signup';
                currentStep = 'get_email';
                printLine("ENTER NEW EMAIL:");
            }
            return;
        }

        if (currentStep === 'get_email') {
            tempEmail = val;
            currentStep = 'get_password';
            printLine("ENTER PASSWORD:");
            input.type = "password";
            return;
        }

        if (currentStep === 'get_password') {
            input.type = "text";
            try {
                printLine("PROCESSING FIREBASE AUTH...", "system");
                let userCredential;
                if (authMode === 'login') {
                    userCredential = await signInWithEmailAndPassword(auth, tempEmail, val);
                } else {
                    userCredential = await createUserWithEmailAndPassword(auth, tempEmail, val);
                }
                finalizeBoot(userCredential.user);
            } catch (err) {
                printLine(`AUTH ERROR: ${err.message}`, "error");
                printLine(`SUPPORT: ${CONTACT_SUPPORT}`, "warning");
                currentStep = 'auth_choice';
                printLine("Type 'LOGIN' or 'SIGNUP' to try again.");
            }
            return;
        }

        if (currentStep === 'ready') {
            printLine(`<span class="prompt">${promptUser.innerText}</span> ${val}`);
            const parts = val.toUpperCase().split(' ');
            if (commands[parts[0]]) commands[parts[0]](parts.slice(1));
            else printLine(`UNKNOWN COMMAND: ${parts[0]}`, "error");
        }
    }
});

function printLine(text, type = '') {
    return new Promise(resolve => {
        const line = document.createElement('div');
        line.className = `line ${type}`;
        line.innerHTML = text;
        output.appendChild(line);
        scrollToBottom();
        resolve();
    });
}

function scrollToBottom() { output.scrollTop = output.scrollHeight; }
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
document.addEventListener('click', () => input.focus());

boot();