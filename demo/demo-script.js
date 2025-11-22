#!/usr/bin/env node

/**
 * Demo script that simulates real-world OpsMind usage
 * Creates realistic scenarios to showcase features
 */

require('dotenv').config();
const axios = require('axios');

const BASE_URL = process.env.BACKEND_URL || 'http://localhost:3000';

async function runDemo() {
  console.log('🎬 OpsMind Demo Script\n');
  console.log('This demo simulates the judge presentation flow\n');
  
  await sleep(1000);

  // Scene 1: Check overall status
  console.log('═══════════════════════════════════════');
  console.log('📊 SCENE 1: Team Operations Overview');
  console.log('═══════════════════════════════════════\n');
  
  const status = await callAPI('/ops/status');
  console.log(`Total Tasks: ${status.summary.total_tasks}`);
  console.log(`At Risk: ${status.summary.at_risk}`);
  console.log(`Overdue: ${status.summary.overdue}`);
  console.log(`Incidents Today: ${status.summary.incidents_today}`);
  console.log(`Health Score: ${status.health_score}/100\n`);
  
  await sleep(2000);

  // Scene 2: Identify risks
  console.log('═══════════════════════════════════════');
  console.log('⚠️ SCENE 2: Tasks At Risk Analysis');
  console.log('═══════════════════════════════════════\n');
  
  const risks = await callAPI('/ops/risks');
  console.log(`Found ${risks.count} tasks at risk\n`);
  console.log('🤖 AI Analysis:');
  console.log(risks.ai_analysis.analysis.substring(0, 300) + '...\n');
  
  await sleep(2000);

  // Scene 3: Check workload
  console.log('═══════════════════════════════════════');
  console.log('📉 SCENE 3: Workload Analysis');
  console.log('═══════════════════════════════════════\n');
  
  const overload = await callAPI('/ops/overload');
  console.log(`Overloaded Members: ${overload.count}\n`);
  
  if (overload.users.length > 0) {
    overload.users.forEach(user => {
      console.log(`- ${user.user_id}: ${user.total_hours} hours, ${user.total_meetings} meetings`);
    });
  }
  console.log();
  
  await sleep(2000);

  // Scene 4: Incident patterns
  console.log('═══════════════════════════════════════');
  console.log('🔥 SCENE 4: Incident Pattern Detection');
  console.log('═══════════════════════════════════════\n');
  
  const incidents = await callAPI('/ops/incidents');
  console.log(`Incidents (24h): ${incidents.count}`);
  console.log(`Repeating Patterns: ${incidents.patterns.length}\n`);
  
  if (incidents.patterns.length > 0) {
    console.log('Detected Patterns:');
    incidents.patterns.forEach((pattern, i) => {
      console.log(`${i + 1}. "${pattern.summary}" - occurred ${pattern.occurrence_count} times`);
    });
  }
  console.log();
  
  await sleep(2000);

  // Scene 5: THE KILLER FEATURE - Sprint delay analysis
  console.log('═══════════════════════════════════════');
  console.log('🚨 SCENE 5: "Why is Sprint Delayed?"');
  console.log('═══════════════════════════════════════\n');
  console.log('This is the WOW moment for judges!\n');
  
  const sprintAnalysis = await callAPI('/ops/sprint-delay');
  console.log(`Sprint Status: ${sprintAnalysis.sprint_status.toUpperCase()}`);
  console.log(`Overdue Tasks: ${sprintAnalysis.overdue_count}`);
  console.log(`Blocked Tasks: ${sprintAnalysis.blocked_count}`);
  console.log(`Incident Impact: ${sprintAnalysis.incident_impact} incidents`);
  console.log(`Overloaded Members: ${sprintAnalysis.overloaded_members}\n`);
  
  console.log('🎯 ROOT CAUSE ANALYSIS:');
  console.log(sprintAnalysis.root_cause_analysis.root_cause || 'Analysis in progress...');
  console.log();
  
  if (sprintAnalysis.recommendations && sprintAnalysis.recommendations.length > 0) {
    console.log('👉 RECOMMENDED ACTIONS:');
    sprintAnalysis.recommendations.forEach((rec, i) => {
      if (typeof rec === 'string') {
        console.log(`${i + 1}. ${rec}`);
      } else if (rec.action) {
        console.log(`${i + 1}. ${rec.action}`);
        if (rec.task_id) console.log(`   → Task: ${rec.task_id} (${rec.owner || 'unassigned'})`);
      }
    });
  }
  console.log();
  
  await sleep(2000);

  // Final scene
  console.log('═══════════════════════════════════════');
  console.log('🎉 Demo Complete!');
  console.log('═══════════════════════════════════════\n');
  console.log('This is what judges will see in the live demo.');
  console.log('OpsMind provides:');
  console.log('  ✅ Real-time operational intelligence');
  console.log('  ✅ AI-powered root cause analysis');
  console.log('  ✅ Actionable recommendations');
  console.log('  ✅ Multi-tool integration');
  console.log('  ✅ Proactive risk detection\n');
}

async function callAPI(endpoint) {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`Error calling ${endpoint}:`, error.message);
    return {};
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Run demo
console.clear();
runDemo().catch(error => {
  console.error('Demo error:', error);
  process.exit(1);
});
