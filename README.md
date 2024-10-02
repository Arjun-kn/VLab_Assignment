Chemical Supplies Management Dashboard
** Project Overview **
This project is a Chemical Supplies Management Dashboard, built with HTML, CSS, and JavaScript (using Bootstrap for styling), allowing users to dynamically manage a table of chemical supplies. The table contains chemical details and offers functionality to add, edit, delete, sort, and perform other operations on the rows.

** Functionalities **
Table Structure Dynamic Rows: The table is populated dynamically by loading the data array into the DOM. Checkboxes: The first column contains checkboxes, which are checked by default for each row. Editable Cells: Double-clicking on specific cells in the table (e.g., chemical name, vendor, density, etc.) allows the user to edit the values inline. The new value is saved when the user presses Enter or when the cell loses focus.

** Row Operations **
Adding Rows: Users can add a new row using the toolbar icon. A blank row is inserted at the end of the table, where users can enter new details. Deleting Rows: The delete button allows users to remove a selected row from the table. A confirmation dialog is shown before deletion. Moving Rows: The user can move the selected row up or down using the arrow icons. Sorting: Clicking on table headers sorts the table data by the respective column, and sorting can be toggled between ascending and descending order.

** Validation **
Data validation occurs when saving changes: String fields like chemicalName, vendor, packaging, and unit are checked to ensure they are not empty.

** Error Handling and Feedback **
Error Display: Error messages are shown in the #errorMessages div when the user attempts to save invalid data. Each error is specific to the row and field that caused it.

** Code Structure **
HTML (grid.html): The HTML defines the table layout, toolbar, and error message container. CSS (grid.css): The CSS file includes custom styles for hover effects and other UI customizations that override Bootstrap’s default styles. JavaScript (grid.js): Contains all the core logic for handling table operations like editing, sorting, row manipulation, and validation.
