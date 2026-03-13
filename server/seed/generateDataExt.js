const { faker } = require('@faker-js/faker');
const fs = require('fs');

const generateData = () => {
  let tsContent = fs.readFileSync('seed/seedData.ts', 'utf8');
  
  // Extract generated user IDs from the current users array
  const idRegex = /id: 'user-([^']+)'/g;
  let match;
  const userIds = ['user-admin', 'user-host', 'user-guest'];
  while ((match = idRegex.exec(tsContent)) !== null) {
      if (!['admin', 'host', 'guest'].includes(match[1])) {
          userIds.push('user-' + match[1]);
      }
  }

  // --- Generate More Posts ---
  const posts = [];
  const postCategories = ['Technology', 'Geopolitics', 'Networking', 'Health', 'Space Economía'];
  for (let i = 0; i < 60; i++) {
    const hasImage = Math.random() > 0.5;
    posts.push({
      id: `post-${faker.string.uuid()}`,
      author_id: faker.helpers.arrayElement(userIds),
      content: `${faker.lorem.paragraph()} #${faker.helpers.arrayElement(postCategories).replace(' ', '')} #Davos2026`,
      image_url: hasImage ? faker.image.url({ width: 800, height: 400 }) : 'null',
      created_at: faker.date.recent({ days: 30 }).toISOString()
    });
  }

  // --- Generate Comments based on Posts ---
  const comments = [];
  posts.forEach(post => {
      const numComments = Math.floor(Math.random() * 5); // 0-4 comments per post
      for (let j=0; j < numComments; j++) {
          comments.push({
              id: `comment-${faker.string.uuid()}`,
              post_id: post.id,
              author_id: faker.helpers.arrayElement(userIds),
              content: faker.lorem.sentence(),
              created_at: faker.date.recent({ days: 5, refDate: post.created_at }).toISOString()
          });
      }
  });

  // --- Generate Likes ---
  const likes = [];
  posts.forEach(post => {
      const numLikes = Math.floor(Math.random() * 15);
      const likedUsers = new Set();
      for (let j=0; j < numLikes; j++) {
          const uId = faker.helpers.arrayElement(userIds);
          if (!likedUsers.has(uId)) {
              likedUsers.add(uId);
              likes.push({
                  post_id: post.id,
                  user_id: uId,
                  created_at: faker.date.recent({ days: 10, refDate: post.created_at }).toISOString()
              });
          }
      }
  });

  // --- Generate Connections ---
  const connections = [];
  const connStatuses = ['accepted', 'accepted', 'accepted', 'pending', 'rejected'];
  for (let i = 0; i < 150; i++) {
      const r1 = faker.helpers.arrayElement(userIds);
      let r2 = faker.helpers.arrayElement(userIds);
      while(r1 === r2) r2 = faker.helpers.arrayElement(userIds);
      connections.push({
          id: `conn-${faker.string.uuid()}`,
          requester_id: r1,
          recipient_id: r2,
          status: faker.helpers.arrayElement(connStatuses),
          created_at: faker.date.recent({ days: 60 }).toISOString()
      });
  }

  // Rewrite posts
  const postsStart = tsContent.indexOf('const posts = [');
  const commentsStart = tsContent.indexOf('const comments = [');
  if (postsStart !== -1 && commentsStart !== -1) {
      let postsCode = 'const posts = [\n';
      posts.forEach((p, i) => {
          postsCode += `    { id: '${p.id}', author_id: '${p.author_id}', content: '${p.content.replace(/'/g, "\\'")}', image_url: ${p.image_url === 'null' ? 'null' : `'${p.image_url}'`}, created_at: '${p.created_at}' }` + (i === posts.length-1 ? '\n' : ',\n');
      });
      postsCode += '];\n\n';
      tsContent = tsContent.substring(0, postsStart) + postsCode + tsContent.substring(commentsStart);
  }

  // Rewrite comments
  let cStart = tsContent.indexOf('const comments = [');
  let lStart = tsContent.indexOf('const likes = [');
  if (cStart !== -1 && lStart !== -1) {
      let commentsCode = 'const comments = [\n';
      comments.forEach((c, i) => {
          commentsCode += `    { id: '${c.id}', post_id: '${c.post_id}', author_id: '${c.author_id}', content: '${c.content.replace(/'/g, "\\'")}', created_at: '${c.created_at}' }` + (i === comments.length-1 ? '\n' : ',\n');
      });
      commentsCode += '];\n\n';
      tsContent = tsContent.substring(0, cStart) + commentsCode + tsContent.substring(lStart);
  }
  
  // Rewrite likes
  cStart = tsContent.indexOf('const likes = [');
  lStart = tsContent.indexOf('const connections = [');
  if (cStart !== -1 && lStart !== -1) {
      let likesCode = 'const likes = [\n';
      likes.forEach((l, i) => {
          likesCode += `    { post_id: '${l.post_id}', user_id: '${l.user_id}', created_at: '${l.created_at}' }` + (i === likes.length-1 ? '\n' : ',\n');
      });
      likesCode += '];\n\n';
      tsContent = tsContent.substring(0, cStart) + likesCode + tsContent.substring(lStart);
  }

  // Rewrite connections
  cStart = tsContent.indexOf('const connections = [');
  lStart = tsContent.indexOf('const educations = [');
  if (cStart !== -1 && lStart !== -1) {
      let connectionsCode = 'const connections = [\n';
      connections.forEach((c, i) => {
          connectionsCode += `    { id: '${c.id}', requester_id: '${c.requester_id}', recipient_id: '${c.recipient_id}', status: '${c.status}', created_at: '${c.created_at}' }` + (i === connections.length-1 ? '\n' : ',\n');
      });
      connectionsCode += '];\n\n';
      tsContent = tsContent.substring(0, cStart) + connectionsCode + tsContent.substring(lStart);
  }


  fs.writeFileSync('seed/seedData.ts', tsContent);
  console.log('Seed data extended successfully.');
};

generateData();
