# Level 1-1  De opdracht
## Race Simulator
Software ontwikkeling doorloopt bijna altijd de volgende stappen: 
`Aanleiding` <-> `Analyse` <-> `Ontwerp` <-> `Realisatie` <-> `Testing` <-> `Implementatie`. 
Zoals je kan zien wijzen alle pijlen 2 kanten op. Je zult als ontwikkelaar vaak een stap terug moeten doen vanwege nieuwe wensen of inzichten.

De module C# richt zich voornamelijk op de stappen realisatie en testing. 
De andere stappen zijn al voor je uitgevoerd en dienen als houvast voor jouw uitwerking van een race simulator.
De informatie uit onderstaande aanleiding en analyse zal in elke level terug komen.

## Aanleiding
Om een competitie te kunnen winnen wordt er steeds vaker gebruik gemaakt van ICT-middelen. 
Een simulator kan bijvoorbeeld voorspellingen doen over een competitie. 
Met deze voorspellingen kunnen teams de middelen beter en efficiënter inzetten.

Nog niet alle competities hebben een simulator. Dit is duidelijk een gat in de markt. 
Het doel van dit project is om een simulator voor een competitie te ontwikkelen. 
De simulator wordt internationaal aangeboden waarbij de koper naast de applicatie ook de sourcecode krijgt.

## Domeinanalyse
### Begrippen
Doordat de applicatie internationaal aangeboden wordt zijn de gebruikte termen en begrippen in het Engels.

| Term        | Vertaling  | Uitleg                                                                     |
|-------------|------------|----------------------------------------------------------------------------|
| Competition | Competitie | Competitie                                                                 |
| Participant | Deelnemer  | Deelnemer in de competitie                                                 |
| Equipment   | Racemiddel | Middel gebruikt door de deelnemer om te racen, bv schoenen, auto, fiets... |
| Track       | Racebaan   | Een racebaan waar de deelnemers tegen elkaar strijden                      |
| Section     | Sectie     | Onderdeel van een racebaan bestaande uit twee stroken                      |

### Teams
Het kost veel geld om een raceteam te onderhouden. Daarom worden raceteams ook gebruikt als een vorm van reclame. Elke raceteam heeft daarom een eigen teamkleur passend bij de kleur van de sponsor.

Om andere teams te kunnen verslaan worden verschillende ICT-middelen gebruikt. Teams kunnen zich geen fouten of vergissingen permitteren daarom wordt er sterk gestuurd op kwaliteit en betrouwbaarheid.

Teams zijn niet erg open om zo andere teams niet op ideeën te brengen. Teams kopen daarom ook de sourcecode van een applicatie om volledig grip en inzicht te krijgen. Geheimen mogen niet uitlekken.

### Competitie
Een competitie bestaat minimaal uit 3 deelnemers en 2 racebanen. Elke deelnemer heeft 1 racemiddel om mee te racen, denk bijvoorbeeld aan schoenen, auto of een fiets.

De racebanen hebben een vaste volgorde in de competitie. Alle deelnemers moeten minimaal 2 rondjes racen op een racebaan. Tijdens de race kan het voorkomen dat het gebruikte racemiddel tijdelijk defect is.

Elke racebaan is opgedeeld in meerdere secties waarbij alle secties dezelfde lengte hebben. Tijdens een race kunnen maximaal 2 deelnemers aanwezig zijn op 1 sectie.

Nadat een race is afgerond krijgt elke deelnemer punten. De deelnemers die als eerste is gefinished krijgt de meeste punten. De competitie is afgerond wanneer de deelnemers op alle racebanen hebben geraced en hiervoor punten hebben gekregen.

### Domeinmodel
De bovenstaande analyse is samengevat in het onderstaande domeinmodel.

![Domeinmodel](https://learn.microsoft.com/nl-nl/azure/architecture/microservices/images/drone-ddd.png)