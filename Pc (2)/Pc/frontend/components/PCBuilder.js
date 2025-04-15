export const buildPC = (budget, useCase, preferences) => {
    const buildOptions = {
        gaming: [
            { name: 'NVIDIA RTX 4080', price: 100000 },
            { name: 'AMD Ryzen 9 7950X', price: 60000 },
            { name: '32GB DDR5 RAM', price: 15000 }
        ],
        editing: [
            { name: 'AMD Radeon PRO W6800', price: 90000 },
            { name: 'Intel Core i9-13900K', price: 70000 },
            { name: '64GB DDR5 RAM', price: 30000 }
        ]
    };

    const options = buildOptions[useCase.toLowerCase()] || [];
    return options.map(part => `${part.name} - ₹${part.price}`).join('\n');
};
