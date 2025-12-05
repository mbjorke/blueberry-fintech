import { LINKEDIN_POSTS } from './linkedin-posts';

export interface Article {
  id: string;
  title: string;
  url: string;
  date: string;
  content: string;
  tags: string[];
}

export const ARTICLES: Article[] = [
  {
    id: 'rag-making-ai-smarter',
    title: 'RAG: Making AI Smarter with Better Information',
    url: 'https://open.substack.com/pub/lopify/p/rag-making-ai-smarter-with-better',
    date: 'Oct 02, 2025',
    tags: ['RAG', 'AI', 'Machine Learning', 'Development', 'Technology'],
    content: `
# RAG: Making AI Smarter with Better Information

## The Problem with AI Today
Have you ever asked an AI a question and gotten an answer that sounded confident but was completely wrong? Or maybe it gave you outdated information? This happens because AI models only know what they learned during training, which might be months or years old.

## What is RAG?
RAG stands for Retrieval Augmented Generation. Think of it like this: instead of relying only on memory, the AI first looks up relevant information before answering your question. Ritvik Math, a popular AI educator, explains it perfectly in his 8-minute video. As he puts it: "RAG is about giving the language model a little bit of help — by providing it with information it wasn't trained on or isn't paying enough attention to — to get a more accurate, up-to-date, and interpretable response."

## How Does RAG Work?
It's a simple two-step process:
1. Search: When you ask a question, the system first searches for relevant documents, web pages, or data
2. Generate: It then uses this fresh information to create an accurate answer

For example, if you ask about a software update from last week, RAG can find the latest release notes and base its answer on real, current information instead of guessing.

## Why This Matters for Coding
For developers using AI coding assistants, RAG opens up exciting possibilities:
- Always Current: The AI can check the latest documentation or bug reports, so it won't suggest outdated code patterns.
- Show Your Work: When the AI suggests code, it can show you where that information came from, making it easier to trust and verify.
- Smarter Debugging: The AI can look up your project's history, previous errors, and test results to give better advice.
- Expert Knowledge: For specialized fields like security or scientific computing, the AI can pull from trusted, expert-verified sources.

## The Bottom Line
RAG is like giving AI a library card. Instead of only working from memory, it can look things up and give you better, more trustworthy answers. As AI becomes more embedded in our daily work, this combination of memory and research will be essential.
`
  },
  {
    id: 'loopa-sjukvard-innovation',
    title: 'När visionen möter verkligheten: Varför "Big Bang" inte hör hemma i sjukvården',
    url: '', // Inte publicerad ännu
    date: 'Dec 2024',
    tags: ['Loopa', 'Sjukvård', 'Projektledning', 'Innovation', 'Offentlig sektor', 'Riskminimering', 'Agil metodik', 'Digitalisering', 'Patienttrygghet'],
    content: `
# När visionen möter verkligheten: Varför "Big Bang" inte hör hemma i sjukvården

De senaste veckornas tidningsrubriker har varit smärtsam läsning för alla oss som bryr oss om en fungerande sjukvård. Vi ser frustration hos personalen, oro hos medborgarna och system som inte levererar det som utlovats. Men lösningen är inte att sluta utvecklas – lösningen är att ändra *hur* vi gör det.

Inom hälso- och sjukvården är insatserna högre än i någon annan bransch. Om en app för matbeställning har en bugg blir någon hungrig. Om ett vårdadministrativt system skapar förvirring kan konsekvenserna bli livsavgörande.

Att läsa nyheterna den senaste tiden gör det tydligt att den gamla tidens projektledning – där man planerar i åratal för att sedan rulla ut allt på en gång till hela befolkningen – är en risk vi inte längre har råd att ta. Det skapar flaskhalsar, stress och i värsta fall fara för patienterna.

Jag är projektledare, men framförallt är jag en förespråkare för **trygg innovation**. Jag tror att vägen framåt för vården stavas "LOOPA".

## Att våga testa litet för att vinna stort

Många tror felaktigt att agila metoder och innovationsloopar handlar om "slarviga experiment". Inom vården är det precis tvärtom. Metodiken, som bland annat lärs ut av Drivhuset, handlar om extrem **riskminimering**.

Istället för att gissa vad medborgarna och vårdpersonalen behöver, bygga klart det, och sedan hoppas att det fungerar på lanseringsdagen, måste vi börja arbeta i cykler:

1. **Hypotes:** Vi identifierar ett problem och en möjlig lösning.
2. **Loopen (Testet):** Vi testar lösningen i minsta möjliga, trygga skala. Kanske på *en* specifik mottagning, eller med en handfull patienter. Aldrig brett initialt.
3. **Lärdomen:** Vi samlar in feedback direkt från golvet. Förstår patienten informationen? Klickar sjuksköterskan fel?
4. **Justeringen:** Vi hittar felen när de är små och hanterbara, inte när de blivit nationella nyheter.

## Varför detta är enda vägen framåt

Att leda projekt inom offentlig sektor idag är en balansgång. Vi måste vara varsamma med skattemedlen samtidigt som vi måste garantera säkerheten.

Genom att applicera ett iterativt arbetssätt uppnår vi tre kritiska saker:

* **Vi säkrar patienttryggheten:** Vi lanserar aldrig ett nytt system eller en ny rutin skarpt förrän den har "loopats" och överlevt mötet med verkligheten i liten skala.
* **Vi återvinner förtroendet:** Personalen är trött på förändringar som känns påtvingade uppifrån. Genom att involvera dem tidigt i looparna blir de medskapare. När vi väl lanserar stort är lösningen redan godkänd av de som faktiskt ska använda den.
* **Vi slutar gissa:** Vi slutar lägga stora pengar på funktioner som ser bra ut i en PowerPoint men som inte fungerar i en stressad mottagningssituation.

## Slutsats

Jag söker mig till utmanande uppdrag för att jag vill bidra med ett ledarskap som förstår allvaret.

Vi behöver projektledare som vågar bromsa när kartan inte stämmer med verkligheten, och som vågar testa nytt i trygga former innan man trycker på den stora knappen. Det handlar inte om att undvika digitalisering – det är nödvändigt för framtidens vård. Det handlar om att genomföra den med respekt för både skattebetalarna och patienterna.

Låt oss bygga en vård där "nytt projekt" inte väcker oro, utan inger hopp om en enklare vardag.

En loop i taget.
`
  },
  {
    id: 'design-for-better-world-norman',
    title: 'Design for a Better World with Don Norman: Humanity-Centered Design för globala utmaningar',
    url: 'https://www.interaction-design.org/courses/design-for-a-better-world-with-don-norman-course',
    date: 'Dec 2024',
    tags: ['Don Norman', 'Design for a Better World', 'Humanity-Centered Design', 'Sustainability', 'Circular Economy', 'Climate Change', 'Social Impact', 'Systemic Change', 'IxDF'],
    content: `
# Design for a Better World with Don Norman: Humanity-Centered Design för globala utmaningar

Marcus Björke har gått "Design for a Better World with Don Norman"-kursen från Interaction Design Foundation. Denna kurs, som leds av Don Norman (Father of User Experience Design, författare till "The Design of Everyday Things", medgrundare av Nielsen Norman Group, och tidigare VP vid Apple), fokuserar på att använda humanity-centered design för att förbättra liv och lösa globala utmaningar.

## Kursens kärnbudskap

Kursen handlar om att använda design som ett sätt att tänka för att påverka hela ekosystem och skapa lösningar som gör verklig skillnad – både lokalt och globalt. Mellan 2030 och 2050 förväntas klimatkrisen orsaka cirka 250 000 ytterligare dödsfall varje år. Denna kurs ger verktyg för att använda Design Thinking och tidslösa, människo-centrerade färdigheter för att driva positiv förändring och forma en mer hållbar framtid.

## Viktiga teman och principer

### Humanity-Centered Design
Kursen betonar vikten av humanity-centered design – en utvidgning av user-centered design som tar hänsyn till hela mänskligheten och planeten, inte bara individuella användare. Det handlar om att designa för hållbarhet, rättvisa och långsiktig påverkan.

### Meningfulla mätningar
En central insikt är att vi behöver använda mer meningsfulla mätningar i design och i världen. Traditionella mätningar fokuserar ofta på kortsiktiga ekonomiska resultat, men vi behöver mätningar som tar hänsyn till social påverkan, miljöpåverkan och långsiktig hållbarhet.

### Cirkulär ekonomi och hållbarhet
Kursen behandlar:
- **Cirkulär design**: Att designa produkter som kan återanvändas och återvinnas, inte bara återvinnas
- **Hållbarhet är inte nog**: Vi behöver gå längre än bara hållbarhet – vi behöver designa produkter som är hållbara, robusta och motståndskraftiga
- **Reversera skada**: Använda cirkulär design för att faktiskt vända skada, inte bara minska den

### Inkrementell modulär design
Kursen lär ut att använda inkrementell modulär design – att bygga lösningar stegvis och modulärt, vilket gör det lättare att anpassa, förbättra och skala.

### Mobilisera människor mot gemensamma mål
En viktig del av kursen handlar om att mobilisera människor mot gemensamma mål, övervinna motstånd mot förändring och flytta in i ledarskapsroller som påverkar systemförändring.

## Praktisk tillämpning

Kursen ger verktyg för att:
- Lösa verkliga världsproblem som klimatförändring, ojämlikhet, krig och avfall
- Skapa lösningar som gör verklig påverkan – både lokalt och globalt
- Positionera sig som expert på miljövänliga lösningar
- Driva varaktig affärsframgång med cirkulära designlösningar
- Identifiera organisationer som verkligen gör skillnad (och snabbt upptäcka de som bara är ytliga)

## Koppling till projektledning och digitalisering

Kursens principer är direkt relevanta för projektledning och digitalisering:
- **Systemtänkande**: Att förstå hur system fungerar och hur man påverkar systemförändring
- **Långsiktigt perspektiv**: Att designa för hållbarhet över tid, inte bara kortsiktiga resultat
- **Meningfulla mätningar**: Att mäta vad som verkligen spelar roll, inte bara vad som är lätt att mäta
- **Mobilisering**: Att få människor med sig i förändringsarbete

## AI och framtiden

Kursen behandlar också hur man integrerar AI i arbetet, vilket är relevant i en tid när AI blir alltmer centralt i design och utveckling.

## Portfolio case study

Kursen inkluderar en valfri portfolio case study som hjälper att identifiera organisationer som verkligen gör skillnad – och snabbt upptäcka de som bara är ytliga. Detta är värdefullt för att förstå vilka organisationer som verkligen arbetar med hållbarhet och social påverkan.

## Inspirationskälla för praktiskt arbete

Denna kurs är en viktig inspirationskälla för Marcus arbete med digitalisering och projektledning, särskilt när det gäller:
- Att tänka systematiskt om långsiktig hållbarhet
- Att använda meningsfulla mätningar i projekt
- Att mobilisera människor mot gemensamma mål
- Att designa för verklig påverkan, inte bara kortsiktiga resultat

Källa: Interaction Design Foundation - https://www.interaction-design.org/courses/design-for-a-better-world-with-don-norman-course
`
  },
  {
    id: 'design-thinking-ixdf',
    title: 'Design Thinking: En iterativ process för innovation och problemlösning',
    url: 'https://www.interaction-design.org/literature/topics/design-thinking',
    date: 'Dec 2024',
    tags: ['Design Thinking', 'Innovation', 'Problemlösning', 'UX', 'HCI', 'IDEO', 'Stanford d.school', 'Iterativ process', 'Empathy', 'Prototyping'],
    content: `
# Design Thinking: En iterativ process för innovation och problemlösning

Design Thinking är en icke-linjär, iterativ process som team använder för att förstå användare, utmana antaganden, omdefiniera problem och skapa innovativa lösningar att prototypa och testa. Den är mest användbar för att hantera illa definierade eller okända problem (så kallade "wicked problems") och involverar fem faser: Empathize, Define, Ideate, Prototype och Test.

## Varför är Design Thinking så viktigt?

Som Tim Brown, CEO av IDEO, säger: "Design thinking is a human-centered approach to innovation that draws from the designer's toolkit to integrate the needs of people, the possibilities of technology, and the requirements for business success."

Design Thinking:
- **Främjar innovation**: Företag måste innovera för att överleva och förbli konkurrenskraftiga i en snabbt föränderlig miljö
- **Hanterar komplexa problem**: Design teams använder Design Thinking för att hantera illa definierade/okända problem (wicked problems)
- **Erbjuder praktiska metoder**: Stora företag som Google, Apple och Airbnb använder Design Thinking för att driva innovation

## Målet med Design Thinking: Desirable, Feasible och Viable

Design Thinking-processen syftar till att uppfylla tre kriterier:

### Desirability: Möta människors behov
Processen börjar med att titta på behov, drömmar och beteenden hos människor – slutanvändarna. Teamet lyssnar med empati för att förstå vad människor verkligen vill, inte vad organisationen tror att de vill eller behöver.

### Feasibility: Vara tekniskt möjligt
När teamet identifierat en eller flera lösningar, avgör de om organisationen kan implementera dem. I teorin är alla lösningar möjliga om organisationen har oändliga resurser, men i praktiken måste teamet utvärdera om lösningen är värd att satsa på med nuvarande resurser.

### Viability: Generera vinster
En önskvärd och tekniskt möjlig produkt räcker inte. Organisationen måste kunna generera intäkter och vinster från lösningen. Detta gäller inte bara kommersiella organisationer utan även ideella organisationer.

Traditionellt börjar företag med feasibility eller viability och försöker sedan hitta ett problem som passar lösningen. Design Thinking vänder på denna process och förespråkar att team **börjar med desirability** och tar in de andra två linserna senare.

## De fem faserna i Design Thinking

Stanford University's Hasso Plattner Institute of Design (d.school) är känd för sin banbrytande approach till Design Thinking. Deras designprocess har fem faser som inte alltid är sekventiella – team kör dem ofta parallellt, i olika ordning och upprepar dem vid behov.

### Fas 1: Empathize – Forska om användarnas behov
Teamet syftar till att förstå problemet, vanligtvis genom användarforskning. Empati är avgörande för Design Thinking eftersom det tillåter designers att sätta åt sidan sina antaganden om världen och få insikt i användare och deras behov.

### Fas 2: Define – Definiera användarnas behov och problem
När teamet samlat information analyserar de observationerna och syntetiserar dem för att definiera kärnproblemen. Dessa definitioner kallas **problem statements**. Teamet kan skapa **personas** för att hjälpa till att hålla ansträngningarna användarcentrerade.

### Fas 3: Ideate – Utmana antaganden och skapa idéer
Med grunden klar, förbereder sig teamen för att "tänka utanför boxen". De brainstormar alternativa sätt att se problemet och identifierar innovativa lösningar på problem statements.

### Fas 4: Prototype – Börja skapa lösningar
Detta är en experimentell fas. Målet är att identifiera den bästa möjliga lösningen för varje problem. Teamet producerar billiga, nedskalade versioner av produkten (eller specifika funktioner) för att undersöka idéerna. Detta kan vara så enkelt som **pappersprototyper**.

### Fas 5: Test – Testa lösningarna
Teamet testar dessa prototyper med riktiga användare för att utvärdera om de löser problemet. Testet kan ge nya insikter, baserat på vilka teamet kan förfina prototypen eller till och med gå tillbaka till Define-fasen för att återbesöka problemet.

Dessa faser är **olika lägen** som bidrar till hela designprojektet snarare än sekventiella steg. Målet är att få en djup förståelse för användarna och deras ideala lösning/produkt.

## Design Thinking Frameworks

Det finns ingen enda definition eller process för Design Thinking. Den femstegs-metodiken som beskrivs ovan är bara ett av flera ramverk. Innovation följer inte en linjär väg eller har en tydlig formel. Globala designledare och konsulter har tolkat den abstrakta designprocessen på olika sätt och föreslagit andra Design Thinking-ramverk.

## Praktisk tillämpning

Design Thinking används av stora företag som Google, Apple och Airbnb för att driva innovation. Från arkitektur och teknik till teknologi och tjänster har företag över branscher omfamnat metodiken för att driva innovation och hantera komplexa problem.

Metodiken är särskilt användbar för:
- Att hantera "wicked problems" – komplexa problem utan tydliga lösningar
- Att skapa användarcentrerade lösningar
- Att främja innovation i team
- Att integrera behoven hos människor, teknologins möjligheter och affärskraven för framgång

## Koppling till HCI och användarcentrerad design

Design Thinking delar många principer med Human-Computer Interaction (HCI) och användarcentrerad design. Båda betonar vikten av att förstå användare, testa med riktiga användare och iterera baserat på feedback. Design Thinking erbjuder en strukturerad process för att applicera dessa principer i praktiken.

Källa: Interaction Design Foundation - https://www.interaction-design.org/literature/topics/design-thinking
`
  },
  {
    id: 'nielsen-norman-usability-principles',
    title: 'Jakob Nielsen och Donald Norman: Stora inspirationskällor inom användbarhet',
    url: '',
    date: 'Dec 2024',
    tags: ['Jakob Nielsen', 'Donald Norman', 'Usability', 'UX', 'HCI', 'Användbarhet', 'Designprinciper', 'Inspirationskällor', 'Typer av designers', 'User-centered design', 'Humanity-centered design', 'Activity-centered design', 'System-centered design'],
    content: `
# Jakob Nielsen och Donald Norman: Stora inspirationskällor inom användbarhet

Jakob Nielsen och Donald Norman är två av de mest inflytelserika tänkarna inom användbarhet och interaktionsdesign. Deras principer och teorier har format hur vi tänker på design för människor och är stora inspirationskällor för Marcus Björkes arbete inom HCI och digitalisering.

## Jakob Nielsen: 10 Usability Heuristics

Jakob Nielsen är känd för sina 10 Usability Heuristics för användargränssnitt, som han utvecklade tillsammans med Rolf Molich 1990. Dessa heuristiker är praktiska riktlinjer för att designa användbara gränssnitt:

1. **Visibility of system status**: Systemet ska alltid informera användaren om vad som händer genom lämplig feedback inom rimlig tid.
2. **Match between system and the real world**: Systemet ska tala användarens språk, med ord, fraser och begrepp som är bekanta för användaren.
3. **User control and freedom**: Användare behöver ofta en "nöduppstängning" för att lämna oönskade tillstånd utan att gå igenom en lång dialog.
4. **Consistency and standards**: Användare bör inte behöva undra om olika ord, situationer eller handlingar betyder samma sak.
5. **Error prevention**: Bättre än bra felmeddelanden är en noggrann design som förhindrar att problem uppstår från början.
6. **Recognition rather than recall**: Minimera användarens minnesbelastning genom att göra objekt, handlingar och alternativ synliga.
7. **Flexibility and efficiency of use**: Acceleratorer – osynliga för nybörjare – kan ofta öka hastigheten för experter så att systemet kan passa både oerfarna och erfarna användare.
8. **Aesthetic and minimalist design**: Dialoger bör inte innehålla information som är irrelevant eller sällan behövs.
9. **Help users recognize, diagnose, and recover from errors**: Felmeddelanden bör uttryckas i klart språk (inga koder), tydligt indikera problemet och föreslå en konstruktiv lösning.
10. **Help and documentation**: Även om det är bättre om systemet kan användas utan dokumentation, kan det vara nödvändigt att tillhandahålla hjälp och dokumentation.

## Donald Norman: Designprinciper och användarcentrerad design

Donald Norman är känd för sina teorier om användarcentrerad design och kognitiv belastning. Hans mest inflytelserika begrepp inkluderar:

### Affordances
En affordance är en kvalitet hos ett objekt som gör det möjligt för en person att utföra en handling. En dörrhandtag "affordar" att greppas och vridas. I digital design handlar det om att göra det uppenbart vad användare kan göra med ett gränssnittselement.

### Signifiers
Signifiers är signaler som kommunikerar var användare bör fokusera sin uppmärksamhet och vilka handlingar som är möjliga. De hjälper användare att förstå hur systemet fungerar utan att behöva läsa instruktioner.

### Mentala modeller
Användare har mentala modeller – interna representationer av hur system fungerar. Bra design matchar användarnas mentala modeller, vilket gör systemet intuitivt att använda.

### Användarcentrerad design
Norman betonar vikten av att designa för användarna, inte för systemet. Det handlar om att förstå användarnas behov, kontext och begränsningar innan man designar lösningar.

### Olika typer av designers enligt Donald Norman
Donald Norman identifierar olika typer av designers baserat på deras fokus och approach:

1. **Designer-centered design**: Designers som designar för sig själva och sina egna preferenser, ofta utan att tänka på slutanvändarna. Detta leder ofta till produkter som är svåra att använda för andra.

2. **User-centered design**: Designers som fokuserar på användarnas behov och försöker förstå hur användare faktiskt använder produkter. Detta är en förbättring men kan fortfarande missa större systemperspektiv.

3. **Activity-centered design**: Designers som fokuserar på aktiviteten eller uppgiften som ska utföras, snarare än bara användaren. Detta tar hänsyn till kontexten där designen används.

4. **System-centered design**: Designers som tänker på hela systemet, inklusive alla komponenter, interaktioner och påverkan på större skala. Detta är viktigt för komplexa system.

5. **Humanity-centered design**: En utvidgning av user-centered design som tar hänsyn till hela mänskligheten och planeten, inte bara individuella användare. Detta är det som Norman förespråkar i "Design for a Better World" – att designa för hållbarhet, rättvisa och långsiktig påverkan.

Norman betonar att bra design ofta kräver en kombination av dessa perspektiv, men att humanity-centered design är det mest omfattande och ansvarsfulla approach för att hantera dagens globala utmaningar.

## Praktisk tillämpning

Dessa principer är inte bara teori – de är praktiska verktyg för att skapa bättre användarupplevelser:

- **Nielsens heuristiker** används ofta i usability-testning och designgranskningar för att identifiera problem i gränssnitt.
- **Normans principer** hjälper till att designa gränssnitt som är intuitiva och lätta att använda utan instruktioner.
- Tillsammans bildar de en grund för användarcentrerad design som fokuserar på människor, inte teknologi.

## Inspirationskällor, inte absoluta regler

Det är viktigt att komma ihåg att Nielsens och Normans principer är inspirationskällor och riktlinjer, inte absoluta regler. Varje projekt har sin egen kontext, och det handlar om att använda dessa principer pragmatiskt för att skapa bättre användarupplevelser – precis som Marcus gör i sitt arbete med digitalisering och projektledning.
`
  }
];

/**
 * Get all knowledge base content (articles + LinkedIn posts)
 */
export function getAllKnowledgeBaseContent(): Article[] {
  return [...ARTICLES, ...LINKEDIN_POSTS];
}

/**
 * Simple keyword-based search to find relevant articles and LinkedIn posts
 */
export function findRelevantArticles(query: string, limit: number = 2): Article[] {
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/);
  
  // Get all content from both articles and LinkedIn posts
  const allContent = getAllKnowledgeBaseContent();
  
  return allContent
    .map(article => {
      // Calculate relevance score
      let score = 0;
      const contentLower = (article.title + ' ' + article.content + ' ' + article.tags.join(' ')).toLowerCase();
      
      // Check for exact matches in title (higher weight)
      if (article.title.toLowerCase().includes(queryLower)) {
        score += 10;
      }
      
      // Check for tag matches
      article.tags.forEach(tag => {
        if (queryWords.some(word => tag.toLowerCase().includes(word))) {
          score += 5;
        }
      });
      
      // Check for word matches in content
      queryWords.forEach(word => {
        if (word.length > 2 && contentLower.includes(word)) {
          score += 1;
        }
      });
      
      return { article, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.article);
}
