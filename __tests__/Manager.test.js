var Manager = require('../lib/Manager');

test('creates an Manager object', () => {
    const manager = new Manager('Michael Scott', '1234', 'scr@nton.pa', '123');
    expect(manager.name).toBe('Michael Scott');
    expect(manager.id).toBe('1234');
    expect(manager.email).toBe('scr@nton.pa');
    expect(manager.office).toBe('123'); 
}); 