# SaveDialog
Save dialog for BasicServer 

## Usage
```TypeScript
import SaveDialog from '@basicserver/savedialog';

const mySaveDialog = SaveDialog('Documents', 'path/to/documents', (filePath) => {
    console.log(`Saving to: ${filePath}`);
    /* ... */
});
```
