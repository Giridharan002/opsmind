#!/usr/bin/env node

/**
 * Test script to verify OpsMind backend is working correctly
 */

require('dotenv').config();
const axios = require('axios');

const BASE_URL = process.env.BACKEND_URL || 'http://localhost:3000';

async function runTests() {
  console.log('🧪 Running OpsMind Backend Tests\n');
  console.log(`Base URL: ${BASE_URL}\n`);

  const tests = [
    {
      name: 'Health Check',
      test: async () => {
        const res = await axios.get(`${BASE_URL}/health`);
        return res.data.status === 'healthy';
      }
    },
    {
      name: 'Ops Status',
      test: async () => {
        const res = await axios.get(`${BASE_URL}/ops/status`);
        return res.data.summary !== undefined;
      }
    },
    {
      name: 'Ops Risks',
      test: async () => {
        const res = await axios.get(`${BASE_URL}/ops/risks`);
        return res.data.count !== undefined;
      }
    },
    {
      name: 'Ops Overload',
      test: async () => {
        const res = await axios.get(`${BASE_URL}/ops/overload`);
        return res.data.count !== undefined;
      }
    },
    {
      name: 'Ops Incidents',
      test: async () => {
        const res = await axios.get(`${BASE_URL}/ops/incidents`);
        return res.data.count !== undefined;
      }
    },
    {
      name: 'Sprint Delay Analysis',
      test: async () => {
        const res = await axios.get(`${BASE_URL}/ops/sprint-delay`);
        return res.data.sprint_status !== undefined;
      }
    },
    {
      name: 'Webhook - Test',
      test: async () => {
        const res = await axios.post(`${BASE_URL}/webhook/test`, {
          test: 'data',
          timestamp: new Date().toISOString()
        });
        return res.data.message !== undefined;
      }
    }
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      const result = await test.test();
      if (result) {
        console.log(`✅ ${test.name}`);
        passed++;
      } else {
        console.log(`❌ ${test.name} - Unexpected response`);
        failed++;
      }
    } catch (error) {
      console.log(`❌ ${test.name} - ${error.message}`);
      failed++;
    }
  }

  console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed`);
  
  if (failed === 0) {
    console.log('🎉 All tests passed!\n');
  } else {
    console.log('⚠️ Some tests failed. Please check the logs.\n');
    process.exit(1);
  }
}

// Run tests
runTests().catch(error => {
  console.error('Test runner error:', error);
  process.exit(1);
});
