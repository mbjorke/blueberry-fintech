# Guide för att döpa om repository från blueberry-fintech till blueberry

## ✅ Steg 1: Lokala filer (KLART)
Alla lokala filer har redan uppdaterats:
- ✅ `package.json` - name ändrat till "blueberry"
- ✅ `fly.toml` - app ändrat till "blueberry"
- ✅ `README.md` - alla referenser uppdaterade
- ✅ Alla dokumentationsfiler i `docs/` - uppdaterade
- ✅ `scripts/validate-external-project.js` - uppdaterad

**Obs:** `package-lock.json` kommer att uppdateras automatiskt när du kör `npm install` nästa gång.

## 🔄 Steg 2: Uppdatera package-lock.json (Valfritt, görs automatiskt)
Kör detta när du är redo:
```bash
npm install
```

## 🌐 Steg 3: Döpa om på GitHub

### Alternativ A: Via GitHub Web Interface (Rekommenderat)
1. Gå till ditt repository på GitHub
2. Klicka på **Settings** (Inställningar)
3. Scrolla ner till **Repository name** (Repository-namn)
4. Ändra från `blueberry-fintech` till `blueberry`
5. Klicka på **Rename**

**Viktigt:** GitHub kommer automatiskt att:
- Uppdatera alla URL:er
- Uppdatera git remote URL:er
- Behålla all historik

### Alternativ B: Via GitHub CLI
```bash
gh repo rename blueberry --repo din-org/blueberry-fintech
```

## 📁 Steg 4: Uppdatera lokal git remote (Efter GitHub-rename)

Efter att du har döpt om på GitHub, uppdatera din lokala remote:

```bash
# Kontrollera nuvarande remote
git remote -v

# Uppdatera remote URL (ersätt din-org med ditt GitHub-användarnamn/org)
git remote set-url origin https://github.com/din-org/blueberry.git

# Verifiera
git remote -v
```

## 📂 Steg 5: Döpa om lokal mapp (Sista steget)

**VIKTIGT:** Vänta tills alla pågående agenter är klara innan du gör detta!

```bash
# Gå till föräldramappen
cd /Users/mbjorke/Workspace/Lab

# Döp om mappen
mv blueberry-fintech blueberry

# Gå in i den nya mappen
cd blueberry

# Verifiera att allt fungerar
git status
npm run dev  # Testa att projektet startar
```

## ⚠️ Steg 6: Uppdatera MCP-konfiguration (Om du använder MCP)

Om du har MCP konfigurerat i Cursor eller annan editor, uppdatera sökvägar:

1. Öppna din MCP-konfiguration (t.ex. `~/.cursor/mcp.json` eller liknande)
2. Uppdatera alla sökvägar från `/Users/mbjorke/Workspace/Lab/blueberry-fintech` till `/Users/mbjorke/Workspace/Lab/blueberry`

Exempel:
```json
{
  "mcpServers": {
    "blueberry-design-system": {
      "command": "node",
      "args": ["/Users/mbjorke/Workspace/Lab/blueberry/mcp-server/dist/index.js"]
    }
  }
}
```

## 🔍 Steg 7: Verifiera att allt fungerar

```bash
# Testa git
git status
git log --oneline -5

# Testa att projektet bygger
npm run build

# Testa att dev-server startar
npm run dev

# Testa MCP server (om du använder den)
npm run mcp:test
```

## 📝 Checklista

- [x] Lokala filer uppdaterade
- [ ] `npm install` kört (uppdaterar package-lock.json)
- [ ] Repository döpt om på GitHub
- [ ] Lokal git remote uppdaterad
- [ ] Lokal mapp döpt om (efter att agenter är klara)
- [ ] MCP-konfiguration uppdaterad (om tillämpligt)
- [ ] Allt verifierat och fungerar

## 🚨 Viktiga påminnelser

1. **Vänta med mapp-renaming** tills alla pågående agenter är klara
2. **GitHub-renaming** kan göras direkt - det påverkar inte lokala agenter
3. **Remote URL** måste uppdateras efter GitHub-rename
4. **MCP-sökvägar** måste uppdateras om du använder MCP

## 💡 Tips

- Om du har flera lokala kloner, uppdatera remote URL:er i alla
- Om du har CI/CD pipelines, kontrollera att de inte har hårdkodade sökvägar
- Om du har externa integrations (t.ex. Netlify, Fly.io), uppdatera repository-länkar där




