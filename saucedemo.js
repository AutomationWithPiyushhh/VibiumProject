const fs = require('fs');
const { browserSync } = require('vibium');

// Synchronous delay helper for Vibium environment
function sleep(ms) {
    const buffer = new SharedArrayBuffer(4);
    const view = new Int32Array(buffer);
    Atomics.wait(view, 0, 0, ms);
}

// Force launch Microsoft Edge
const vibe = browserSync.launch({  
    channel: 'msedge' 
});

try {
    vibe.go('https://www.saucedemo.com/');
    sleep(3000); // Wait for page load

    // Login process
    vibe.find('#user-name').type('standard_user');
    vibe.find('#password').type('secret_sauce');
    vibe.find('#login-button').click();

    sleep(2000); // Wait for dashboard redirection

    // Save result
    const png = vibe.screenshot();
    fs.writeFileSync('saucedemo_edge_success.png', png);
    console.log('Login complete. Screenshot saved.');
} catch (error) {
    console.error('Automation failed:', error.message);
    const errPng = vibe.screenshot();
    fs.writeFileSync('debug_error.png', errPng);
} finally {
    vibe.quit();
}