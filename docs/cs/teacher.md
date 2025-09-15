# Příručka pro učitele

## Tvorba úkolů

Úkoly se aktuálně vytvářejí přímo z assets/data/information_system_1/config.json souboru (popř. jiná číslovka id systému). V budoucnu bude možné je vytvářet přes webové rozhraní.

Úkoly jsou v sekci "tasks"

```json
"tasks": [
        {
            "id": 1, ...
        }
        {
            "id": 2, ...
        },
        ...
```

### Struktura úkolu

```json
{
    "id": 1,
    "title": "Ukázkový úkol č. 1",
    "description": "Zkontrolujte, zda se v nástěnce správně zobrazují jídla a účastníci. Pokud najdete nějakou chybu, tak chybu opravte.",
    "status": "pending",
    "kind": "repair",
    "answer": "stats-participants-sql == SELECT COUNT(*) as count FROM účastníci && stats-meals-sql == SELECT COUNT(*) as count FROM jídla",
    "elementClass": [],
    "round": 1,
    "is_editable": false,
    "error-components": [
        {
            "id": "stats-participants",
            "variables": {
                "html": "",
                "sql": "SELECT COUNT(*) as count FROM vedoucí",
                "js": ""
            },
            "error-component-name": ""
        },
        {
            "id": "stats-meals",
            "variables": {
                "html": "",
                "sql": "SELECT COUNT(*) as count FROM turnusy",
                "js": ""
            },
            "error-component-name": ""
        }
    ],
    "feedback": "Správně jsi opravil/a SQL dotazy dvou komponent. Komponenta, která měla zobrazovat počet účastníku chybně zobrazovala počet vedoucích a komponenta, která měla zobrazovat počet jídel, zobrazovala počet turnusů. Opravil/a jsi to tak, že jsi změnil/a SQL dotazy na správné."
},
```
- `id` - unikátní identifikátor úkolu, něsmí se opakovat
- `title` - název úkolu
- `description` - popis úkolu, co má uživatel udělat
- `status` - stav úkolu, může nabývat hodnot `pending`, `active`, `completed` - není potřeba měnit.
- `kind` - typ úkolu, může nabývat hodnot `repair`, `select` a v budoucnu i `select-options` a `select-type`.
    - **repair** - uživatel má opravit chyby v komponentách, které jsou uvedeny v `error-components`
    - **select** - uživatel má označit chybné komponenty, které jsou uvedeny v `error-components`
    - **select-options** - uživatel má označit správnou odpověď z možností, které jsou uvedeny v `answer`
    - **select-type** - uživatel má označit napsat správnou odpověď otázky, která je v zadání.
- `answer` - správná odpověď na úkol - dynamicky se kontroluje podle typu úkolu
    -  `"answer": "stats-participants-sql == SELECT COUNT(*) as count FROM účastníci && stats-meals-sql == SELECT COUNT(*) as count FROM jídla"` např. kontroluje zda sql dotazy jsou rovny výše uvedeným hodnotám,
    - `"answer": "tbl-účastníci == jméno:Petr Novotný;alergeny:Lepek,Koryši"` - kontroluje zda tabulka účastníků obsahuje řádek s jménem "Petr Novotný" a alergeny "Lepek,Koryši"
    - `"answer": "none"` - odpoveď je prázdná, stačí jen označit správné komponenty/opravit chyby
- `elementClass` - třída prvku, na který se úkol vztahuje, aktuálně nepoužito, necháváme prázdné pole
- `round` - kolo, ve kterém je úkol zadán, aktuálně nepoužito, necháváme hodnotu 1, tj,. všechny úkoly jsou v 1. kole
- `is_editable` - zda je úkol editovatelný uživatelem, aktuálně nepoužito, necháváme hodnotu false
- `error-components` - seznam komponent, které obsahují chyby
    - "id": "supervisors-edit-allergens", - zde lze volit jména komponent, které se použícají v souboru `ComponentManager`
    - "variables": {
        - "html": "", - zde lze měnit HTML kód komponenty, aktuálně nepoužito, necháváme prázdné
        - "sql": "SELECT COUNT(*) as count FROM alergeny", - zde lze měnit SQL dotaz komponenty, který uživatel opravuje
        - "js": "" - zde lze měnit JavaScript kód komponenty, aktuálně nepoužito, necháváme prázdné
      },
    - "error-component-name": "" - není implementováno, necháváme prázdné
    - pozn. kód který lze měnit - vytvářet do něj chyby jsou neprázdné proměnné v instancích v `ComponentManager`.
- `feedback` - zpětná vazba pro uživatele, zobrazí se po splnění úkolu

---

## Řešení ukázkových úkolů

### Ukázkový úkol č. 1

**Zadání:** Zkontrolujte, zda se v nástěnce správně zobrazují jídla a účastníci. Pokud najdete nějakou chybu, tak chybu opravte.

**Řešení:**

- běžte do kolonky `Nástěnka` 
- klikněte na zapnout úpravy v horním menu
- klikněte na tužku u bubliny s `účastníci`
- změňte SQL dotaz na `SELECT COUNT(*) as count FROM účastníci`
- uložte změny
- klikněte na tužku u bubliny s `jídla`
- změňte SQL dotaz na `SELECT COUNT(*) as count FROM jídla` stejným způsobem
- uložte změny
- vyberte úkol č.1  v menu s úkoly a klikněte na vyhodnotit
- poté se zobrazí zpětná vazba

---

### Ukázkový úkol č. 2

**Zadání:** Zkontrolujte, zda se v nástěnce správně zobrazují statistiky o počtu jídel. Pokud najdete nějakou chybu, tak vyberte komponentu, která je chybná.

**Řešení:**

- běžte do kolonky `Nástěnka` 
- klikněte na zapnout zvýraznění v horním menu
- objeví se oranžové ráměčky okolo onačitelných komponent
- označte bublinu s počtem vedoucích
- vyberte úkol č.2  v menu s úkoly a klikněte na vyhodnotit
- poté se zobrazí zpětná vazba

---

### Ukázkový úkol č. 3

**Zadání:** Upravte účastníka: Tereza Nováková, tak aby měla i třetí jméno Svobodová, tedy její celé jméno bude Tereza Svobodová Nováková.

**Řešení:**

- běžte do kolonky `Účastníci`
- otevřete detail účastníka Tereza Nováková kliknutím na `Zobrazit detaily`
- zapněte úpravy kliknutím a klikněte na tužku u pole s jménem
- změňte `name.trim().split(' ').length == 2` na `name.trim().split(' ').length >= 2`
- uložte změny
- upravte jméno na `Tereza Svobodová Nováková`
- uložte změny
- vyberte úkol č.3  v menu s úkoly a klikněte na vyhodnotit
- poté se zobrazí zpětná vazba

---

## Poznámky

Úprava JS kódu by šla obejít, například vracet jen true. Dynamická kontrola kódu zatím není implementována, to bude doděláno v rámci BP.