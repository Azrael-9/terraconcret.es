# Terraconcret — Web corporativa

Lloc web corporatiu de **Terraconcret Obres i Serveis SL**, empresa especialitzada en estructures de formigó in situ, obra civil i edificació.

## Descripció

Web estàtica multilingüe (ES / CA / EN) en HTML5, CSS3 i JavaScript vainilla. Sense frameworks ni dependències de build.

## Tecnologies

- HTML5 semàntic
- CSS3 (variables, flexbox, grid)
- JavaScript ES6+ (IIFE, classes CSS)
- Schema.org JSON-LD
- Apache `.htaccess`

## Idiomes

| Codi | Directori | URL |
|------|-----------|-----|
| Español | `/` | `https://terraconcret.es/` |
| Català | `ca/` | `https://terraconcret.es/ca/` |
| English | `en/` | `https://terraconcret.es/en/` |

## URL de producció

`https://terraconcret.es`

## Estructura de carpetes

```
terraconcret/
├── assets/
│   ├── css/          # Fulls d'estil
│   ├── js/           # Scripts
│   ├── images/       # Imatges
│   └── logos/        # Logotips i favicon
├── ca/               # Versió en català
│   └── serveis/
├── en/               # Versió en anglès
│   └── services/
├── servicios/        # Pàgines de servei (ES)
├── .htaccess
├── .gitignore
├── sitemap.xml
├── robots.txt
└── security.txt
```

## Previsualitzar en local

```bash
npx serve .
```

## Contacte client

- **Empresa:** Terraconcret Obres i Serveis SL
- **Web:** https://terraconcret.es
- **Email:** info@terraconcret.es
