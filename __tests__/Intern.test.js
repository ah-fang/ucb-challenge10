var Employee = require('../lib/Employee.js');
var Intern = require('../lib/Intern.js');

test('creates an Intern object', () => {
    const intern = new Intern('Ryan', '1234', 'scr@nton.pa', 'biznus-skool');

    expect(intern.name).toBe('Ryan');
    expect(intern.id).toBe('1234');
    expect(intern.email).toBe('scr@nton.pa');
    expect(intern.school).toBe('biznus-skool'); 

    expect(intern.getSchool()).toBe('biznus-skool');
    expect(intern.getRole()).toBe('Intern');

}); 