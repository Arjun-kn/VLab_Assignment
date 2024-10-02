let data = [
    { id: 1, chemicalName: "Ammonium Persulfate", vendor: "LG Chem", density: 3525.92, viscosity: 60.63, packaging: "Bag", packSize: 100, unit: "kg", quantity: 6495.18 },
    { id: 2, chemicalName: "Caustic Potash", vendor: "Formosa", density: 3172.15, viscosity: 48.22, packaging: "Bag", packSize: 100, unit: "kg", quantity: 8751.90 },
    { id: 3, chemicalName: "Dimethylaminopropylamino", vendor: "LG Chem", density: 8435.37, viscosity: 12.62, packaging: "Barrel", packSize: 75, unit: "L", quantity: 5964.61 },
    { id: 4, chemicalName: "Mono Ammonium Phosphate", vendor: "Sinopec", density: 1597.65, viscosity: 76.51, packaging: "Bag", packSize: 105, unit: "kg", quantity: 8183.73 },
    { id: 5, chemicalName: "Ferric Nitrate", vendor: "DowDuPont", density: 364.04, viscosity: 14.90, packaging: "Bag", packSize: 105, unit: "kg", quantity: 4454.33 },
    { id: 6, chemicalName: "n-Pentane", vendor: "Sinopec", density: 4535.26, viscosity: 66.76, packaging: "N/A", packSize: "N/A", unit: "t", quantity: 6272.34 }
];

let selectedRowIndex = -1;
let lastSortedColumnIndex = -1;
let isAscending = true;


loadTableData();

function loadTableData() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = '';
    data.forEach((row, index) => {
        const tableRow = `
           <tr onclick="selectRow(${index})" class="${selectedRowIndex === index ? 'table-active' : ''}">
                <td><input type="checkbox" checked></td> 
                <td>${row.id}</td>
                <td ondblclick="makeEditable(${index}, 'chemicalName')">${row.chemicalName}</td>
                <td ondblclick="makeEditable(${index}, 'vendor')">${row.vendor}</td>
                <td ondblclick="makeEditable(${index}, 'density')">${row.density}</td>
                <td ondblclick="makeEditable(${index}, 'viscosity')">${row.viscosity}</td>
                <td ondblclick="makeEditable(${index}, 'packaging')">${row.packaging}</td>
                <td ondblclick="makeEditable(${index}, 'packSize')">${row.packSize}</td>
                <td ondblclick="makeEditable(${index}, 'unit')">${row.unit}</td>
                <td ondblclick="makeEditable(${index}, 'quantity')">${row.quantity}</td>
            </tr>
        `;
        tableBody.innerHTML += tableRow;
    });
}

function makeEditable(rowIndex, field) {
    console.log("index",rowIndex)
    const originalValue = data[rowIndex][field];
    const input = document.createElement('input');
    input.type = (field === 'density' || field === 'viscosity' || field === 'packSize' || field === 'quantity') ? 'number' : 'text';
    input.value = originalValue;
    input.onblur = () => {
        const newValue = input.value.trim();
        if (newValue === '') {
            alert("Value cannot be empty.");
            loadTableData(); 
            return;
        }
        data[rowIndex][field] = field === 'density' || field === 'viscosity' || field === 'packSize' || field === 'quantity' ? parseFloat(newValue) : newValue;
        loadTableData();
    };
    input.onkeydown = (e) => {
        if (e.key === 'Enter') {
            input.blur(); 
        }
    };
    const cell = document.querySelector(`#tableBody tr:nth-child(${rowIndex + 1}) td:nth-child(${getFieldIndex(field) + 1})`);
    cell.innerHTML = ''; 
    cell.appendChild(input);
    input.focus(); 
}

function getFieldIndex(field) {
    const fields = ['id', 'chemicalName', 'vendor', 'density', 'viscosity', 'packaging', 'packSize', 'unit', 'quantity'];
    return fields.indexOf(field) + 1; 

}
function sortTable(columnIndex) {
    if (lastSortedColumnIndex === columnIndex) {
        isAscending = !isAscending;
    } else {
        isAscending = true;
        lastSortedColumnIndex = columnIndex;
    }

    data.sort((a, b) => {
        let valueA = Object.values(a)[columnIndex];
        let valueB = Object.values(b)[columnIndex];
        if (typeof valueA === 'string') valueA = valueA.toLowerCase();
        if (typeof valueB === 'string') valueB = valueB.toLowerCase();

        if (valueA < valueB) return isAscending ? -1 : 1;
        if (valueA > valueB) return isAscending ? 1 : -1;
        return 0;
    });

    loadTableData();
}

function selectRow(index) {
    selectedRowIndex = index;
    loadTableData();
}

function addEditableRow() {
    const newRow = {
        id: data.length + 1,
        chemicalName: "",
        vendor: "",
        density: "",
        viscosity: "",
        packaging: "",
        packSize: "",
        unit: "",
        quantity: ""
    };
    data.push(newRow);
    loadTableData();
}

function moveRowUp() {
    if (selectedRowIndex > 0) {
        [data[selectedRowIndex], data[selectedRowIndex - 1]] = [data[selectedRowIndex - 1], data[selectedRowIndex]];
        selectedRowIndex -= 1;
        loadTableData();
    }
}

function moveRowDown() {
    if (selectedRowIndex < data.length - 1) {
        [data[selectedRowIndex], data[selectedRowIndex + 1]] = [data[selectedRowIndex + 1], data[selectedRowIndex]];
        selectedRowIndex += 1;
        loadTableData();
    }
}

function deleteRow() {
    if (selectedRowIndex !== -1) {
        const confirmation = confirm("Are you sure you want to delete this row?");
        if (confirmation) {
            data.splice(selectedRowIndex, 1);
            selectedRowIndex = -1;
            loadTableData();
        }
    } else {
        alert("No row selected. Please select a row to delete.");
    }
}

function refreshData() {

   
    window.location.reload(); 
}

function saveData() {
    const errorMessages = document.getElementById("errorMessages");
    errorMessages.innerHTML = ''; 

    data.forEach((row, index) => {
      

        if (!row.chemicalName.trim() || !row.vendor.trim() || !row.packaging.trim() || !row.unit.trim()) {
            errorMessages.innerHTML += `<p>Error in row ${index + 1}: Chemical Name, Vendor, Packaging, and Unit cannot be empty.</p>`;
        }
    });

    if (errorMessages.innerHTML === '') {
        alert("Data saved successfully!");
    }
}

