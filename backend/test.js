import Database from './src/models/dbClass/dbClass.js';
import Milestone from './src/models/milestoneClass/mlestoneClass.js';

const db = Database.getInstance();
await db.connect();

const tree = await Milestone.getTree(1);

console.log('\n── Roots ───────────────────────────────');
console.log(tree.get('roots'));

console.log('\n── All nodes ───────────────────────────');
for (const [key, val] of tree) {
    if (key === 'roots') continue;
    console.log(`[${key}]`, val);
}

await db.disconnect();
