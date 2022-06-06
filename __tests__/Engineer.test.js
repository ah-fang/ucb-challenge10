var Engineer = require('../lib/Engineer.js');

test('creates an Engineer object', () => {
    const engineer = new Engineer('Phyllis', '1234', 'scr@nton.pa', 'queen-vance');
    expect(engineer.name).toBe('Phyllis');
    expect(engineer.id).toBe('1234');
    expect(engineer.email).toBe('scr@nton.pa');
    expect(engineer.github).toBe('queen-vance'); 
}); 