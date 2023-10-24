const ncp = require('ncp').ncp;

// Dateien und Ordner, die ausgeschlossen werden sollen
const excludedItems = ['LICENSE', '.gitignore', 'bundle_script', '.github', 'dist', 'not_a_secret', 'node_modules'];

// Konfiguriere ncp mit Filter
ncp('./', 'dist', {
    filter: (source) => {
        // Schließe die Dateien und Ordner aus, die in der excludedItems-Liste sind
        return !excludedItems.some(item => source.includes(item));
    }
}, function (err) {
    if (err) {
        return console.error(err);
    }
    console.log('Inhalt wurde in den dist-Ordner kopiert');
});
