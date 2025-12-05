# Knowledge Base

Denna kunskapsbas används av chatbotten för att ge mer relevanta och uppdaterade svar. Den består av artiklar och LinkedIn-posts.

## Struktur

- `articles.ts` - Längre artiklar och blogginlägg
- `linkedin-posts.ts` - LinkedIn-posts från din profil

## Lägga till LinkedIn-posts

1. Öppna `src/knowledge-base/linkedin-posts.ts`
2. Lägg till en ny post i `LINKEDIN_POSTS`-arrayen:

```typescript
{
  id: 'linkedin-post-2024-12-15', // Unikt ID
  title: 'Kort titel som sammanfattar innehållet',
  url: 'https://www.linkedin.com/posts/activity-1234567890', // LinkedIn-URL (valfritt)
  date: 'Dec 15, 2024', // Publiceringsdatum
  tags: ['AI', 'Projektledning', 'Digitalisering'], // Relevanta nyckelord för sökning
  content: `
  Hela innehållet från din LinkedIn-post här...
  `
}
```

### Tips för bästa resultat

- **Tags**: Lägg till relevanta nyckelord som användare kan fråga om (t.ex. 'AI', 'Projektledning', 'Sjukvård', 'Loopa')
- **Content**: Kopiera hela post-texten från LinkedIn, inklusive eventuella hashtags
- **Title**: En kort, beskrivande titel som gör det lätt att identifiera posten
- **Date**: Använd formatet 'MMM DD, YYYY' (t.ex. 'Dec 15, 2024')

## Hur det fungerar

När någon ställer en fråga i chatbotten:

1. Systemet söker igenom både artiklar och LinkedIn-posts
2. Relevant innehåll hittas baserat på nyckelord i frågan
3. De mest relevanta inläggen (max 2) läggs till som kontext till AI:n
4. AI:n kan då referera till dina LinkedIn-posts i sina svar

## Exempel

Om någon frågar "Vad tycker du om agila metoder i sjukvården?" kommer systemet att:

1. Söka efter nyckelord som "agil", "metoder", "sjukvård"
2. Hitta relevanta LinkedIn-posts eller artiklar
3. Använda dem som kontext för att ge ett mer informerat svar


