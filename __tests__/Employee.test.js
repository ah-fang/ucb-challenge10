var Employee = require('../lib/Employee.js');

test('creates an Employee object', () => {
    const employee = new Employee('Jim', '1234', 'scr@nton.pa');

    expect(employee.name).toBe('Jim');
    expect(employee.id).toBe('1234');
    expect(employee.email).toBe('scr@nton.pa');
});