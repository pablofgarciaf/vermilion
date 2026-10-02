const fs = require('fs');

const file = 'c:\\Users\\pablo\\OneDrive\\Desktop\\proyectos web\\vermilion\\components\\ui\\ConciergeWidget.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/AI Concierge <span className="text-\[10px\] bg-amber-400\/20 text-amber-300 px-1\.5 py-0\.5 rounded-md">24\/7 Instant<\/span>/g, 
  "{t('concierge.aiConcierge')} <span className=\"text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded-md\">{t('concierge.aiConciergeBadge')}</span>");

content = content.replace(/Instant quotes, day-by-day itineraries & customized recommendations\./g, 
  "{t('concierge.aiConciergeDesc')}");

content = content.replace(/Direct WhatsApp Advisor <span className="text-\[10px\] bg-emerald-500\/20 text-emerald-300 px-1\.5 py-0\.5 rounded-md">Quito HQ<\/span>/g, 
  "{t('concierge.directWhatsapp')} <span className=\"text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-md\">{t('concierge.directWhatsappBadge')}</span>");

content = content.replace(/Chat with senior travel specialist Pablo & Team \(\+593 96 003 9156\)\./g, 
  "{t('concierge.directWhatsappDesc')}");

content = content.replace(/<ShieldCheck className="w-3 h-3 text-amber-400" \/> Authorized Operator/g, 
  "<ShieldCheck className=\"w-3 h-3 text-amber-400\" /> {t('concierge.authorizedOperator')}");

content = content.replace(/<span className="text-zinc-500">Response time: &lt; 1 min<\/span>/g, 
  "<span className=\"text-zinc-500\">{t('concierge.responseTime')}</span>");

content = content.replace(/<h3 className="font-serif font-semibold text-sm text-amber-100">Pyro<\/h3>\s*<span className="text-\[10px\] bg-amber-500\/20 text-amber-300 px-1\.5 py-0\.2 rounded font-sans">\s*AI Concierge\s*<\/span>/g, 
  "<h3 className=\"font-serif font-semibold text-sm text-amber-100\">Pyro</h3>\n                    <span className=\"text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-sans\">\n                      {t('concierge.aiConcierge')}\n                    </span>");

content = content.replace(/<span>Vermilion Routes Expedition Specialist<\/span>/g, 
  "<span>{t('concierge.aiSpecialistTitle')}</span>");

content = content.replace(/<Sparkles className="w-3 h-3 text-amber-400" \/> Suggestions:/g, 
  "<Sparkles className=\"w-3 h-3 text-amber-400\" /> {t('concierge.suggestions')}");

content = content.replace(/Recommend top Galapagos cruise itineraries and prices/g, 
  "{t('concierge.sugg1')}");

content = content.replace(/How to combine Galapagos and Mainland Ecuador in one trip\?/g, 
  "{t('concierge.sugg2')}");

content = content.replace(/I want to request a custom travel quote for 2 people/g, 
  "{t('concierge.sugg3')}");

content = content.replace(/<CheckCircle2 className="w-4 h-4 text-emerald-400" \/> Lead details saved to system!/g, 
  "<CheckCircle2 className=\"w-4 h-4 text-emerald-400\" /> {t('concierge.leadSaved')}");

content = content.replace(/<span className="text-\[10px\] text-emerald-400\/80">Our advisors will contact you<\/span>/g, 
  "<span className=\"text-[10px] text-emerald-400/80\">{t('concierge.advisorsWillContact')}</span>");

content = content.replace(/<span className="text-\[11px\] text-zinc-400">Prefer human response\?<\/span>/g, 
  "<span className=\"text-[11px] text-zinc-400\">{t('concierge.preferHuman')}</span>");

content = content.replace(/<MessageCircle className="w-3\.5 h-3\.5 text-emerald-400" \/>\s*Transfer Chat to WhatsApp/g, 
  "<MessageCircle className=\"w-3.5 h-3.5 text-emerald-400\" />\n                {t('concierge.transferWhatsApp')}");

content = content.replace(/placeholder="Type your message here\.\.\."/g, 
  "placeholder={t('concierge.typeMessage')}");


fs.writeFileSync(file, content, 'utf8');
