## Install

This will install jsmydocs and run on localhost:4005 in your default browser. Specify a file to save your documents to after the serve command.
```
npx jsmydocs serve
npx jsmydocs serve test.js
```
This is an interactive coding enviroment. You can write JavaScript, see it executed, and write documentation using markdown.


- Click any text cell to edit it.
- The code in each code editor is joined together into one file. If you define a variable in cell #1, you can refer to it in the following cell!
- You can show any React component, string, number, or anything else by calling the `show` function. This is a function that is built into this environment. Call show multiple times to show multiple values.
- Re-order or delete cells using the buttons on the top right.
- Add new cells by hovering on the divider between each cell. 

All of your changes get saved to the file you opened JsDoc with. If you ran `npx jbook serve test.js`, all of the text and code you write will be saved to the test.js file. 
