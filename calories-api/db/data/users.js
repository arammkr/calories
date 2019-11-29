const bcrypt = require('bcryptjs');
const faker = require('faker');

const users = [{
  firstName: 'John',
  lastName: 'Doe',
  nick: 'i.am.john',
  email: 'john@calories.com',
  password: 'john@1992',
},
{
  firstName: 'Albus',
  lastName: 'Dambldor',
  nick: 'i.am.albus',
  email: 'albus@calories.com',
  password: 'albus@1892',
},
{
  firstName: 'Harry',
  lastName: 'Potter',
  nick: 'i.am.harry',
  email: 'harry@calories.com',
  password: 'harry@1996',
}];

const fakedFirstNames = new Set((new Array(97).fill(null)).map(() => faker.name.firstName()));
const fakedEmails = new Set((new Array(97).fill(null)).map(() => faker.internet.email()));
const firstNameIterator = fakedFirstNames.values();
const emailIterator = fakedEmails.values();
const usersCount = Math.min(fakedEmails.size, fakedFirstNames.size);

const fakedUsers = (new Array(usersCount).fill(null)).map(() => {
  const firstName = firstNameIterator.next().value;
  return { 
    firstName,
    lastName: faker.name.lastName(),
    nick: `i.am.${firstName}`,
    email: emailIterator.next().value,
    password: `${firstName}@1992`,
  };
});

module.exports = () => [...users, ...fakedUsers].map(async (user) => {
  user.createdAt = new Date();
  user.updatedAt = new Date();
  user.caloriesPerDay = 2000 + Math.floor(Math.random() * 1000);
  user.password = await bcrypt.hash(user.password, 10);

  return user;
});
