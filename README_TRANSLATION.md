# Sistema de Traducción TIDE

## Descripción
Este sistema permite traducir la página web de TIDE entre español e inglés de forma simple y eficiente.

## Características
- ✅ Traducción completa de todos los textos de la página
- ✅ Botón de cambio de idioma en la navegación
- ✅ Persistencia del idioma seleccionado (localStorage)
- ✅ Traducción automática de placeholders en formularios
- ✅ Diseño responsive y consistente con el estilo de la página

## Archivos del Sistema

### 1. `translations.js`
Contiene todas las traducciones organizadas por idioma:
- **es**: Español (idioma por defecto)
- **en**: Inglés

### 2. `index.html`
- Incluye el script de traducciones
- Todos los elementos de texto tienen el atributo `data-translate` con su clave correspondiente
- Botón de cambio de idioma en la navegación

### 3. `script.js`
- Inicializa el sistema de traducción al cargar la página
- Llama a `initLanguage()` para establecer el idioma guardado o el predeterminado

### 4. `style.css`
- Estilos para el botón de cambio de idioma
- Adaptación visual según el estado del navbar (scrolled/not scrolled)

## Cómo Funciona

### 1. Inicialización
```javascript
// Se ejecuta automáticamente al cargar la página
initLanguage();
```

### 2. Cambio de Idioma
```javascript
// Cambia entre español e inglés
changeLanguage('es'); // Español
changeLanguage('en'); // Inglés
```

### 3. Estructura de Traducciones
```javascript
const translations = {
    es: {
        "nav.home": "Home",
        "hero.subtitle": "Una Forma De Vivir",
        // ... más traducciones
    },
    en: {
        "nav.home": "Home", 
        "hero.subtitle": "A Way of Living",
        // ... más traducciones
    }
};
```

### 4. Elementos Traducibles
```html
<!-- Texto normal -->
<h2 data-translate="hero.subtitle">Una Forma De Vivir</h2>

<!-- Placeholder en formulario -->
<input type="text" placeholder="Tu nombre" data-translate="contacto.name">
```

## Cómo Agregar Nuevas Traducciones

### 1. Agregar la clave en `translations.js`
```javascript
es: {
    "nueva.clave": "Texto en español",
    // ...
},
en: {
    "nueva.clave": "Text in English", 
    // ...
}
```

### 2. Agregar el atributo en el HTML
```html
<elemento data-translate="nueva.clave">Texto por defecto</elemento>
```

## Características Técnicas

### Persistencia
- El idioma seleccionado se guarda en `localStorage`
- Se mantiene entre sesiones del navegador
- Si no hay idioma guardado, usa español por defecto

### Rendimiento
- Traducción instantánea sin recargar la página
- Solo se traducen los elementos con `data-translate`
- No afecta el rendimiento de la página

### Compatibilidad
- Funciona en todos los navegadores modernos
- Compatible con el sistema de animaciones AOS
- No interfiere con otros scripts de la página

## Mantenimiento

### Agregar Nuevo Idioma
1. Agregar el nuevo idioma en `translations.js`
2. Actualizar la función `changeLanguage()` si es necesario
3. Agregar opción en el botón de cambio de idioma

### Actualizar Traducciones
1. Modificar el texto en el objeto correspondiente en `translations.js`
2. Verificar que todas las claves existan en ambos idiomas
3. Probar la funcionalidad en ambos idiomas

## Notas Importantes

- **Consistencia**: Mantener las mismas claves en ambos idiomas
- **HTML**: Los elementos con `data-translate` deben tener texto por defecto
- **Formularios**: Los placeholders se traducen automáticamente
- **Navegación**: El botón cambia dinámicamente entre "EN" y "ES"

## Troubleshooting

### Problema: No se traduce algún texto
**Solución**: Verificar que el elemento tenga el atributo `data-translate` y que la clave exista en ambos idiomas.

### Problema: El botón no cambia de idioma
**Solución**: Verificar que el script `translations.js` esté incluido antes de `script.js`.

### Problema: No se guarda el idioma seleccionado
**Solución**: Verificar que el navegador tenga habilitado localStorage y que no esté en modo privado.
