#!/usr/bin/env node

/**
 * Schema Lock Script
 * Prevents accidental schema changes by checking if schema.prisma has been modified
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const SCHEMA_PATH = path.join(__dirname, '..', 'prisma', 'schema.prisma');
const LOCK_FILE = path.join(__dirname, '..', 'prisma', '.schema-lock');
const STABLE_SCHEMA_PATH = path.join(__dirname, '..', 'prisma', 'stable-schema.prisma');

function getFileHash(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf8');
  return crypto.createHash('sha256').update(content).digest('hex');
}

function lockSchema() {
  console.log('🔒 Locking schema to prevent changes...');
  
  // Get current schema hash
  const currentHash = getFileHash(SCHEMA_PATH);
  
  if (!currentHash) {
    console.error('❌ Schema file not found!');
    process.exit(1);
  }
  
  // Write lock file
  fs.writeFileSync(LOCK_FILE, JSON.stringify({
    hash: currentHash,
    lockedAt: new Date().toISOString(),
    message: 'Schema locked to prevent accidental changes'
  }));
  
  console.log('✅ Schema locked successfully');
  console.log(`📝 Hash: ${currentHash.substring(0, 8)}...`);
}

function checkSchema() {
  console.log('🔍 Checking schema integrity...');
  
  if (!fs.existsSync(LOCK_FILE)) {
    console.log('⚠️  No lock file found. Run "npm run lock-schema" first.');
    return true;
  }
  
  const lockData = JSON.parse(fs.readFileSync(LOCK_FILE, 'utf8'));
  const currentHash = getFileHash(SCHEMA_PATH);
  
  if (currentHash !== lockData.hash) {
    console.error('❌ Schema has been modified!');
    console.error('🔒 Schema is locked to prevent accidental changes.');
    console.error('💡 If you need to modify the schema:');
    console.error('   1. Run "npm run unlock-schema"');
    console.error('   2. Make your changes');
    console.error('   3. Run "npm run lock-schema"');
    return false;
  }
  
  console.log('✅ Schema integrity verified');
  return true;
}

function unlockSchema() {
  console.log('🔓 Unlocking schema for modifications...');
  
  if (fs.existsSync(LOCK_FILE)) {
    fs.unlinkSync(LOCK_FILE);
    console.log('✅ Schema unlocked');
  } else {
    console.log('⚠️  Schema was not locked');
  }
}

function restoreStableSchema() {
  console.log('🔄 Restoring stable schema...');
  
  if (fs.existsSync(STABLE_SCHEMA_PATH)) {
    fs.copyFileSync(STABLE_SCHEMA_PATH, SCHEMA_PATH);
    console.log('✅ Stable schema restored');
  } else {
    console.error('❌ Stable schema file not found!');
    process.exit(1);
  }
}

// Command line interface
const command = process.argv[2];

switch (command) {
  case 'lock':
    lockSchema();
    break;
  case 'check':
    if (!checkSchema()) {
      process.exit(1);
    }
    break;
  case 'unlock':
    unlockSchema();
    break;
  case 'restore':
    restoreStableSchema();
    break;
  default:
    console.log('Schema Lock Tool');
    console.log('');
    console.log('Usage:');
    console.log('  node scripts/lock-schema.js lock    - Lock current schema');
    console.log('  node scripts/lock-schema.js check   - Check schema integrity');
    console.log('  node scripts/lock-schema.js unlock - Unlock schema for changes');
    console.log('  node scripts/lock-schema.js restore - Restore stable schema');
    break;
}
