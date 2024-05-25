// Function to handle switch selection change
function switchChanged() {
    const switchSelection = document.getElementById('switchSelection');
    const customBudgetField = document.getElementById('customBudgetField');

    if (switchSelection.value === 'custom') {
        customBudgetField.style.display = 'block';
    } else {
        customBudgetField.style.display = 'none';
    }

    calculateLeftoverBudget();
}

// Function to retrieve the selected switch's budget
function getSelectedSwitchBudget() {
    const switchSelection = document.getElementById('switchSelection');
    if (switchSelection.value !== 'custom') {
        return parseInt(switchSelection.value.split(" (")[1].split("W")[0]);
    } else {
        return parseInt(document.getElementById('customBudget').value) || 0;
    }
}

// calcul conso poe
async function getPower(conso) {
    switch (conso) {
        case 'pale':
            return 2;
        case 'pale2':
            return 3, 2;
        case 'pm357':
            return 4, 6;
        case 'pm8':
            return 9, 5;
        case 'w1201':
            return 11;
        case 'w1231':
            return 28;
        case 'w1201h':
            return 13;
        case 'w1301':
            return 13;
        case 'w1311':
            return 19;
        case 'w1321':
            return 25;
        case 'w1331':
            return 23;
        case 'w1351':
            return 50;
        case 'w1361':
            return 70;
        case 'w1411':
            return 25;
        case 'w1451':
            return 49;
        case 'w1251':
            return 12;
        case '8378':
            return 6,5;
        case 'OCE':
            return 11;
        case 'ot8135s':
            return 21;
        default:
            return 0;
    }
}

// Update the calculateLeftoverBudget function to consider the selected switch's budget
async function calculateLeftoverBudget() {
    // Get values of each PoE class input
    const classInputs = document.querySelectorAll('.class-input');
    let totalPower = 0;
    for (let i = 0; i < classInputs.length; i++) {
        totalPower += parseInt(classInputs[i].value) * await getPower(classInputs[i].id);
    }

    // Subtract total power from total budget (considering the selected switch's budget) to get leftover budget
    const totalBudget = getSelectedSwitchBudget();
    const leftoverBudget = totalBudget - totalPower;

    // Update the leftover budget field
    document.getElementById('leftoverBudget').value = leftoverBudget;
}
