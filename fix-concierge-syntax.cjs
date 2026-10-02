const fs = require('fs');
const file = 'c:\\Users\\pablo\\OneDrive\\Desktop\\proyectos web\\vermilion\\components\\ui\\ConciergeWidget.tsx';
let content = fs.readFileSync(file, 'utf8');

// Fix handleSendMessage calls
content = content.replace(/handleSendMessage\('\{t\('concierge\.sugg1'\)\}'\)/g, "handleSendMessage(t('concierge.sugg1'))");
content = content.replace(/handleSendMessage\('\{t\('concierge\.sugg2'\)\}'\)/g, "handleSendMessage(t('concierge.sugg2'))");
content = content.replace(/handleSendMessage\('\{t\('concierge\.sugg3'\)\}'\)/g, "handleSendMessage(t('concierge.sugg3'))");

fs.writeFileSync(file, content, 'utf8');
