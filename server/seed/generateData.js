const { faker } = require('@faker-js/faker');
const fs = require('fs');

const generateData = () => {
  const users = [
    {
      id: 'user-admin',
      name: 'Admin Master',
      email: 'admin@davos.com',
      password: 'bcrypt.hashSync("password123", 10)',
      role: 'admin',
      created_at: new Date().toISOString(),
      headline: 'System Administrator at Davos Hub',
      about: 'Managing the overall infrastructure.',
      location: 'Davos, Switzerland',
      industry: 'Information Technology',
      profile_url: 'admin-master',
      background_image_url: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=800',
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200',
      company: 'Davos Hub',
      job_title: 'System Administrator'
    },
    {
      id: 'user-host',
      name: 'Event Host',
      email: 'host@davos.com',
      password: 'bcrypt.hashSync("password123", 10)',
      role: 'host',
      created_at: new Date().toISOString(),
      headline: 'Event Organizer & Moderator',
      about: 'Excited to host amazing events and connect people.',
      location: 'Zurich, Switzerland',
      industry: 'Events Services',
      profile_url: 'event-host',
      background_image_url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
      company: 'Davos Events',
      job_title: 'Event Manager'
    },
    {
      id: 'user-guest',
      name: 'Guest Attendee',
      email: 'guest@davos.com',
      password: 'bcrypt.hashSync("password123", 10)',
      role: 'guest',
      created_at: new Date().toISOString(),
      headline: 'Technology Enthusiast | Lifelong Learner',
      about: 'Looking forward to meeting great minds at Davos 2026.',
      location: 'London, UK',
      industry: 'Software Development',
      profile_url: 'guest-attendee',
      background_image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
      avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200',
      company: 'Tech Corp',
      job_title: 'Software Engineer'
    }
  ];

  const roles = ['admin', 'host', 'guest', 'guest', 'guest', 'guest', 'host', 'guest'];
  
  for (let i = 0; i < 40; i++) {
    users.push({
      id: `user-${faker.string.uuid()}`,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'bcrypt.hashSync("password123", 10)',
      role: faker.helpers.arrayElement(roles),
      created_at: faker.date.past({ years: 1 }).toISOString(),
      headline: faker.person.jobTitle(),
      about: faker.lorem.paragraph(),
      location: `${faker.location.city()}, ${faker.location.country()}`,
      industry: faker.commerce.department(),
      profile_url: faker.internet.username(),
      background_image_url: faker.image.urlLoremFlickr({ category: 'technology', width: 800, height: 400 }),
      avatar_url: faker.image.avatar(),
      company: faker.company.name(),
      job_title: faker.person.jobTitle()
    });
  }

  let tsContent = fs.readFileSync('seed/seedData.ts', 'utf8');
  
  // Replace the users array definition
  const usersStart = tsContent.indexOf('const users = [');
  const usersEnd = tsContent.indexOf('];\n\nconst organizations =');
  
  if (usersStart !== -1 && usersEnd !== -1) {
      let usersCode = 'const users = [\n';
      users.forEach((u, i) => {
          usersCode += '    {\n';
          usersCode += `        id: '${u.id}',\n`;
          usersCode += `        name: '${u.name.replace(/'/g, "\\'")}',\n`;
          usersCode += `        email: '${u.email}',\n`;
          usersCode += `        password: ${u.password},\n`;
          usersCode += `        role: '${u.role}',\n`;
          usersCode += `        created_at: '${u.created_at}',\n`;
          usersCode += `        headline: '${u.headline.replace(/'/g, "\\'")}',\n`;
          usersCode += `        about: '${u.about.replace(/'/g, "\\'")}',\n`;
          usersCode += `        location: '${u.location.replace(/'/g, "\\'")}',\n`;
          usersCode += `        industry: '${u.industry.replace(/'/g, "\\'")}',\n`;
          usersCode += `        profile_url: '${u.profile_url.replace(/'/g, "\\'")}',\n`;
          usersCode += `        background_image_url: '${u.background_image_url}',\n`;
          usersCode += `        avatar_url: '${u.avatar_url}',\n`;
          usersCode += `        company: '${u.company.replace(/'/g, "\\'")}',\n`;
          usersCode += `        job_title: '${u.job_title.replace(/'/g, "\\'")}'\n`;
          usersCode += i === users.length - 1 ? '    }\n' : '    },\n';
      });
      // Do not append "];" because it's caught in the slice
      tsContent = tsContent.substring(0, usersStart) + usersCode + tsContent.substring(usersEnd);
  }
  
  fs.writeFileSync('seed/seedData.ts', tsContent);
  console.log('Seed data rewritten with dynamic users.');
};

generateData();
